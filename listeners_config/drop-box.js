const Routes = require('../routes/RoutesConstDev');
const could  = require('../libs/drop-box');
const send   = require('../libs/send');
const pathManager = require('../libs/path-manager');
const zipper = require('../libs/zipper');

const reqTypes = send.reqTypes;

let modelUsers = null;
let modelStorage = null;
let modelSettings = null;
let modelCategories = null;

let config = [
	{
		type : reqTypes.del,
		route: Routes.dropBoxDownloadAcrhiveClear,
		handel: (res, action, dateStr) => {
			let pathUpload = pathManager.getUploadPath(dateStr);
			pathManager.deleteFolderRecursive(pathUpload);
			send.ok(res, action, dateStr);
		}
	},
	{
		type : reqTypes.post,
		route: Routes.dropBoxDownloadAcrhiveMerge,
		handel: (res, action, dateStr) => {

			let pathUpload = pathManager.getUploadPath(dateStr);
			let pathExract = `${pathUpload}/unzip`;

			require('../libs/migrate-tingo').up(modelUsers, modelStorage, modelCategories, pathExract)
				.then(
					() => send.ok(res, action, dateStr)
				).catch(err => {
					console.log('!ERR merge archive', err);
					send.err(res, action, 'ERR merge archive');
				});

		}
	},
	{
		type : reqTypes.put,
		route: Routes.dropBoxDownloadAcrhiveExtract,
		handel: (res, action, dateStr) => {

			let pathUpload = pathManager.getUploadPath(dateStr);
			let pathZip = `${pathUpload}/${pathManager.getArchiveName()}`
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
		route: Routes.dropBoxDownloadAcrhive,
		handel: (res, action) => {
			let date = new Date();
			let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

			pathManager.checkDownloadFolder(dateStr)
				.then(pathDowload => could.moveFromCould(pathDowload, pathManager.getArchiveName()))
				.then(r => send.ok(res, action, dateStr))
				.catch(err => {
					console.log('!ERR download archive', err);
					send.err(res, action, 'ERR download archive');
				});
		}
	},
	{
		route: Routes.dropBoxUploadAcrhive,
		type : reqTypes.post,
		handel: (res, action) => {
			let date = new Date();
			let dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

			const zipPath  = pathManager.getNewArchivePath(dateStr);

			pathManager.checkFolderNewArchive(dateStr)
				.then(() => zipper.createArhive(pathManager.getPathDb(), zipPath))
				.then(() => send.ok(res, action, dateStr))
				.catch(err => {
					console.log('!ERR create archive', err);
					send.err(res, action, 'ERR create archive');
				});
		}
	},
	{
		route: Routes.dropBoxUpload,
		type : reqTypes.put,
		handel: (res, action, date) => {
			const zipPath = pathManager.getNewArchivePath(date);
			const fileName = pathManager.getArchiveName();

			could.moveToCould(zipPath, fileName)
				.then(() => send.ok(res, action))
				.catch(err => {
					console.log('!ERR move to could', err);
					send.err(res, action, 'ERR move to could');
				});
		}
	},
	{
		route: Routes.dropBoxConInit,
		handel: (res, action) => {
			modelSettings.getSettingsDBox()
				.then(could.connectInit)
				.then(() => send.ok(res, action))
				.catch(err => {
					console.log('!ERR init dropBox connect', err);
					send.err(res, action, 'Error get dropBox connect');
				});
		}
	},
	{
		route  : Routes.dropBoxConLink,
		handel : (res, action, data) => {
			could.appInit(data.apiKey, data.apiSecret)
				.getConfirmLink()
					.then(requesttoken => modelSettings.setRequestToken(data, requesttoken))
					.then(requesttoken => send.ok(res, action, requesttoken.authorize_url))
					.catch(err => {
						console.log('!ERR drop-box get confirm link ', err);
						send.err(res, action);
					})
		}
	},
	{
		route  : Routes.dropBoxAccess,
		handel : (res, action) => {
			modelSettings.getRequestToken()
				.then(could.getAccessToken)
				.then(modelSettings.setAccessToken)
				.then(() => send.ok(res, action))
				.catch(err => {
					console.log('!ERR drop-box get access', err);
					send.err(res, action);
				})
		}
	}
];

module.exports = {
	setModels : (
		mdUsers,
		mdStorage,
		mdSettings,
		mdCategories
	) => {
			modelUsers = mdUsers;
			modelStorage = mdStorage;
			modelSettings = mdSettings;
			modelCategories = mdCategories;
			return module.exports
 	},
	config   : config
};
