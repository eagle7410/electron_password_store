const Engine = require('tingodb')();
const fs = require('fs');
const crypto = require(`${__dirname}/../libs/crypto`);
const dbPath = `${__dirname}/../db/tingo_db/data`;
const db = new Engine.Db(dbPath, {});
const users      = db.collection('users');
const storage    = db.collection('storage');
const settings   = db.collection('settings');
const categories = db.collection('categories');

const removeFiles = files => new Promise((ok, bad) => {

	let arrCall = [];

	files.map(file => {
		arrCall.push(new Promise((ok, bad) => {
			fs.unlink(`${dbPath}/${file}`, err => {
				if (err) return bad(err);
				ok();
			});
		}))
	});

	Promise.all(arrCall).then(ok).catch(bad);
});

const clearDb = () => new Promise((ok, bad) => {
	fs.readdir(dbPath, (err, files) => {
		if (err) return bad(err);

		removeFiles(files).then(ok, bad)
	});

});

const insertUser = () => new Promise((ok, bad) => {
	users.insert({
		login : 'test',
		pass  : crypto.hash('test')
	}, err => {
		if (err) {
			console.log('!!Error ins user');
			return bad(err);
		}

		console.log('~Add users');
		ok();
	})
});
const insertCategories = () => new Promise((ok, bad) => {
	categories.insert([{ name : 'All Categories'},{ name : 'Unknown'}], err => {
		if (err) {
			console.log('!!Error ins user');
			return bad(err);
		}

		console.log('~Add Categories');
		ok();
	})
});

const insertData =() => new Promise((ok, bad) => {
	insertUser()
		.then(insertCategories)
		.then(ok)
		.catch(bad);
});

const showUsers = () => new Promise((ok, bad) => {
	users.find({}, (err, cur) => {
		if (err) {
			console.log('!Err get user', err);
			return bad();
		}

		cur.toArray((err, users) => {
			if (err) {
				console.log('!Err get currsor user', err);
				return bad();
			}

			console.log('User', users);
			ok();
		})
	});
});

const showCategories = () => new Promise((ok, bad) => {
	categories.find({}, (err, cur) => {
		if (err) {
			console.log('!Err get categories', err);
			return bad();
		}

		cur.toArray((err, categories) => {
			if (err) {
				console.log('!Err get currsor categories', err);
				return bad();
			}

			console.log('categories', categories);
			ok();
		})
	});
});

const showResult = () => new Promise((ok, bad) => {
	showUsers()
		.then(showCategories)
		.then(ok)
		.catch(bad);
});

clearDb()
	.then(insertData)
	.then(showResult)
	.catch(e => console.log('Err', e));
