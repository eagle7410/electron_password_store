const fs = require('fs');
const fileName    = 'data.zip';
const pathArchive = `${__dirname}/../archives`;
const pathUpload  = `${pathArchive}/upload`;

const pathDb      = `${__dirname}/../db/tingo_db/data`;
/**
 * Return upload dir.
 * @param {string} date
 */
const getUploadPath = date => `${pathUpload}/${date}/`;

/**
 * Check exist path.
 * if path not exists try create him.
 *
 * @param {string} path
 *
 * @return {{Promise}}
 */
const checkPath = path => new Promise((ok,bad) => fs.exists(path, exists => exists ? ok() : fs.mkdir(path, e => e ? bad(e) : ok())));

const checkDownloadFolder = date => new Promise((ok, bad) => {
	let pathToday =  `${pathUpload}/${date}`;

	checkPath(pathArchive)
		.then(() => checkPath(pathUpload))
		.then(() => checkPath(pathToday))
		.then(ok(pathToday))
		.catch(e => bad(e));

});

/**
 * Get acrhive file name.
 * @method getArchiveName
 * @return {string}
 */
const getArchiveName = () => fileName;
/**
 * Get path folder to database.
 *
 * @method getPathDb
 * @return {string}
 */
const getPathDb = () => pathDb;

/**
 * Return path to new archive
 * @method getNewArchivePath
*  @param  {string} date
 * @return {string}
 */
const getNewArchivePath = date => `${pathArchive}/${date}/${fileName}`;

/**
 * Check exist path to new archive.
 * if no exist create him.
 * @method checkFolderNewArchive
 * @param  {string}  date
 * @return {{Promise}}
 */
const checkFolderNewArchive = date => new Promise((ok, bad) => {
	let pathToday = pathArchive + '/' + date;
	let pathZip = getNewArchivePath(date);

	checkPath(pathArchive)
		.then(() => checkPath(pathToday))
		.then(
			() => fs.exists(pathZip, exists => exists ? fs.unlink(pathZip, e => e ? bad(e) : ok() ) : ok())
		)
		.catch(e => bad(e));

});

/**
 * Delete path.
 * @param {string} path
 */
const deleteFolderRecursive = path => {
	if ( fs.existsSync(path) ) {

		fs.readdirSync(path).forEach( file => {
			let curPath = `${path}/${file}`;

			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});

		fs.rmdirSync(path);
	}
};

module.exports = {
	checkFolderNewArchive : checkFolderNewArchive,
	getNewArchivePath : getNewArchivePath,
	getPathDb : getPathDb,
	getArchiveName : getArchiveName,
	checkDownloadFolder : checkDownloadFolder,
	getUploadPath : getUploadPath,
	deleteFolderRecursive : deleteFolderRecursive
};
