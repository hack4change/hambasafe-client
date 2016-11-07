declare var window;
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import {Diagnostic, Platform } from 'ionic-native';

import { fromJS } from 'immutable';
const _ = require('lodash');

import actionTypes from '../actionTypes';

import {ParseManager} from '../providers/parse-manager';

/*
  Generated class for the UserActions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserActions {

  constructor(public http: Http, public parseManager : ParseManager) {
    console.log('Hello UserActions Provider');
  }
  /*
   * Subscriptions
   */
  subscribeToFriends() : any {
    return dispatch => {
      dispatch(this.setSubscribeLoading());
      this.parseManager.subscribeToFriends(
        () => {
          dispatch(this.setSubscribeSuccess());
        },
        (err) => {
          dispatch(this.setSubscribeError(err));
        },
        (res) => {
          dispatch(this.setFetchSuccess(res));
        },
        (res) => {
          dispatch(this.setDeleteSuccess(res));
        }
      )
    };
  };

  confirmFriend(friendId: string) : any {
    return dispatch => {
      this.parseManager.confirmFriend(
        friendId,
        (res) => {
        },
        (res) => {
        }
      )
    }
  }
  removeFriend(friendId: string) : any {
    return dispatch => {
      this.parseManager.deleteFriend(
        friendId,
        (res) => {
          dispatch(this.setDeleteFailure(res));
        },
        (res) => {
          dispatch(this.setDeleteSuccess(res));
        }
      )
    }
  }
  // const blockFriend = (): any => {
  //   return dispatch => {

  //   }
  // }

  /*
   *  FETCH USER
   */
  findUsers(query) : any {
    return dispatch => {
      dispatch(this.setFetchLoading());
      this.parseManager.fetchUsersByName(
        query, 
        (res) => dispatch(this.setFetchSuccess(res)),
          (err) => dispatch(this.setFetchError(err))
      )
    };
  };

  /**
   *  Fetch Users that have an attending reference to an event
   */
  fetchByAttendance(activityId: string) : any {
    return dispatch => {
      dispatch(this.setFetchLoading());
      this.parseManager.fetchByAttendance(
        activityId, 
        (res) => dispatch(this.setFetchSuccess(res)),
          (err) => dispatch(this.setFetchError(err))
      )
    }
  }

  /*
   *  FETCH USER
   */
  fetchFriends() : any {
    //TODO:
    return dispatch => {
      dispatch(this.setFetchLoading());
    };
  };

  /*
   *  ADD FRIENDS
   */
  addFriends(userKeys: any) : any {
    return dispatch => {
      console.log('add friend action');
      dispatch(this.setFetchLoading());
      this.parseManager.addFriends(
        userKeys,
        (res) => dispatch(this.setAddFriendSuccess(res)),
          (err) => dispatch(this.setAddFriendError(err))
      )
    };
  };

  /*
   *  FETCH USER
   */
  fetchUser() : any {
    return dispatch => {
    };
  };

  /*
   *  CREATE USER
   */
  createUser(data) : any {
    return dispatch => {
      dispatch(this.setCreateUserInit());
      this.parseManager.signUp(
        data, 
        (response : any) =>{
          dispatch(this.setCreateUserSuccess())
        },
        (error) => {
          dispatch(this.setCreateUserError(error))
        }
      )
    };
  };


  // const setUsersIdle = ():any => {
  //   return dispatch => {
  //     // Set loading state.
  //     dispatch(setUsersIdle());
  //   };
  // };

  getLocation() : any {
    return dispatch => {
      // Set loading state.
      console.log(window.cordova)
      if (window.cordova) {
        window.cordova.plugins.diagnostic.isLocationAvailable((available) => {
          console.log('available');
          console.log(available);
          window.cordova.plugins.diagnostic.isLocationEnabled((enabled) => {
            if(enabled){
              window.cordova.plugins.diagnostic.isLocationAuthorized((authorised) => {
                if(authorised) {
                  // dispatch(setLocationSuccess());
                  var options = {
                    timeout: 10000,
                    enableHighAccuracy: true
                  };
                  navigator.geolocation.getCurrentPosition(
                    (pos) => {
                      console.log(pos.coords);
                      dispatch(this.setLocation(pos.coords.longitude, pos.coords.latitude));
                    },
                    (err) => {
                      console.log(err);
                      window.cordova.plugins.diagnostic.switchToLocationSettings();
                    },
                    options
                  )
                } else {
                  window.cordova.plugins.diagnostic.switchToLocationSettings();
                }
              })
            } else {
              window.cordova.plugins.diagnostic.switchToLocationSettings();
            }
          }, (error) =>{
            console.log(error);
            window.cordova.plugins.diagnostic.switchToLocationSettings();
          });
        }, (error) =>{
          console.log(error);
          window.cordova.plugins.diagnostic.switchToLocationSettings();
        });
      } else {
        var options = {
          timeout: 10000,
          enableHighAccuracy: true
        };
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            // this.coordinates = pos.coords;
            console.log('dispatch location set');
            dispatch(this.setLocation(pos.coords.longitude, pos.coords.latitude));
          },
          (err) => {
            console.log(err);
          },
          options
        )
      }
    };
  }


  rateUser (userId : string, activityId : string, rating:number) : any {
    return dispatch => {
      this.parseManager.rateUser(
        userId,
        activityId,
        rating,
        (res) => {
          this.setRatingSuccess();
        },
        (err) => {
          this.setRatingFailure(err);
        }
      )
    }
  }

  /**
   *
   */
  setSubscribeLoading() {
    return {
      type  : actionTypes.FRIEND_SUBSCRIBE_INIT,
      data  : fromJS({
        'status': 'SUBSCRIBING',
      })
    }
  }
  setSubscribeSuccess() {
    return {
      type  : actionTypes.FRIEND_SUBSCRIBE_SUCCESS,
      data  : fromJS({
        'status': 'SUBSCRIBED',
      })
    }
  }
  setSubscribeError(err) {
    console.log('INVITE SUBSCRIPTION ERROR');
    return {
      type  : actionTypes.FRIEND_SUBSCRIBE_FAIL,
      data  : fromJS({
        'status'    : 'UNSUBSCRIBED',
      })
    }
  }

  /**
   *
   */
  setCreateUserInit() {
    return {
      data: fromJS({
        items: [],
        status: 'CREATING',
      }),
      type: actionTypes.USER_CREATE_INIT,
    };
  }

  setCreateUserSuccess() {
    console.log('success');
    return {
      data: fromJS({
        'status': 'CREATE_SUCCESS',
        // 'id' : response,
      }),
      type: actionTypes.USER_CREATE_SUCCESS,
    };
  }

  setCreateUserError(error) {
    console.log('error');
    return {
      data: fromJS({
        message: error,
        status: 'CREATE_ERROR',
      }),
      type: actionTypes.USER_CREATE_FAIL,
    };
  }

  /**
   *
   */
  setAddFriendLoading(){
    return {
      data: fromJS({
        items: [],
        status: 'ADDING',
      }),
      type: actionTypes.USER_ADD_FRIEND_INIT,
    };
  }

  setAddFriendSuccess(response){
    console.log(response);
    return {
      data: fromJS({
        items: _.keyBy([response], 'objectId'),//response.data.children.map((p)=>User.fromJS(p.data)),
        status: 'SUCCESS',
      }),
      type: actionTypes.USER_ADD_FRIEND_SUCCESS,
    };
  }

  setAddFriendError(error) {
    return {
      data: fromJS({
        items: {},
        message: error,
        status: 'ERROR',
      }),
      type: actionTypes.USER_ADD_FRIEND_FAIL,
    };
  }

  /**
   *
   */
  setFetchLoading(){
    return {
      data: fromJS({
        items: [],
        status: 'LOADING',
      }),
      type: actionTypes.USER_FETCH_INIT,
    };
  };
  setFetchSuccess(response){
    console.log(response);
    return {
      data: fromJS({
        items: _.keyBy([response], 'objectId'),//response.data.children.map((p)=>User.fromJS(p.data)),
        status: 'SUCCESS',
      }),
      type: actionTypes.USER_FETCH_SUCCESS,
    };
  };
  setFetchError(error) {
    return {
      data: fromJS({
        items: {},
        message: error,
        status: 'ERROR',
      }),
      type: actionTypes.USER_FETCH_FAIL,
    };
  };

  /**
   * 
   */
  setRatingInit() {
    //TODO:
  }
  setRatingSuccess() {
    //TODO:
  }

  setRatingFailure(err) {
    //TODO:
  }

  /**
   * 
   */
  setDeleteInit(res) {
    return {
    }
  }

  setDeleteSuccess(res) {
    return {
      type  : actionTypes.FRIEND_DELETE_SUCCESS,
      data  : fromJS({
        'objectId'  : res
      })
    }
  }
  setDeleteFailure(res) {
    return {
      type  : actionTypes.FRIEND_DELETE_FAIL,
      data  : fromJS({
        'objectId'  : res
      })
    }
  }

  setLocation(longitude: number, latitude: number) : any {
    console.log('set Location');
    return {
      data: fromJS({
        longitude: longitude,
        latitude: latitude
      }),
      type: actionTypes.USER_SET_POSITION,
    };
  };
}
