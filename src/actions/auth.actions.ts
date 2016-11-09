declare var FB;
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { fromJS } from 'immutable';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
const _ = require('lodash');

import {NgRedux} from 'ng2-redux';

import actionTypes from '../actionTypes';

import {ParseManager} from '../providers/parse-manager';

/*
  Generated class for the AuthActions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthActions {

  constructor(public http: Http, public parseManager: ParseManager, public platform: Platform, public ngRedux: NgRedux<any>) {
    console.log('Hello AuthActions Provider');
  }

  deviceLogout(errorCallback, successCallback) : any {
    Facebook.getLoginStatus().then((res:any) => {
      if (res.status === 'connected') {
        return Facebook.logout().then((res: any) => {
          console.log(res);
          if (res.authres) {
            this.parseManager.logOut(
              successCallback,
              errorCallback
            )
          } else {
            throw new Error(res);
          }
        }) 
      }
    }).then((res)=>{
      return successCallback(res);
    }).catch((err)=>{
      errorCallback(err);
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

  fbAuth() : any {
    return dispatch => {
      dispatch(this.setAuthTrying());
      var promise = null;
      if(this.platform.is('cordova')) {
        promise = this.authDevice();
      } else {
        promise = this.authBrowser();
      }
      promise
      .then((res) => {
        return this.getProfile();
      })
      .then((res) => {
        this.ngRedux.dispatch(this.setAuthSuccess(res));
      }).catch((err)=>{
        this.ngRedux.dispatch(this.setAuthError(err));
      })
    }
  }
  authBrowser():any {
    return this.parseManager.facebookLogin('public_profile, email')
      // (response) => 
      //   (response) => {
      //   }, 
      //   (response) =>{
      //     this.ngRedux.dispatch(this.setAuthSuccess(response))
      //   }
      // ),
      // (error) => this.ngRedux.dispatch(this.setAuthError(error))
  }

  authDevice() : any {
    // Set loading state.
    console.log('dispatching auth Device');
    return Facebook.getLoginStatus()
    .then((res) => {
      console.log('login Status');
      console.log(res);
      if(res.status !== 'connected') {
        return Facebook.login(['public_profile', 'email']).then((res)=>{
          return Promise.resolve(res.authResponse);
        })
      } else {
        var expDate = new Date(new Date().getTime() + res.authResponse.expiresIn * 1000 ).toISOString();
        var authData = {
          id: String(res.authResponse.userID),
          access_token: res.authResponse.accessToken,
          expiration_date: expDate
        }
        return Promise.resolve(authData);
      }
    })
    .then((res) => {
      return this.parseManager.facebookLogin(res);
    })
  }

  // deviceLogin(authData) : any { 
      // (response) => this.getProfile(
      //   (response) => this.ngRedux.dispatch(this.setAuthError(response)), 
      //     (response) => this.ngRedux.dispatch(this.setAuthSuccess(response))
      // ),
      // (error) => this.ngRedux.dispatch(this.setAuthError(error))
  // }

  /**
   *  Logout Success
   */
  setLogoutSuccess() {
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

  logoutUser():any{
    return dispatch => {
      // const url = 'https://www.reddit.com/top/.json?limit=10';
      //
      // Set loading state.
      //
      dispatch(this.setAuthTrying());
      if(this.platform.is('cordova')){
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
  getProfile() : any {
    var userRegistered = this.parseManager.userRegistered();
    console.log('userRegistered');
    console.log(userRegistered);
    if(userRegistered) {
      return this.getParseProfile();
    } else if(this.platform.is('cordova')) {
      return this.getDeviceFacebookProfile();
    } else {
      return this.getFacebookProfile();
    }
  }

  /**
   * getFacebookProfile
   */
  // getDeviceProfile(errorCallback, successCallback): any{
  //   console.log('get Profile');
  //   var userRegistered = this.parseManager.userRegistered();
  //   if(userRegistered) {
  //     this.getParseProfile(errorCallback, successCallback);
  //   } else {
  //     this.getDeviceFacebookProfile(errorCallback, successCallback);
  //   }
  // }

  getParseProfile() : any {
      var userObj = this.parseManager.getCurrentUser().toJSON();
      console.log(userObj);
      userObj.isRegistered = true;
      return Promise.resolve(userObj);
  }

  getDeviceFacebookProfile() : any { 
    var respJson : any = {
      'isRegistered' : false,
    }
    return Facebook.getLoginStatus().then((response)=> {
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
      }
      return Promise.resolve();
    }).then((res)=> {
      return Facebook.api('/me?fields=first_name,last_name,birthday,gender,email,picture', [])
    })
    .then((apiResponse: any) => {
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
      return Promise.resolve(respJson);
    });

  }
  getFacebookProfile(): any{ 
    var respJson : any = {
      'isRegistered' : false,
    }
    return FB.getLoginStatus((response) => {
      console.log('Status');
      console.log(JSON.stringify(response));
      if (response.status !== 'connected') {
        //XXX: NEEDS TO BE FIXED ASAP
        // return this.setAnonymous();
        throw new Error(this.setAnonymous());
      } else {
        _.merge(respJson, _.pick(response.authResponse, ['accessToken' , 'userID']));
        respJson.fbId = respJson.userID;
        respJson.userID = undefined;
        //TODO: Remove
        console.log(response);
      }
      return Promise.resolve();
    })
    .then((res) =>{
        return FB.api('/me', 'get', {
          'fields' : [
            'first_name',
            'last_name',
            'birthday',
            'gender',
            'email',
            'picture',
          ]
        })
    })
    .then((apiResponse: any) => {
      _.merge(respJson,  _.pick(apiResponse, [
        'first_name',
        'last_name',
        'birthday',
        'gender',
        'email',
      ]));
      respJson.picture = apiResponse.picture.data.url;
      respJson.isSilhouette = apiResponse.picture.data.is_silhouette;
      return Promise.resolve(respJson);
    });

  }
  initializeFacebook(){
    this.parseManager.fbInit();
  }
}
