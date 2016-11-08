declare var FB;
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { fromJS } from 'immutable';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
const _ = require('lodash');
// const thunk = require( 'redux-thunk').default;

import actionTypes from '../actionTypes';

import {ParseManager} from '../providers/parse-manager';

/*
  Generated class for the AuthActions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthActions {

  constructor(public http: Http, public parseManager: ParseManager, public platform: Platform) {
    console.log('Hello AuthActions Provider');
  }

  fbLogin(errorCallback, successCallback):any {
    console.log('fbLogin');
    // this.parseManager.facebookLogin(
    //   'public_profile, email',
    //   successCallback(response),
    //   errorCallback(response)
    // )
    // console.log(typeof(FB.getLoginStatus));
  }

  deviceLogout(errorCallback, successCallback):any{
    Facebook.getLoginStatus().then( (response:any) => {
      if (response.status === 'connected') {
        Facebook.logout().then((response: any) => {
          console.log(response);
          if (response.authResponse) {
            successCallback()
          } else {
            errorCallback(response);
          }
        }) 
      } else {
        successCallback(response);
      }
    })
  }
  fbLogout(errorCallback, successCallback):any{
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.logout(function(response: any) {
          console.log(response);
          if (response.authResponse) {
            this.parseManager.logOut(
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
  setAuthSuccess(response):any {
    console.log('Auth Success')
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
  setAuthError(error){
    return {
      data: fromJS({
        items: [],
        message: error,
        status: 'ERROR',
      }),
      type: actionTypes.USER_AUTH_FAIL,
    };
  };

  setAuthTrying(){
    return {
      data: fromJS({
        items: [],
        status: 'ATTEMPTING',
      }),
      type: actionTypes.USER_AUTH_INIT,
    };
  };

  authUser():any {
    return dispatch => {
      // Set loading state.
      dispatch(this.setAuthTrying());
      this.parseManager.facebookLogin(
        'public_profile, email',
        (response) => this.getProfile(
          (response) => {
            dispatch(this.setAuthError(response))
          }, 
          (response) =>{
            dispatch(this.setAuthSuccess(response))
          }
        ),
        (error) => dispatch(this.setAuthError(error))
      )
    };
  }

  authDevice():any{
    return dispatch => {
      console.log('dispatching auth Device');
      // Set loading state.
      dispatch(this.setAuthTrying());
      Facebook.getLoginStatus().then((res)=>{
        console.log('login Status');
        console.log(res);
        if(res.status !== 'connected') {
          Facebook.login(['public_profile', 'email']).then((res)=>{
            // var expDate = new Date(new Date().getTime() + res.authResponse.expiresIn * 1000 ).toISOString();
            // var authData = {
            //   id: String(res.authResponse.userID),
            //   access_token: res.authResponse.accessToken,
            //   expiration_date: expDate
            // }
            this.parseManager.deviceLogin(
              // (response) => console.log(response),
              res.authResponse,
              (response) => this.getDeviceProfile(
                (response) => dispatch(this.setAuthError(response)), 
                  (response) => dispatch(this.setAuthSuccess(response))
              ),
              (error) => dispatch(this.setAuthError(error))
            )
          })
        } else {
          var expDate = new Date(new Date().getTime() + res.authResponse.expiresIn * 1000 ).toISOString();
          var authData = {
            id: String(res.authResponse.userID),
            access_token: res.authResponse.accessToken,
            expiration_date: expDate
          }

          this.parseManager.deviceLogin(
            // (response) => console.log(response),
            authData,
            (response) => this.getDeviceProfile(
              (response) => dispatch(this.setAuthError(response)), 
                (response) => dispatch(this.setAuthSuccess(response))
            ),
            (error) => dispatch(this.setAuthError(error))
          )
        }
      });
    };
  }

  /**
   *  Logout Success
   */
  setLogoutSuccess(){
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
  setLogoutError(error){
    return {
      data: fromJS({
        items: [],
        message: error,
        status: 'ERROR',
      }),
      type: actionTypes.USER_LOGOUT_FAIL,
    };
  }

  setLogoutTrying(){
    return {
      data: fromJS({
        items: [],
        status: 'ATTEMPTING',
      }),
      type: actionTypes.USER_LOGOUT_INIT,
    };
  };

  logoutUser(isCordova):any{
    return dispatch => {
      // const url = 'https://www.reddit.com/top/.json?limit=10';
      //
      // Set loading state.
      //
      dispatch(this.setAuthTrying());
      if(isCordova){
        this.deviceLogout(
          (error) => dispatch(this.setLogoutError(error)),
            () => dispatch(this.setLogoutSuccess())
        );
      } else {
        this.fbLogout(
          (error) => dispatch(this.setLogoutError(error)),
            () => dispatch(this.setLogoutSuccess())
        );
      }
    };
  };

  setAnonymous():any{
    return {
      data: fromJS({
        status: 'ANONYMOUS',
      }),
      type: actionTypes.USER_SET_STATUS,
    }
  }
  setAuthenticated():any{
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
  getProfile(errorCallback, successCallback): any{
    console.log('get Profile');
    var userRegistered = this.parseManager.userRegistered();
    if(userRegistered) {
      this.getParseProfile(errorCallback, successCallback);
    } else {
      this.getFacebookProfile(errorCallback, successCallback);
    }
  }

  /**
   * getFacebookProfile
   */
  getDeviceProfile(errorCallback, successCallback): any{
    console.log('get Profile');
    var userRegistered = this.parseManager.userRegistered();
    if(userRegistered) {
      this.getParseProfile(errorCallback, successCallback);
    } else {
      this.getDeviceFacebookProfile(errorCallback, successCallback);
    }
  }

  getParseProfile(errorCallback, successCallback): any{
    try {
      var userObj = this.parseManager.getCurrentUser().toJSON();
      userObj.isRegistered = true;
      console.log(userObj);
      successCallback(userObj);
    } catch(e) {
      errorCallback(e);
    }
  }

  getDeviceFacebookProfile(errorCallback, successCallback): any{ 
    var respJson : any = {
      'isRegistered' : false,
    }
    Facebook.getLoginStatus().then((response)=> {
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
        Facebook.api('/me?fields=first_name,last_name,birthday,gender,email,picture', [
        ]).then((apiResponse: any) => {
          console.log(apiResponse);
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
  getFacebookProfile(errorCallback, successCallback): any{ 
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
  initializeFacebook(){
    this.parseManager.fbInit();
  }
}
