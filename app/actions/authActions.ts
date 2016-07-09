import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
const _ = require('lodash');

const API_ROOT = 'http://hambasafetesting.azurewebsites.net';

const fbLogin = (errorCallback, successCallback):any => {
  console.log('fbLogin');
  // window.parseManager.facebookLogin(
  //   'public_profile, email',
  //   successCallback(response),
  //   errorCallback(response)
  // )
  // console.log(typeof(FB.getLoginStatus));
  // FB.getLoginStatus(function(response) {
  //   console.log('Status');
  //   console.log(JSON.stringify(response));
  //   if (response.status !== 'connected') {
  //     FB.login((response: any) => {
  //       var respJson: any = {};
  //       if (response.authResponse) {
  //         var respJson = _.pick(response.authResponse, ['accessToken', 'userID']);
  //         respJson.fbId = respJson.userID;
  //         respJson.userID = undefined;
  //         FB.api('/me', 'get', {
  //           'fields' : [
  //             'first_name',
  //             'last_name',
  //             'birthday',
  //             'gender',
  //             'email',
  //             'picture',
  //           ]
  //         },
  //         (apiResponse: any) => {
  //           console.log(apiResponse);
  //            _.merge(respJson,  _.pick(apiResponse, [
  //             'first_name',
  //             'last_name',
  //             'birthday',
  //             'gender',
  //             'email',
  //           ]));
  //           respJson.picture = respJson.picture && apiResponse.picture.data ? apiResponse.picture.data.url : '';
  //           respJson.isSilhouette = respJson.picture && apiResponse.picture.data ? apiResponse.picture.data.is_silhouette : null;

  //           // jsonRequest(
  //           //   API_ROOT + '/v1/Authentication/ExternalLogin',
  //           //   {
  //           //     method: 'POST',
  //           //     body:  {
  //           //       'accessToken' : respJson['accessToken']
  //           //     }
  //           //   },
  //           console.log(respJson);
  //           successCallback(respJson);// ,
  //           // errorCallback(loginResponse),
  //           // )
  //         });
  //       } else {
  //         errorCallback(response);
  //       }
  //     } , {
  //       scope: 'public_profile, email',
  //       return_scopes: true,
  //     })

  //   } else {
  //     var respJson = _.pick(response.authResponse, ['accessToken', 'userID']);
  //     respJson.fbId = respJson.userID;
  //     respJson.userID = undefined;
  //     //TODO: Remove
  //     respJson['wasLoggedIn'] = true;
  //     console.log(response);
  //     FB.api('/me', 'get', {
  //       'fields' : [
  //         'first_name',
  //         'last_name',
  //         'birthday',
  //         'gender',
  //         'email',
  //         'picture',
  //       ]
  //     }, (apiResponse: any) => {
  //            _.merge(respJson,  _.pick(apiResponse, [
  //             'first_name',
  //             'last_name',
  //             'birthday',
  //             'gender',
  //             'email',
  //           ]));
  //           respJson.picture = apiResponse.picture.data.url;
  //           respJson.isSilhouette = apiResponse.picture.data.is_silhouette;

  //       // jsonRequest(
  //       //   API_ROOT + '/v1/Authentication/ExternalLogin',
  //       //   {
  //       //     method: 'POST',
  //       //     body:  {
  //       //       'accessToken' : respJson['accessToken']
  //       //     }
  //       //   },
  //       successCallback(respJson);// ,
  //       // errorCallback(loginResponse),
  //       // )
  //     });
  //   }
  // })
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
  // if(!response['wasLoggedIn']){
  //   response['status'] = 'NEW_USER';
  // } else {
    response['status'] = 'AUTHENTICATED';
  // }
  response = _.mapKeys(response, function(value, key) {
    return _.camelCase(key);
  });
  return {
    data: fromJS(response),
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
    // Set loading state.
    dispatch(setAuthTrying());
    window.parseManager.facebookLogin(
      'public_profile, email',
      (response) => dispatch(setAuthSuccess(response)),
      (error) => dispatch(setAuthError(error))
    )
  };
}

/**
 *  Logout Success
 */
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

/**
 *  Logout Error
 */
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
};

const setAuthenticated = ():any => {
  return {
    data: fromJS({
      status: 'AUTHENTICATED',
    }),
    type: actionTypes.USER_SET_STATUS,
  }
}

export const authActions = {
  authUser,
  logoutUser,
  setAuthenticated,
};
