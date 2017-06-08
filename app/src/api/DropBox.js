import {save, move, update, reqFull, get} from '../utils/Req'
import Routes from '../const/apiRoutes'

const getLink   = data => reqFull(get, Routes.dropBoxConLink, data);
const getAccess = data => reqFull(get, Routes.dropBoxAccess);
const getConnect = data => reqFull(get, Routes.dropBoxConInit);
const postArchive = data => reqFull(save, Routes.dropBoxUploadAcrhive);
const getArchive = () => reqFull(get, Routes.dropBoxDownloadAcrhive);
const putDropBoxArchive = date => reqFull(update, Routes.dropBoxUpload, date);
const extractArhive = date => reqFull(update, Routes.dropBoxDownloadAcrhiveExtract, date);
const mergeArhive = date => reqFull(save, Routes.dropBoxDownloadAcrhiveMerge, date);
const clearArhive = date => reqFull(move, Routes.dropBoxDownloadAcrhiveClear, date);

export {
	getLink,
	getAccess,
	getConnect,
	postArchive,
	putDropBoxArchive,
	getArchive,
	extractArhive,
	mergeArhive,
	clearArhive
};
