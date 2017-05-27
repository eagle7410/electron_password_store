/**
 * Created by igor on 23.04.17.
 */
import {combineReducers} from 'redux';
import {record} from './Storage/Record';
import {storage} from './Storage/Storage';
import {users} from './Users/Users';
import {login} from './Login';
import {navMenu} from './NavMenu';
import { routerReducer } from 'react-router-redux';

const reducer = combineReducers({
	routing: routerReducer,
	record,
	storage,
	login,
	users,
	navMenu
});

export {reducer};
