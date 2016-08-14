'use strict';

import React, {
  Component
} from 'react';

import {
  AlertIOS
} from 'react-native';
import * as TYPES from './actionTypes';
import PServices from '../command/PServices';

export function fetchLogin(username, password) {

  let url = '';
  return (dispatch) => {
    dispatch(fetchLoginResult());

    PServices.loginPost(username, password)
      .then((responeJson) => {
        var data = responeJson.Data;
        dispatch(receiveLoginResult(responeJson));
      }).catch((e) => {
        AlertIOS.alert(e.message);
        dispatch(receiveLoginResult());
      });
  }
}


function fetchLoginResult() {
  return {
    type: TYPES.FETCH_LOGIN_RESULT,
  }
}

function receiveLoginResult(responseData) {
  return {
    type: TYPES.RECEIVE_LOGIN_RESULT,
    rawData: responseData,
  }
}

export function changeLoginAuth({
  username,
  password,
  rawData
}) {

  return {
    type: TYPES.CHANGE_LOGIN_AUTH,
    username: username,
    password: password,
    rawData: rawData
  }
}

export function logOut() {
  return{
    type:TYPES.LOGIN_OUT
  }
}