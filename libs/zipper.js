const folderZip  = require('zip-folder');

/**
 * Create acrhive for folder.
 * @method createArhive
 * @param  {string}  folder
 * @param  {string}  zipPath
 * @return {Promise}
 */
const createArhive = (folder, zipPath) => new Promise(
	(ok, bad) => folderZip(folder, zipPath, err => err ? bad(err) : ok()
));

module.exports = {
	createArhive : createArhive
}
