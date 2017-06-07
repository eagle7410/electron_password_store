const Routes = require('../routes/RoutesConstDev');
const could  = require('../libs/drop-box');
const send   = require('../libs/send');
const pathManager = require('../libs/path-manager');
const zipper = require('../libs/zipper');

const reqTypes = send.reqTypes;
let model = null;
let config = [
	{
		route: Routes.dropBoxUploadAcrhive,
		type : reqTypes.post,
		handel: (res, action) => {
			let date = new Date();
			dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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
			model.getSettingsDBox()
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
					.then(requesttoken => model.setRequestToken(data, requesttoken))
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
			model.getRequestToken()
				.then(could.getAccessToken)
				.then(model.setAccessToken)
				.then(() => send.ok(res, action))
				.catch(err => {
					console.log('!ERR drop-box get access', err);
					send.err(res, action);
				})
		}
	}
];

module.exports = {
	setModel : (dbModel) => {
			model = dbModel; return module.exports
 	},
	config   : config
};
