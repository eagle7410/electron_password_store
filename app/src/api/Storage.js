import {get, update, save , move, reqFull} from '../utils/Req'
import Routes from '../const/apiRoutes'

const type = Routes.store;
const addRecord  = data => reqFull(save, type, data);
const edit = data => reqFull(update, type, data);
const list = ()   => reqFull(get, type);
const del  = id   => reqFull(move, type, id);

export {addRecord, edit, del, list};
