const dbox = require('dbox');

let app = null;
let client = null;

const appInit = (key, secret) => {
	app = dbox.app({'app_key': key, 'app_secret': secret});
	return module.exports;
};

const clientInit = access_token => {
	client = app.client(access_token);
	return module.exports;
};

const checkConnect = call => client.account(status => call(status === 200));

const getConfirmLink = () => new Promise((ok, bad) => {
	app.requesttoken((status, requestToken) => {
		if (status === 200) {
			return ok(requestToken);
		}

		bad();

	})
});

const getAccessToken = requestToken => new Promise((ok, bad) => {

	app.accesstoken(requestToken, (status, access_token) => {

		if (status === 200) {
			module.exports.clientInit(access_token);

			checkConnect(okey => {

				if (okey) {
					return ok(access_token);
				}

				bad('Bad access_token');
			})

		} else {
			bad('Bad request for access_token');
		}

	});
});
const connectInit = data => new Promise((ok, bad) => {
	const api = data.apiData;

	appInit(api.apiKey, api.apiSecret)
		.clientInit(data.accessToken);

	checkConnect(okey => okey ? ok() : bad());
});

module.exports = {
	appInit : appInit,
	clientInit : clientInit,
	connectInit : connectInit,
	checkConnect : checkConnect,
	getConfirmLink : getConfirmLink,
	getAccessToken : getAccessToken
};
