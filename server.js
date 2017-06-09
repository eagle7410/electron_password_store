const electron    = require('electron');
const ipcRenderer = electron.ipcMain;
const dialog      = electron.dialog;
// Db
const Engine = require('tingodb')();
const dbPath = __dirname + '/db_test/tingo_db/data';
const db     = new Engine.Db(dbPath, {});
const models = require('./db/tingo_db/models');

// Messages
const listenSdf        = require('./listeners_config/sdf');
const listenAuth       = require('./listeners_config/auth');
const listenUsers      = require('./listeners_config/users');
const listenCould      = require('./listeners_config/drop-box');
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

const listeners = arConfig => {
	arConfig.map(config => config.map(conf => {
		const type = conf.type || send.reqTypes.get;
		listen(`${type.toLowerCase()}->${conf.route}`, conf.handel);
	}));
};

// Models
const modelConstant   = require('./modelConst');
const modelUsers      = models.get(db, modelConstant.usr);
const modelSettings   = models.get(db, modelConstant.sett);
const modelStorage    = models.get(db, modelConstant.store);
const modelCategories = models.get(db, modelConstant.cat);

module.exports = {
	run: (mainWindow) => listeners([
		listenCould.setModels(modelUsers, modelStorage, modelSettings, modelCategories).config,
		listenStorage.setModel(modelStorage).config,
		listenSdf.setDialog(dialog).setWindow(mainWindow).setModelStorage(modelStorage).config,
		listenAuth.setModels(modelUsers, modelStorage, modelSettings, modelCategories).config,
		listenCategories.setModel(modelCategories).config,
		listenUsers.setModel(modelUsers).config
	])
};
