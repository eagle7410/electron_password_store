/**
 * Created by igor on 23.04.17.
 */
import {combineReducers} from 'redux';
import {add} from './Password/Add';
import {list} from './Password/List';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	routing: routerReducer,
	add,
	list
})
