import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import {Facebook} from 'ionic-native';
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
}

const fbLogout = (errorCallback, successCallback):any => {

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.logout(function(response: any) {
        console.log(response);
        if (response.authResponse) {
          window.parseManager.logOut(
            successCallback,
            errorCallback
          )
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
  if(!response.isRegistered) {
    response['status'] = 'NEW_USER';
  } else {
    response['status'] = 'AUTHENTICATED';
  }
  response = _.mapKeys(response, function(value, key) {
    if (key == 'birthday') {
      return 'dateOfBirth';
    }
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
      (response) => getProfile(
        (response) => dispatch(setAuthError(response)), 
        (response) => dispatch(setAuthSuccess(response))
      ),
      (error) => dispatch(setAuthError(error))
    )
  };
}

const authDevice = ():any => {
  return dispatch => {
    console.log('dispatching auth Device');
    // Set loading state.
    dispatch(setAuthTrying());
    Facebook.getLoginStatus().then((res)=>{
      console.log('login Status');
      console.log(res);
      if(res.status !== 'connected') {
				var expDate = new Date(new Date().getTime() + res.authResponse.expiresIn * 1000 ).toISOString();
				var authData = {
					id: String(res.authResponse.userID),
					access_token: res.authResponse.accessToken,
					expiration_date: expDate
				}
        Facebook.login(['public_profile', 'email']).then((res)=>{
          (res) => {
            window.parseManager.deviceLogin(
              // (response) => console.log(response),
              res.authResponse,
              (response) => getProfile(
                (response) => dispatch(setAuthError(response)), 
                  (response) => dispatch(setAuthSuccess(response))
              ),
              (error) => dispatch(setAuthError(error))
            )
          }
        })
      } else {
				var authData = {
					id: String(res.authResponse.userID),
					access_token: res.authResponse.accessToken,
					expiration_date: expDate
				}

        window.parseManager.deviceLogin(
          // (response) => console.log(response),
          authData,
          (response) => getProfile(
            (response) => dispatch(setAuthError(response)), 
              (response) => dispatch(setAuthSuccess(response))
          ),
          (error) => dispatch(setAuthError(error))
        )
      }
    });
  };
}

/**
 *  Logout Success
 */
const setLogoutSuccess = () => {
  console.log('Logout Success')
  return {
    data: fromJS({
      status: 'ANONYMOUS',
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
        () => dispatch(setLogoutSuccess())
    );

  };
};

const setAnonymous = ():any => {
  return {
    data: fromJS({
      status: 'ANONYMOUS',
    }),
    type: actionTypes.USER_SET_STATUS,
  }
}
const setAuthenticated = ():any => {
  return {
    data: fromJS({
      status: 'AUTHENTICATED',
    }),
    type: actionTypes.USER_SET_STATUS,
  }
}

/**
 * getFacebookProfile
 */
const getProfile = (errorCallback, successCallback): any => {
  console.log('get Profile');
  var userRegistered = window.parseManager.userRegistered();
  if(userRegistered) {
    getParseProfile(errorCallback, successCallback);
  } else {
    getFacebookProfile(errorCallback, successCallback);
  }
}

const getParseProfile = (errorCallback, successCallback): any => {
  var respJson = {
    'isRegistered' : true,
  }
  var userObj = window.parseManager.getCurrentUser();
  Object.keys(userObj.attributes).forEach(function(fieldName) {
    console.log(fieldName);
    userObj.get(fieldName);
    respJson[fieldName] = userObj.get(fieldName);
  })
  console.log(respJson);
  successCallback(respJson);
}

const getFacebookProfile = (errorCallback, successCallback): any => { 
  var respJson : any = {
    'isRegistered' : false,
  }
  FB.getLoginStatus((response)=> {
    console.log('Status');
    console.log(JSON.stringify(response));
    if (response.status !== 'connected') {
      this.setAnonymous()
    } else {
      _.merge(respJson, _.pick(response.authResponse, ['accessToken' , 'userID']));
      respJson.fbId = respJson.userID;
      respJson.userID = undefined;
      //TODO: Remove
      console.log(response);
      FB.api('/me', 'get', {
        'fields' : [
          'first_name',
          'last_name',
          'birthday',
          'gender',
          'email',
          'picture',
        ]
      }, (apiResponse: any) => {
        _.merge(respJson,  _.pick(apiResponse, [
          'first_name',
          'last_name',
          'birthday',
          'gender',
          'email',
        ]));
        respJson.picture = apiResponse.picture.data.url;
        respJson.isSilhouette = apiResponse.picture.data.is_silhouette;

        // jsonRequest(
        //   API_ROOT + '/v1/Authentication/ExternalLogin',
        //   {
        //     method: 'POST',
        //     body:  {
        //       'accessToken' : respJson['accessToken']
        //     }
        //   },
        successCallback(respJson);// ,
        // errorCallback(loginResponse),
        // )
      });
    }
  })

}
export const authActions = {
  authUser,
  authDevice,
  logoutUser,
  setAuthenticated,
};
