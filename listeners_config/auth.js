const Routes = require('../routes/RoutesConstDev');
const send   = require('../libs/send');
const libErr = require('../libs/errors');

let modelUsers = null;
let modelSettings = null;
let modelStorage = null;
let modelCategories = null;

module.exports = {
	setModels: (user, storage, settings, categories) => {
		modelUsers      = user;
		modelSettings   = storage;
		modelStorage    = settings;
		modelCategories = categories;

		return module.exports;
	},
	config : [
		{
			route  : Routes.usrList,
			handel : (res, action) => {
				modelUsers.loginList()
					.then(list => {
						send.ok(res, action, list);
					}).catch(err => {
					console.log('!ERR get logins', err);
					send.err(res, action, 'Error get logins');
				});
			}
		},
		{
			route  : Routes.auth,
			handel : (res, action, data) => {
				modelUsers.auth(data.login, data.pass)
					.then((token) => {
						send.ok(res, action, token)
					}).catch(err => {

					if (err.type !== libErr.constants.auth) {
						console.log('!ERR auth', err);
					}

					send.err(res, action, 'Error get logins');
				});
			}
		},
		{
			route  : Routes.appInit,
			handel : (res, action) => {
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
						console.log('!ERR ' + Routes.appInit, err);
						return send.err(res, action, 'Error get ' + Routes.appInit);
					}

					send.ok(res, action, data);

				});
			}
		}
	]
};
