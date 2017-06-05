const Routes = require('../routes/RoutesConstDev');
const could  = require('../libs/drop-box');
const send   = require('../libs/send');

const reqTypes = send.reqTypes;
let model = null;

let config = [
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
