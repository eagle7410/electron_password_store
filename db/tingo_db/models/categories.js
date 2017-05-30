const libErr = require('../../../libs/errors');
let model = null;
module.exports.init = db => {
	model = db.collection('categories');
	module.exports.model = model;
};

module.exports.model = null;

module.exports.list = () => new Promise((ok, bad) => {
	model.find({},  (err, cur) => {
		if (err) {
			return bad(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let objList = {};
			list.map(cat => {
				objList[cat._id] = cat.name;
			});

			ok(objList);
		})
	});
});

const isValid = name => new Promise((ok, bad) => {
	if (!name) {
		return bad(libErr.valid('Name category empty'));
	}

	model.count({name : name}, (err, count) => {
		if (err) {
			return bad(err);
		}

		if (count === 0) {
			return ok();
		}

		bad(libErr.valid('Category no unique'));
	});
});

module.exports.save = name => new Promise((ok, bad) => {
	isValid(name)
		.then(() => {
			model.insert({name: name}, (err, data) => {
				if (err) {
					return bad(err);
				}

				ok({name: name, id : data[0]._id.id});
			})
		}, bad);
});

module.exports.delete = id => new Promise((ok, bad) => {
	model.remove({_id :id}, err => err ? bad(err) : ok());
});

module.exports.updateSafe = (id, name) => new Promise((ok, bad) => {
	isValid(name)
		.then(() => {
			model.update({_id: id}, {name : name }, err => {
				if (err) {
					return bad(err);
				}

				ok();
			})
		}, bad);
});
