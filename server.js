const electron   = require('electron');
const ipcRenderer = electron.ipcMain;

// Db
const Engine = require('tingodb')();
const dbPath = __dirname + '/db_test/tingo_db';
const db     = new Engine.Db(dbPath, {});
const models = require('./db/tingo_db/models');

// Messages
const listenAuth       = require('./listeners_config/auth');
const listenUsers      = require('./listeners_config/users');
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
		listenAuth.setModels(modelUsers, modelStorage, modelSettings, modelCategories);
		listeners(listenAuth.config);

		listenCategories.setModel(modelCategories);
		listeners(listenCategories.config);

		listenUsers.setModel(modelUsers);
		listeners(listenUsers.config);
	}
};
