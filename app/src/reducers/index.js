/**
 * Created by igor on 23.04.17.
 */
import { routerReducer } from 'react-router-redux';
import {combineReducers} from 'redux';
import {recordAdd} from './Storage/RecordAdd';
import {storage} from './Storage/Storage';
import {storageFilters} from './Storage/Filters';
import {storageCategories} from './Storage/Categories';
import {dataConfirm} from './Confirm';
import {users} from './Users/Users';
import {login} from './Login';
import {navMenu} from './NavMenu';
import {alert} from './Alert'
import {dataLoader} from './DataLoader'
import {sdf} from './Settings/Sdf'
import {sdfTools} from './Settings/SdfTools'
import {dropBoxSettingsForm} from './Settings/DropBoxSettingsForm'
import {dropBoxConnectSteps} from './Settings/DropBoxConnectSteps'
import {dropBoxStepsUpload} from './Settings/DropBoxStepsUpload'

const reducer = combineReducers({
	routing: routerReducer,
	recordAdd,
	login,
	users,
	storage,
	storageFilters,
	storageCategories,
	alert,
	dataConfirm,
	dataLoader,
	navMenu,
	sdf,
	sdfTools,
	dropBoxSettingsForm,
	dropBoxConnectSteps,
	dropBoxStepsUpload
});

export {reducer};
