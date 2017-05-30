let model = null;
let libErr = require('../../../libs/errors');
module.exports.init = db => {
	model = db.collection('users');
	module.exports.model = model;
};

module.exports.model = null;

module.exports.loginList = () => new Promise((ok, bad) => {
	model.find({},  {fields : {login:1}}, (err, cur) => {
		if (err) {
			return bad(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let arList = [];
			list.map(rec => arList.push(rec.login));

			ok(arList);
		})
	});
});

const sailt = 'igor';

module.exports.auth = (login, pass) => new Promise((ok, bad) => {
	model.findOne({login: login}, (err, user) => {
		if (err) {
			return bad(err);
		}

		if (user.pass === pass) {
			ok(sailt);
		}

		bad(libErr.auth());

	})
});

module.exports.list = () => new Promise((ok, bad) => {
	model.find({},  (err, cur) => {
		if (err) {
			return bad(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			ok(list);
		})
	});
});
