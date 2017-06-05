const fileName = 'data.zip'
const fs = require('fs');
const path = __dirname + '/archives';
const pathFrom = __dirname + '/db_test/tingo_db/data';
const zipper  = require('zip-folder');
const async   = require('async');
var dbox = require('dbox')
var app = dbox.app({'app_key': 'ubcbn3drvnihgn5', 'app_secret': '5q63ex1wt3uohcf'});
var client = app.client(
	{ oauth_token_secret: 'b8svl4n9ezueyq0',
		oauth_token: 'segigyw2h71o5vcj',
		uid: '676270618' }

);
// create zipp
const getStringDate = () => {
	let d = new Date();
	return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
}

const createArhive = (folder, date) => new Promise(
	(ok, bad) => zipper(folder, `${path}/${date}/${fileName}`, err => err ? bad(err) : ok()
));

const checkFolder = date => new Promise((ok, bad) => {
	let pathToday =  `${path}/${date}`;
	let pathZip = `${path}/${date}/${fileName}`;

	async.waterfall([
		cb => fs.exists(path, exists => exists ? cb(null) : fs.mkdir(path, e => cb(e))),
		cb => fs.exists(pathToday, exists => exists ? cb(null) : fs.mkdir(pathToday, e => cb(e))),
		cb => fs.exists(pathZip, exists => exists ? fs.unlink(pathZip, e => cb(e)) : cb(null))
	], err => err ? bad(err) : ok());

});

const moveToCould = date => new Promise((ok, bad) => {
	let fileZip = `${path}/${date}/${fileName}`;
	fs.readFile(fileZip, (err, content) => {
		if (err) {
			return bad(err);
		}

		client.put(fileName, content, status => status === 200 ? ok() : bad(`Request return status ${status}`));
	});

});
let date = getStringDate();
checkFolder(date)
	.then(() => createArhive(pathFrom, date))
	.then(() => moveToCould(date))
	.then(r => {
		console.log('Success');
	})
	.catch(err => console.log('Err ', err));
