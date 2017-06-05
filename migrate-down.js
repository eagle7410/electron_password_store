const fileName = 'data.zip'
const fs = require('fs');
const path = __dirname + '/archives';
const pathFrom = __dirname + '/db_test/tingo_db/data';
const unzip  = require('unzip');
const async   = require('async');
var dbox = require('dbox')
var app = dbox.app({'app_key': 'ubcbn3drvnihgn5', 'app_secret': '5q63ex1wt3uohcf'});
var client = app.client(
	{ oauth_token_secret: 'b8svl4n9ezueyq0',
		oauth_token: 'segigyw2h71o5vcj',
		uid: '676270618' }

);

const getStringDate = () => {
	let d = new Date();
	return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;
}

const checkFolder = date => new Promise((ok, bad) => {
	let pathUpload = `${path}/upload`;
	let pathToday =  `${pathUpload}/${date}`;
	let pathZip =  `${pathToday}/${fileName}`;

	async.waterfall([
		cb => fs.exists(path, exists => exists ? cb(null) : fs.mkdir(path, e => cb(e))),
		cb => fs.exists(pathUpload, exists => exists ? cb(null) : fs.mkdir(pathUpload, e => cb(e))),
		cb => fs.exists(pathToday, exists => exists ? cb(null) : fs.mkdir(pathToday, e => cb(e))),
		cb => fs.exists(pathZip, exists => exists ? fs.unlink(pathZip, e => cb(e)) : cb(null))
	], err => err ? bad(err) : ok());
});

const moveFromCould = date => new Promise((ok, bad) => {
	let folder  = `${path}/upload/${date}`
	let fileZip = `${folder}/${fileName}`;
	client.get(fileName, (status, reply) => {
		if (status !== 200) {
			return bad(`Bad get archive status is ${status}`);
		}

		fs.writeFile(fileZip, reply, err => err ? bad(err) : ok());
	})

});

const unzipArchive = date => new Promise((ok, bad) => {
	fs.createReadStream(`${path}/upload/${date}/${fileName}`)
		.pipe(unzip.Extract({ path: `${path}/upload/${date}/unzip` }))
		.on('error', bad)
		.on('close', ok);

});

let date = getStringDate();
checkFolder(date)
	.then(() => moveFromCould(date))
	.then(() => unzipArchive(date))
	.then(r => {
		console.log('Success');
	})
	.catch(err => console.log('Err ', err));
