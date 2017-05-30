let model = null;

module.exports.init = db => {
	model = db.collection('settings');
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

			ok(list);
		})
	});
});
