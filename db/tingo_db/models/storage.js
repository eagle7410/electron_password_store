let model = null;

module.exports.init = db => {
	model = db.collection('storage');
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

			let arStore = [];

			list.map(rec => {
				let newRec = Object.assign({}, rec);
				newRec.id = rec._id;
				delete newRec._id;
				arStore.push(newRec);
			});

			ok(arStore);
		})
	});
});
