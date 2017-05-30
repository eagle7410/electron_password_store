
module.exports.get = function (db, name) {
	const model = require('./models/' + name);
	model.init(db);
	return model;

};
