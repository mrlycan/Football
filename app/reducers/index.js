'use strict';
import {
	combineReducers
} from 'redux';
import login from './Login';
import data from './data';
const rootReducer = combineReducers({
	login,
	data,
});
export default rootReducer;