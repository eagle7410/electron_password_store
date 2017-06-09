const async = require('async');
const modelConst = require('../modelConst');

/**
 * Merge data in collection different databases.
 * @method mergeCollection
 *
 * @param  {Function}   cb
 * @param  {object}     db
 * @param  {string}     name
 * @param  {Collection} modelSet
 * @param  {array}      props
 */
const mergeCollection = (cb, db, name , modelSet, props) => {
	db.collection(name).find({}, (err, cur) => {
		if (err) {
			return cb(err);
		}

		cur.toArray((err, list) => {
			if (err) {
				return bad(err);
			}

			let objList = [];

			list.map(rec => {
				let setRecord = {};
				props.map(prop => setRecord[prop] = rec[prop]);
				objList.push(setRecord);
			});

			modelSet.addMany(objList).then(() => cb(null), err => cb(err));
		})
	})
};

/**
 * Merge data.
 * @method up
 *
 * @param  {Collection} modelUsers
 * @param  {Collection} modelStorage
 * @param  {Collection} modelCategories
 * @param  {string} pathExtract
 *
 * @return {Promise}
 */
module.exports.up = (
	modelUsers, modelStorage, modelCategories, pathExtract
) => new Promise((ok, bad) => {
	const Engine = require('tingodb')();
	const db     = new Engine.Db(pathExtaract, {});

	async.waterfall([

		cb => mergeCollection(cb, db, modelConst.store, modelStorage, [
			'title',
			'login',
			'category',
			'pass',
			'desc',
			'answer'
		]),
		cb => mergeCollection(cb, db, modelConst.cat, modelCategories, [
			'name',
			'_id'
		]),
		cb => mergeCollection(cb, db, modelConst.usr, modelUsers, [
			'login',
			'pass',
			'_id'
		])
	], e => {
		if (e) {
			return bad(e);
		}

		ok();
	});
});
