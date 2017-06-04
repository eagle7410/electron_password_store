const electron    = require('electron');
const ipcRenderer = electron.ipcMain;
const dialog      = electron.dialog;
// Db
const Engine = require('tingodb')();
const dbPath = __dirname + '/db_test/tingo_db';
const db     = new Engine.Db(dbPath, {});
const models = require('./db/tingo_db/models');

// Messages
const listenSdf        = require('./listeners_config/sdf');
const listenAuth       = require('./listeners_config/auth');
const listenUsers      = require('./listeners_config/users');
const listenStorage    = require('./listeners_config/storage');
const listenCategories = require('./listeners_config/categories');
const send             = require('./libs/send');
const listen = (action, handel) => {
	ipcRenderer.on(action, (event, arg) => {
		// TODO: clear
		console.log(`:: ${action} `, arg);
		handel(event.sender, action + '-response', arg);
	});
};

const listeners = config => {
	config.map(conf => {
		const type = conf.type || send.reqTypes.get;
		listen(`${type.toLowerCase()}->${conf.route}`, conf.handel);
	})

};

// Models
const modelUsers      = models.get(db, 'users');
const modelSettings   = models.get(db, 'settings');
const modelStorage    = models.get(db, 'storage');
const modelCategories = models.get(db, 'categories');

module.exports = {
	run: (mainWindow) => {
		listeners(listenStorage.setModel(modelStorage).config);

		listeners(listenSdf.setDialog(dialog).setWindow(mainWindow).setModelStorage(modelStorage).config);

		listeners(listenAuth.setModels(modelUsers, modelStorage, modelSettings, modelCategories).config);

		listeners(listenCategories.setModel(modelCategories).config);

		listeners(listenUsers.setModel(modelUsers).config);
	}
};
