//import {EventEmitter} from 'events';
import React, {
  Component
} from 'react';

const {
  AsyncStorage,
  Navigator,
} = React;
var API_PATH = "http://test.wms.ecom-pl.com:8082/api/";
var GH_USER_KEY = 'GH_USER_KEY';
var EMPTY_USER = {
  name: '',
  userId: '',
  tokenInfo: '',
  dataDimession: {}
};
let GLOBAL_USER = EMPTY_USER;


class PServices extends Component {

  apiPath() {
    return API_PATH;
  }



  loginPost(username, password) {

    return new Promise(function(resolve, reject) {
      var url = API_PATH + 'Account/PostLogin';
      var data = JSON.stringify({
        LoginAccount: username.replace(/(^\s*)|(\s*$)/g, ''),
        LoginPassword: password.replace(/(^\s*)|(\s*$)/g, '')
      });


      fetch(url, {
          method: 'POST',
          headers: {
            //"Accept":"application/json",
            "Content-Type": "application/json"
          },
          body: data
        }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.IsSuccess) {
            var listOption = responseJson.Data.DataDimession;


            var result = {
              Area: listOption.filter((item) => item.DimensionType === 3).map((item) => item.DimensionValue),
              Stock: listOption.filter((item) => item.DimensionType === 4).map((item) => item.DimensionValue),
              Company: listOption.filter((item) => item.DimensionType === 5).map((item) => item.DimensionValue),
            };
            GLOBAL_USER.dataDimession = result;
            GLOBAL_USER.userId = responseJson.Data.ID;
            GLOBAL_USER.name = responseJson.Data.PetName;
            GLOBAL_USER.tokenInfo = responseJson.Data.AuthToken;
            resolve(GLOBAL_USER);
          } else {
            reject(new Error(responseJson.Result));

          }
        })
        .catch((error) => {
          reject(new Error(error));

        });

    });
  }

  queryLoginState() {
    return (
      AsyncStorage.getItem(GH_USER_KEY)
      .then(result => {
        if (result) {
          console.log('PackageServices start user is:' + result);
          GLOBAL_USER = JSON.parse(result);
        }
        return GLOBAL_USER;
      })
      .catch(err => {
        console.log('loginErr is: ' + err);
      })
    );
  }
  _setNeedSaveGlobalUser() {
    return AsyncStorage.setItem(GH_USER_KEY, JSON.stringify(GLOBAL_USER));
  }

  currentUser() {
    return GLOBAL_USER;
  }

}

const SingleGHService = new PServices();

module.exports = SingleGHService;