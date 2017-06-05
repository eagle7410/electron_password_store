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

// const typeDBox = 'dropBox';
const typeDBox = 'dropBox';
module.exports.typeDBox = typeDBox;

module.exports.getSettingsDBox = () => new Promise((ok ,bad) => {
	model.findOne({type : typeDBox}, (err, doc) => {

		if (err || !doc) {
			return bad(err || 'No setting collectoion');
		}

		ok(doc);
	});
});
module.exports.setAccessToken = accessToken => new Promise((ok ,bad) => {
	model.findOne({type : typeDBox},  (err, doc) => {
		if (err || !doc) {
			return bad(err || 'No collection setting drop-box');
		}

		doc.accessToken = accessToken;

		model.update({_id : doc._id}, doc, (err, doc) => {
			if (err) {
				return bad(err);
			}

			ok(accessToken);
		});
	})

});

module.exports.getRequestToken = () => new Promise((ok ,bad) => {
	model.findOne({type : typeDBox}, (err, doc) => {

		if (err || !doc) {
			return bad(err || 'No setting collectoion');
		}

		ok(doc.requestToken);
	});
});

module.exports.setRequestToken = (apiData, requestToken) => new Promise((ok, bad) => {

	model.findOne({type : typeDBox},  (err, doc) => {
		if (err) {
			return bad(err);
		}

		if (!doc) {
			return model.insert({
				type : typeDBox,
				apiData : apiData,
				requestToken : requestToken
			}, err => err ? bad(err) : ok(requestToken));
		}

		doc.apiData = apiData;
		doc.requestToken = requestToken;

		model.update({_id: doc._id}, doc, err => err ? bad(err) : ok(requestToken));

	});
});
