const fs = require('fs-extra');
const send = require('../libs/send');
const zipper = require('../libs/zipper');
const pathManager = require('../libs/path-manager');
const migrateTingo = require('../libs/migrate-tingo');

const reqTypes = send.reqTypes;
let Routes = null;
let cloudDbox = null;
let cloudGoogle = null;
let modelUsers = null;
let modelStorage = null;
let modelSettings = null;
let modelCategory = null;
let dialog = null;
let mainWindow = null;

/**
 *
 * @param data {{type:string}}
 * @returns {*}
 */
const getCloudByType = (data) => {
	switch (data.type) {
		case 'dbox' :
			return cloudDbox;

		case 'google' :
			return cloudGoogle;
	}

	console.log('ERR: Bad cloud type ' + data.type);

	return null;

};

module.exports = {
	/**
	 *
	 * @param models {{users : {},setting : {},store : {},category : {}}}
	 */
	setModels: (models) => {
		modelUsers = models.users;
		modelStorage = models.store;
		modelSettings = models.setting;
		modelCategory = models.category;

		return module.exports;
	},
	setWindow: win => {
		mainWindow = win;
		return module.exports;
	},
	setDialog: dialogComponent => {
		dialog = dialogComponent;
		return module.exports;
	},
	setClouds: (coulds) => {
		cloudDbox = coulds.dbox;
		cloudGoogle = coulds.google;

		return module.exports;
	},
	setRoutes: (routes) => {
		Routes = routes;

		return module.exports;
	},
	config: () => [
		{
			route: Routes.cloudInit,
			handel: (res, action, data) => {
				getCloudByType(data).connectInit()
					.then(() => {
						send.ok(res, action, null)
					})
					.catch(err => {
						console.log('!ERR init dropBox connect', err);
						send.err(res, action, 'Error get dropBox connect');
					});
			}
		},
		{
			route: Routes.cloudGetPath,
			handel: (res, action, data) => {
				let folder = dialog.showOpenDialog(mainWindow, {
						filters: [
							{name: 'Json Files', extensions: ['json']},
							{name: 'All Files', extensions: ['*']}
						],
						properties: ['openFile']
					}
				);
				send.ok(res, action, {folder: Array.isArray(folder) ? folder.shift() : ''});
			}
		},
		{
			type: reqTypes.post,
			route: Routes.cloudSaveConfig,
			handel: (res, action, data) => {
				fs.copy(data.folder, getCloudByType(data).getConfigPath())
					.then(() => send.ok(res, action))
					.catch(err => send.err(res, action))
			}
		},

		{
			type: reqTypes.del,
			route: Routes.cloudDownloadArchiveClear,
			handel: (res, action, dateStr) => {
				let pathUpload = pathManager.getUploadPath(dateStr);

				pathManager.deleteFolderRecursive(pathUpload);
				send.ok(res, action, dateStr);
			}
		},
		{
			type: reqTypes.post,
			route: Routes.cloudDownloadArchiveMerge,
			handel: (res, action, dateStr) => {

				let pathUpload = pathManager.getUploadPath(dateStr);
				let pathExtract = `${pathUpload}/unzip`;

				migrateTingo.up(modelUsers, modelStorage, modelCategory, pathExtract)
					.then(() => send.ok(res, action, dateStr))
					.catch(err => {
						console.log('!ERR merge archive', err);
						send.err(res, action, 'ERR merge archive');
					});

			}
		},
		{
			type: reqTypes.put,
			route: Routes.cloudDownloadArchiveExtract,
			handel: (res, action, dateStr) => {

				let pathUpload = pathManager.getUploadPath(dateStr);
				let pathZip = `${pathUpload}/${pathManager.getArchiveName()}`;
				let pathExract = `${pathUpload}/unzip`;
				zipper.unzipArchive(pathZip, pathExract)
					.then(r => send.ok(res, action, dateStr))
					.catch(err => {
						console.log('!ERR extract archive', err);
						send.err(res, action, 'ERR extract archive');
					});
			}
		},
		{
			route: Routes.cloudDownloadArchive,
			handel: (res, action, data) => {
				let date = new Date();
				let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

				pathManager.checkDownloadFolder(dateStr)
					.then(pathDowload => getCloudByType(data).moveFromCould(pathDowload, pathManager.getArchiveName()))
					.then(r => send.ok(res, action, dateStr))
					.catch(err => {
						console.log('!ERR download archive', err);
						send.err(res, action, 'ERR download archive');
					});
			}
		},
		{
			route: Routes.cloudUploadArchive,
			type: reqTypes.post,
			handel: async (res, action) => {
				try {
					let date = new Date();
					let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
					const zipPath = pathManager.getNewArchivePath(dateStr);

					const json = await  migrateTingo.dataJson(modelUsers, modelStorage, modelCategory);

					const jsonString = JSON.stringify(json);

					await pathManager.checkFolderNewArchive(dateStr);

					await zipper.createArchiveByContent(jsonString, 'data.json', zipPath);

					send.ok(res, action, dateStr);

				} catch (e) {
					console.log('!ERR create archive', e);
					send.err(res, action, 'ERR create archive');
				}
			}
		},
		{
			route: Routes.cloudUpload,
			type: reqTypes.put,
			handel: (res, action, data) => {
				const zipPath = pathManager.getNewArchivePath(data.date);
				const fileName = pathManager.getArchiveName();

				getCloudByType(data).moveToCould(zipPath, fileName)
					.then(() => send.ok(res, action, null))
					.catch(err => {
						console.log('!ERR move to could', err);
						send.err(res, action, 'ERR move to could');
					});
			}
		}
	]
};
