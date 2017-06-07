const dBox = 'drop-box';
const connect = dBox + '-connect';
const upload = dBox + '-upload';
const Routes = {
	appInit   : 'app-init',
	auth      : 'auth',
	cat       : 'category',
	usr       : 'user',
	usrList   : 'users-list',
	sdfPath   : 'sdf-path',
	sdfLoad   : 'sdf-load',
	store     : 'storage',
	dropBoxConLink : connect + '-link',
	dropBoxAccess  : connect + '-access-token',
	dropBoxConInit : connect + '-init',
	dropBoxConCheck : connect + '-check',
	dropBoxUploadAcrhive : upload + '-create-archive',
	dropBoxUpload        : upload
};

module.exports = Routes;
/**
 * Created by igor on 01.06.17.
 */
