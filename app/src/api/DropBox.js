import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const getLink   = data => reqFull(get, Routes.dropBoxConLink, data);
const getAccess = data => reqFull(get, Routes.dropBoxAccess);
const getConnect = data => reqFull(get, Routes.dropBoxConInit);
const postArchive = data => reqFull(save, Routes.dropBoxUploadAcrhive);
const putDropBoxArchive = date => reqFull(update, Routes.dropBoxUpload, date);

export {
	getLink,
	getAccess,
	getConnect,
	postArchive,
	putDropBoxArchive
};
