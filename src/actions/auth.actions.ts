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

  constructor(
    public http: Http,
    public parseManager: ParseManager,
    public platform: Platform,
    public ngRedux: NgRedux<any>
  ) {
    console.log('Hello AuthActions Provider');
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

  setAuthTrying() {
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
      if(this.platform.is('cordova') && !this.platform.is('browser') ){
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
      })
      .catch((err)=>{
        console.log(err);
        this.ngRedux.dispatch(this.setAuthError(err));
      })
    }
  }
  authBrowser() : Promise<any> {
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

  authDevice() : Promise<any> {
    // Set loading state.
    console.log('dispatching auth Device');
    return Facebook.getLoginStatus()
    .then((res) => {
      console.log('login Status');
      console.log(res);
      if(res.status !== 'connected') {
        return Facebook.login(['public_profile', 'email']).then((res)=>{
          console.log('post Login');
          console.log(res);
          var expDate = new Date(new Date().getTime() + res.authResponse.expiresIn * 1000 ).toISOString();
          var authData = {
            id: String(res.authResponse.userID),
            access_token: res.authResponse.accessToken,
            expiration_date: expDate
          }
          return Promise.resolve(authData);
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
      console.log('call parse Login');
      console.log(res);
      return this.parseManager.deviceLogin(res);
    })
  }

  logoutUser() : any{
    return dispatch => {
      //
      // Set loading state.
      //
      dispatch(this.setAuthTrying());
      var promise = Promise.resolve();
      if(this.platform.is('cordova') && !this.platform.is('browser')) {
        promise = this.deviceLogout();
      } else {
        promise = this.fbLogout();
      }
      promise
      .then((res) => {
        return this.ngRedux.dispatch(this.setLogoutSuccess());
      })
      .catch((err)=>{
        return this.ngRedux.dispatch(this.setLogoutError(err));
      })
    };
  };

  deviceLogout() : Promise<any> {
    return Facebook.getLoginStatus()
    .then((res:any) => {
      if (res.status === 'connected') {
        return Facebook.logout();
      } else {
        return Promise.resolve();
      }
    })
    .then((res) => {
      return this.parseManager.logOut();
    })
  }

  fbLogout():Promise<any> {
    return new Promise((resolve, reject) => {
      return FB.getLoginStatus((res) => {
        if (res.status === 'connected') {
          return FB.logout((res: any) => {
            console.log(res);
            if (res.authResponse) {
              this.parseManager.logOut()
              .then((res) => {
                console.log('logged out current user');
                resolve();
              })
            } else {
              throw new Error(res);
            }
          }) 
        } else {
          return Promise.resolve(res);
        }
      })
    
    })
  }

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
    } else if(this.platform.is('cordova') && !this.platform.is('browser') ){
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
