'use strict'
import * as types from '../actions/actionTypes';

const initialState = {
	username: '',
	password: '',
	logining: false,
	logined: false,
	rawData: undefined,
}

export default function Login(state = initialState, action) {
	state = Object.assign({}, state, {
		logined: false,
	});
	switch (action.type) {
		case types.FETCH_LOGIN_RESULT:
			return Object.assign({}, state, {
				logining: true,
			});
		case types.RECEIVE_LOGIN_RESULT:
			return Object.assign({}, state, {
				logining: false,
				logined: true,
				name:action.rawData.name,
				rawData: action.rawData,
			});

		case types.CHANGE_LOGIN_AUTH:
			let newState = state;
			if (action.username != undefined && action.username.length >= 0) {
				newState = Object.assign({}, newState, {
					username: action.username,
				});
			}
			if (action.password != undefined && action.password.length >= 0) {
				newState = Object.assign({}, newState, {
					password: action.password,
				});
			}
			if (action.rawData != undefined) {
				newState = Object.assign({}, newState, {
					rawData: action.rawData,
				});
			}
			return newState;
		case types.LOGIN_OUT:
		return Object.assign({},state,initialState);
		default:
			return state;
	}
}