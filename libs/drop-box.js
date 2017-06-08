const dbox = require('dbox');
const fs   = require('fs');

let app = null;
let client = null;

/**
 * Init app drop-box
 * @method appInit
 * @param  {string} key
 * @param  {string} secret
 * @return {module.exports}
 */
const appInit = (key, secret) => {
	app = dbox.app({'app_key': key, 'app_secret': secret});
	return module.exports;
};

/**
 * Init client in drop-box app.
 * @method clientInit
 * @param  {object}   access_token [description]
 * @return {module.exports}                [description]
 */
const clientInit = access_token => {
	client = app.client(access_token);
	return module.exports;
};

/**
 * Check connect client drop-box app.
 * @method checkConnect
 * @param  {function}     call [description]
 */
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

const moveToCould = (fileZip, fileName) => new Promise((ok, bad) => {
	fs.readFile(fileZip, (err, content) => {
		if (err) {
			return bad(err);
		}

		client.put(fileName, content, status => status === 200 ? ok() : bad(`Request return status ${status}`));
	});

});

/**
 * Get archive from drop-box.
 *
 * @method moveFromCould
 * @param  {string}      folder   [description]
 * @param  {string}      fileName [description]
 * @return {Propmise}               [description]
 */
const moveFromCould = (folder, fileName) => new Promise((ok, bad) => {
	client.get(fileName, (status, reply) => {
		if (status !== 200) {
			return bad(`Bad get archive status is ${status}`);
		}

		fs.writeFile(`${folder}/${fileName}`, reply, err => err ? bad(err) : ok());
	});
});

module.exports = {
	appInit : appInit,
	clientInit : clientInit,
	connectInit : connectInit,
	checkConnect : checkConnect,
	getConfirmLink : getConfirmLink,
	getAccessToken : getAccessToken,
	moveToCould : moveToCould,
	moveFromCould : moveFromCould
};
