/**
 * Created by igor on 23.04.17.
 */
import {combineReducers} from 'redux';
import {recordAdd} from './Storage/RecordAdd';
import {storage} from './Storage/Storage';
import {storageEdit} from './Storage/StorageEdit';
import {storageFilters} from './Storage/Filters';
import {storageCategories} from './Storage/Categories';
import {dataConfirm} from './Confirm';
import {users} from './Users/Users';
import {login} from './Login';
import {navMenu} from './NavMenu';
import {alert} from './Alert'
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
	routing: routerReducer,
	recordAdd,
	login,
	users,
	storage,
	storageEdit,
	storageFilters,
	storageCategories,
	alert,
	dataConfirm,
	navMenu
});

export {reducer};
