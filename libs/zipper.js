const folderZip  = require('zip-folder');
const unzip  = require('unzip');
const fs = require('fs');
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

const unzipArchive = (pathZip, pathExract) => new Promise((ok, bad) => {
	fs.createReadStream(pathZip)
		.pipe(unzip.Extract({ path: pathExract }))
		.on('error', bad)
		.on('close', ok);

});

module.exports = {
	createArhive : createArhive,
	unzipArchive : unzipArchive
}
