import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
const _ = require('lodash');
import {User} from '../user';

const API_ROOT = 'http://hambasafetesting.azurewebsites.net';

const fbLogin = (errorCallback, successCallback):any => {
  FB.getLoginStatus(function(response) {
    console.log(response);
    var respJson: any = {};
    if (response.status !== 'connected') {
      FB.login((loginResponse: any) => {
        if (response.authResponse) {
          var respJson = _.pick(response.authResponse, ['accessToken', 'userID']);
          FB.api('/me', 'get', (apiResponse: any)=> {
            respJson.name = apiResponse.name;
            successCallback(respJson);
          });
        } else {
          errorCallback(loginResponse);
        }
      }) 
    } else {
      var respJson = _.pick(response.authResponse, ['accessToken', 'userID']);
      FB.api('/me', 'get', (apiResponse: any)=> {
        respJson.name = apiResponse.name;
        successCallback(respJson);
      });
    }
  })
}

const fbLogout = (errorCallback, successCallback):any => {
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.logout(function(response: any) {
        console.log(response);
        if (response.authResponse) {
          successCallback(response);
        } else {
          errorCallback(response);
        }
      }) 
    } else {
      successCallback(response);
    }
  })
}

/**
 *  Login
 */

// Success.
const setAuthSuccess = (response) => {
  console.log('Auth Success')
  console.log(response);
  return {
    data: fromJS({
      // 'username': response['name'],
      'accessToken' : response['accessToken'],
      'id'          : response['userID'],
      'name'        : response['name'],
      'status'      : 'AUTHENTICATED',
    }),
    type: actionTypes.USER_AUTH_SUCCESS,
  };
};

// Error.
const setAuthError = (error) => {
  return {
    data: fromJS({
      items: [],
      message: error,
      status: 'ERROR',
    }),
    type: actionTypes.USER_AUTH_FAIL,
  };
};

const setAuthTrying = () => {
  return {
    data: fromJS({
      items: [],
      status: 'ATTEMPTING',
    }),
    type: actionTypes.USER_AUTH_INIT,
  };
};

const authUser = ():any => {
  return dispatch => {
    // const url = 'https://www.reddit.com/top/.json?limit=10';


    //
    // Set loading state.
    //
    dispatch(setAuthTrying());
    fbLogin(
      (error) => dispatch(setAuthError(error)),
        (response) => dispatch(setAuthSuccess(response))
    );

  };
}



/**
 *  Logout
 */
// Success.
const setLogoutSuccess = (response) => {
  console.log('Auth Success')
  console.log(response);
  return {
    data: fromJS({
      'username': response['name'],
      'id': response['id'],
      'status': 'ANONYMOUS',
    }),
    type: actionTypes.USER_LOGOUT_SUCCESS,
  };
};

// Error.
const setLogoutError = (error) => {
  return {
    data: fromJS({
      items: [],
      message: error,
      status: 'ERROR',
    }),
    type: actionTypes.USER_LOGOUT_FAIL,
  };
}
const setLogoutTrying = () => {
  return {
    data: fromJS({
      items: [],
      status: 'ATTEMPTING',
    }),
    type: actionTypes.USER_LOGOUT_INIT,
  };
};

const logoutUser = ():any => {
  return dispatch => {
    // const url = 'https://www.reddit.com/top/.json?limit=10';


    //
    // Set loading state.
    //
    dispatch(setAuthTrying());
    fbLogout(
      (error) => dispatch(setLogoutError(error)),
        (response) => dispatch(setLogoutSuccess(response))
    );

  };
};;

export const authActions = {
  authUser,
  logoutUser,
};
