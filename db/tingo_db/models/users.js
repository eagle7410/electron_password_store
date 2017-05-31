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
			let objList = [];
			list.map(user => {
				let newUser =Object.assign({}, user);
				newUser._id = Number(user._id);
				objList.push(newUser);
			});

			ok(objList);
		})
	});
});

const isValid = data => new Promise((ok, bad) => {
	if (!data.login) {
		return bad(libErr.valid('Login empty'));
	}

	if (!data.pass) {
		return bad(libErr.valid('Pass empty'));
	}

	model.count({login : data.login}, (err, count) => {
		if (err) {
			return bad(err);
		}

		if (count === 0) {
			return ok();
		}

		bad(libErr.valid('User no unique'));
	});
});

module.exports.save = data => new Promise((ok, bad) => {
	isValid(data)
		.then(() => {
			model.insert(data, (err, data) => {
				if (err) {
					return bad(err);
				}
				ok(Number(data[0]._id));
			})
		}, bad);
});
