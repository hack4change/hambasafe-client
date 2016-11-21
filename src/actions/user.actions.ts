declare var window;
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { BackgroundMode, BackgroundGeolocation, Geoposition, Geolocation, Diagnostic } from 'ionic-native';

import { NgRedux } from 'ng2-redux';
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

  public friendsSub$;
  public userSub$;
	public watch : any = null;
  public coords : any = {
  };
  constructor(public http: Http, public parseManager : ParseManager, public platform: Platform, public ngRedux: NgRedux<any>) {
    console.log('Hello UserActions Provider');
  }
  /*
   * Subscriptions
   */
  //TODO: Refactor
  subscribeToFriends() : any {
    return dispatch => {
      dispatch(this.setSubscribeLoading());
      this.friendsSub$ = this.parseManager.subscribeToFriends();
      this.friendsSub$.on('create', (friend) => {
        this.parseManager.fetchFriend(friend).then((res) => {
          this.ngRedux.dispatch(this.setFetchSuccess([res]));
          return Promise.resolve(res);
        })
      })
      this.friendsSub$.on('enter', (friend) => {
        this.parseManager.fetchFriend(friend).then((res) => {
          this.ngRedux.dispatch(this.setFetchSuccess([res]));
          return Promise.resolve(res);
        })
      })
      this.friendsSub$.on('update', (friend) => {
        this.parseManager.fetchFriend(friend).then((res) => {
          this.ngRedux.dispatch(this.setFetchSuccess([res]));
          return Promise.resolve(res);
        })
      })
      this.friendsSub$.on('delete', (friend) => {
        console.log('delete from friends');
        console.log(friend);
        if(friend.get('userPtr')['id'] !== this.parseManager.Parse.User.current()['id']){
          this.ngRedux.dispatch(this.setDeleteSuccess(friend.get('userPtr').toJSON()['objectId']));
        } else {
          this.ngRedux.dispatch(this.setDeleteSuccess(friend.get('friendPtr').toJSON()['objectId']));
        }
      })
      this.friendsSub$.on('error', (err) => {
        this.ngRedux.dispatch(this.setSubscribeError(err));
      })

      this.parseManager.fetchFriends()
      .then((res) => {
        console.log('FETCH FRIENDS');
        console.log(res);
        this.ngRedux.dispatch(this.setFetchSuccess(res));
        return Promise.resolve(res);
      })
      .catch((err)=>{
        console.log('ERROR: FETCH FRIENDS');
        this.ngRedux.dispatch(this.setSubscribeError(err));
      })
      // () => {
      //   dispatch(this.setSubscribeSuccess());
      // },
      // (err) => {
      // },
      // (res) => {
      //   dispatch(this.setFetchSuccess([res]));
      // },
      // (res) => {
      //   dispatch(this.setDeleteSuccess(res));
      // }
      // )
    };
  };

	subscribeToLocation() : any { 
    let currentLocation$ = this.ngRedux.select(['currentUser', 'location'])
    currentLocation$.subscribe((location : any)=> {
      this.coords = location;
      this.coords.longitude = !!location.longitude ? location.longitude.toFixed(9) : null;
      this.coords.latitude = !!location.latitude ? location.latitude.toFixed(9) : null;
    })
		let config = {
			desiredAccuracy: 0,
			stationaryRadius: 20,
			distanceFilter: 10,
			debug: true, //  enable this hear sounds for background-geolocation life-cycle.
			// stopOnTerminate: false, // enable this to clear background location settings when the app terminates
			interval: 30000,
		};

		BackgroundMode.enable();
    BackgroundGeolocation.configure((pos) => {
			console.log('[js] BackgroundGeolocation callback:  ' + pos.latitude + ',' + pos.longitude);
			this.ngRedux.dispatch(this.setLocation(pos.longitude, pos.latitude));

			// IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
			// and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
			// IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
			if(this.platform.is('ios') || this.platform.is('wp')) {
				BackgroundGeolocation.finish(); // FOR IOS ONLY
			}

		}, (error) => {
			console.log('BackgroundGeolocation error');
		}, config);

		// console.log(BackgroundGeolocation.start());
		BackgroundGeolocation.watchLocationMode()
    .then((enabled) => {
      if (enabled) {
        // location service are now enabled
        // call backgroundGeolocation.start
        // only if user already has expressed intent to start service
        console.log(BackgroundGeolocation.start()); // FOR IOS ONLY
      } else {
        // location service are now disabled or we don't have permission
        // time to change UI to reflect that
        BackgroundGeolocation.stop(); // FOR IOS ONLY
        Diagnostic.switchToLocationSettings();
      }
    },
    (error) => {
      console.log('Error watching location mode. Error:' + error);
    });
    // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
    BackgroundGeolocation.isLocationEnabled().then((enabled) => {
      if (enabled) {
        console.log(BackgroundGeolocation.start());
        // .then((pos)=>{
        //   console.log('Start callback' + pos);
        // },
        // (err)=>{
        //   console.log('Start error' + err);
        // }); 
      } else {
        Diagnostic.switchToLocationSettings();
      }
    })
    // let options = {
    //   frequency: 60000, 
    //   enableHighAccuracy: true
    // };

    Geolocation.getCurrentPosition().then((position) => {
      if(position.coords.longitude !== this.coords.longitude || position.coords.latitude !== this.coords.latitude){
        this.ngRedux.dispatch(this.setLocation(position.coords.longitude, position.coords.latitude));
      }
    })
    // this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
    //   console.log('Foreground');
    //   console.log(position);
    //   // BackgroundGeolocation.getLogEntries(100).then((logEntries) => {
    //   //   console.log(JSON.stringify(logEntries));
    //   //   console.log(logEntries);
    //   // });
    //   if(position.coords.longitude !== this.coords.longitude || position.coords.latitude !== this.coords.latitude){
    //     this.ngRedux.dispatch(this.setLocation(position.coords.longitude, position.coords.latitude));
    //   }
    // });
	}

  confirmFriend(friendId: string) : any {
    return dispatch => {
      this.parseManager.confirmFriend(friendId)
      .then((res) => {
        
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
  removeFriend(friendId: string) : any {
    return dispatch => {
      this.parseManager.deleteFriend(friendId)
      .then((res) => {
        this.ngRedux.dispatch(this.setDeleteSuccess(res));
      })
      .catch((err) => {
        this.ngRedux.dispatch(this.setDeleteFailure(err));
      })
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
      this.parseManager.fetchUsersByName(query)
      .then((res) => {
        return this.ngRedux.dispatch(this.setFetchSuccess(res));
      })
      .catch((err) => {
        console.log('ERROR: fetchUsersByName '+ query);
        this.ngRedux.dispatch(this.setFetchError(err))
      });
    };
  };

  /**
   *  Fetch Users that have an attending reference to an event
   */
  fetchByAttendance(activityId: string) : any {
    return dispatch => {
      dispatch(this.setFetchLoading());
      this.parseManager.fetchByAttendance(activityId)
      .then((res) =>{
        this.ngRedux.dispatch(this.setFetchSuccess(res))
      })
      .catch((err) => {
        console.log('ERROR FINDING USERS');
        this.ngRedux.dispatch(this.setFetchError(err)) 
      });
    }
  }

  /*
   *  FETCH USER
   */
  fetchFriends() : any {
    //TODO:
    return dispatch => {
      this.ngRedux.dispatch(this.setFetchLoading());
    };
  };

  /*
   *  ADD FRIENDS
   */
  addFriends(userKeys: any) : any {
    return dispatch => {
      console.log('add friend action');
      dispatch(this.setFetchLoading());
      this.parseManager.addFriends(userKeys)
      .then((res)=>{
        console.log('FRIENDS!!! :-)');
        this.ngRedux.dispatch(this.setAddFriendSuccess(res))
      })
      .catch((err) => {
        this.ngRedux.dispatch(this.setAddFriendError(err))
      })
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
      this.parseManager.signUp(data)
      .then((res : any) =>{
        this.ngRedux.dispatch(this.setCreateUserSuccess())
      })
      .catch((error) => {
        this.ngRedux.dispatch(this.setCreateUserError(error))
      });
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
      if (this.platform.is('cordova')) {
        Diagnostic.isLocationAvailable().then((available) => {
          console.log('available');
          console.log(available);
          Diagnostic.isLocationEnabled().then((enabled) => {
            if(enabled){
              Diagnostic.isLocationAuthorized().then((authorised) => {
                if(authorised) {
                  // dispatch(setLocationSuccess());
                  var options = {
                    timeout: 10000,
                    enableHighAccuracy: false
                  };
                  Geolocation.getCurrentPosition(options)
                  .then((pos) => {
                    console.log(pos.coords);
                    dispatch(this.setLocation(pos.coords.longitude, pos.coords.latitude));
                  })
                  .catch((err) => {
                    console.log('error getting current position');
                    console.log(err);
                    // Diagnostic.switchToLocationSettings();
                  })
                } else {
                  console.log('location not authorized');
                  // Diagnostic.switchToLocationSettings();
                }
              })
            } else {
              console.log('location not enabled')
              // Diagnostic.switchToLocationSettings();
            }
          }, (error) =>{
            console.log(error);
            // Diagnostic.switchToLocationSettings();
          });
        }, (error) =>{
          console.log(error);
          // Diagnostic.switchToLocationSettings();
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

  subscribeToUser(): any {
    return (dispatch)=> {
      this.userSub$ = this.parseManager.subscribeToCurrentUser();
      this.userSub$.on('update', (user) => {
        console.log('CURRENT USER UPDATE');
        console.log(user);
        // var friendId: string = "";
        // var isConfirmed : boolean = true;
        // var getUser = new this.parseManager.Parse.Query(this.parseManager.Parse.User)
        // if(friend.get('userPtr')['id'] !== this.parseManager.Parse.User.current()['id']){
        //   friendId = friend.get('userPtr')['id'];
        //   isConfirmed = friend.get('confirmed');
        // } else {
        //   friendId = friend.get('friendPtr')['id'];
        // }
        // getUser.get(friendId)
        // .then((res) => {
        //   var friendRes = res.toJSON();
        //   friendRes.isFriend= true;
        //   friendRes.isConfirmed = isConfirmed;
        //   this.ngRedux.dispatch(this.setFetchSuccess([friendRes]));
        // })
      })
    }
  }

  rateUser (userId : string, activityId : string, rating:number) : any {
    return dispatch => {
      this.parseManager.rateUser(userId, activityId, rating)
      .then((res) => {
        this.setRatingSuccess();
      })
      .catch((err) => {
        this.setRatingFailure(err);
      })
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
        items: _.keyBy(response, 'objectId'),//response.data.children.map((p)=>User.fromJS(p.data)),
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
