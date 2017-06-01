const electron   = require('electron');
const libErr     = require('./libs/errors');
const ipcRenderer = electron.ipcMain;
// Db
const Engine = require('tingodb')();
const dbPath = __dirname + '/db_test/tingo_db';
const db     = new Engine.Db(dbPath, {});
const models = require('./db/tingo_db/models');
// Messages
const send   = require('./libs/send');
const listen = (action, handel) => {
	ipcRenderer.on(action, (event, arg) => {
		// TODO: clear
		console.log(`:: ${action} `, arg);
		handel(event.sender, action + '-response', arg);
	});
};
// Models
const modelUsers      = models.get(db, 'users');
const modelSettings   = models.get(db, 'settings');
const modelStorage    = models.get(db, 'storage');
const modelCategories = models.get(db, 'categories');
// Routes
const Routes = require('./RoutesConstDev');

module.exports = {
	run: (mainWindow) => {
		listen('POST-' + Routes.usr, (res, action, data) => {

			modelUsers.save(data)
				.then(user => {
					send.ok(res, action, user);
				}).catch(err => {
				switch (err.type) {
					case libErr.constants.valid :
						send.err(res, action, err.mess);
						break;
					default :
						console.log('!ERR save user', err);
						send.err(res, action, 'Server error no save.');
				}
			});
		});

		listen('PUT-' + Routes.cat, (res, action, data) => {

			modelCategories.updateSafe(data.id, data.name)
				.then(() => {
					send.ok(res, action);
				}).catch(err => {
				switch (err.type) {
					case libErr.constants.valid :
						send.err(res, action, err.mess);
						break;
					default :
						console.log('!ERR update category', err);
						send.err(res, action, 'No update category. Create ticket to support.');
				}
			});
		});

		listen('DELETE-' + Routes.cat, (res, action, id) => {
			modelCategories.delete(id)
				.then(() => {
					send.ok(res, action);
				}).catch(err => {
				console.log('!ERR delete category', err);
				send.err(res, action);
			});
		});

		listen('POST-' + Routes.cat, (res, action, name) => {

			modelCategories.save(name)
				.then(cat => {
					send.ok(res, action, cat);
				}).catch(err => {
				switch (err.type) {
					case libErr.constants.valid :
						send.err(res, action, err.mess);
						break;
					default :
						console.log('!ERR save category', err);
						send.err(res, action, 'Server error no save.');
				}
			});
		});
		listen('GET-' + Routes.appInit, (res, action) => {
			const async = require('async');

			async.waterfall([
				cb => {
					modelUsers.list()
						.then(list => cb(null, {users: list}))
						.catch(cb);
				},
				(dt, cb) => {
					modelCategories.list()
						.then(list => {
							dt.categories = list;
							cb(null, dt)
						})
						.catch(cb);
				},
				(dt, cb) => {
					modelSettings.list()
						.then(list => {
							dt.settings = list;
							cb(null, dt)
						})
						.catch(cb);
				},
				(dt, cb) => {
					modelStorage.list()
						.then(list => {
							dt.storage = list;
							cb(null, dt)
						})
						.catch(cb);
				},
			], (err, data) => {

				if (err) {
					console.log('!ERR ' + Routes.appInit , err);
					send.err(res, action, 'Error get ' + Routes.appInit);
				}

				send.ok(res, action, data);

			});
		});
		listen('GET-' + Routes.usrList, (res, action) => {
			modelUsers.loginList()
				.then(list => {
					send.ok(res, action, list);
				}).catch(err => {
				console.log('!ERR get logins', err);
				send.err(res, action, 'Error get logins');
			});
		});

		listen('GET-' + Routes.auth, (res, action, data) => {
			modelUsers.auth(data.login, data.pass)
				.then((token) => {
					send.ok(res, action, token)
				}).catch(err => {

				if (err.type !== libErr.constants.auth) {
					console.log('!ERR auth', err);
				}

				send.err(res, action, 'Error get logins');
			});
		})
	}
};
