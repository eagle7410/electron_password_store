/**
 * Created by igor on 23.04.17.
 */
import {combineReducers} from 'redux';
import {recordAdd} from './Storage/RecordAdd';
import {storage} from './Storage/Storage';
import {storageFilters} from './Storage/StorageFilters';
import {storageConfirm} from './Storage/Confirm';
import {users} from './Users/Users';
import {login} from './Login';
import {navMenu} from './NavMenu';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
	routing: routerReducer,
	recordAdd,
	storage,
	login,
	users,
	storageFilters,
	storageConfirm,
	navMenu
});

export {reducer};
