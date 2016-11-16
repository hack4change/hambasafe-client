declare var window;
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { BackgroundGeolocation, Geoposition, Geolocation, Diagnostic } from 'ionic-native';

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

	public watch : any = null;
  constructor(public http: Http, public parseManager : ParseManager, public platform: Platform, public ngRedux: NgRedux<any>) {
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
	subscribeToLocation() : any { 
		let config = {
			desiredAccuracy: 0,
			stationaryRadius: 20,
			distanceFilter: 10,
			debug: true, //  enable this hear sounds for background-geolocation life-cycle.
			// stopOnTerminate: false, // enable this to clear background location settings when the app terminates
			interval: 1000,
		};

		BackgroundGeolocation.configure((pos) => {
			console.log('[js] BackgroundGeolocation callback:  ' + pos.latitude + ',' + pos.longitude);
			this.ngRedux.dispatch(this.setLocation(pos.longitude, pos.latitude));

			// IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
			// and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
			// IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
			if(this.platform.is('ios') ||this.platform.is('ios')){
				BackgroundGeolocation.finish(); // FOR IOS ONLY
			}

		}, (error) => {
			console.log('BackgroundGeolocation error');
		}, config);

		console.log(BackgroundGeolocation.start());
		// BackgroundGeolocation.watchLocationMode()
		// .then(
		// 	(enabled) => {
		// 		if (enabled) {
		// 			// location service are now enabled
		// 			// call backgroundGeolocation.start
		// 			// only if user already has expressed intent to start service
		// 			console.log(BackgroundGeolocation.start()); // FOR IOS ONLY
		// 		} else {
		// 			// location service are now disabled or we don't have permission
		// 			// time to change UI to reflect that
		// 			BackgroundGeolocation.stop(); // FOR IOS ONLY
		// 			Diagnostic.switchToLocationSettings();
		// 		}
		// 	},
		// 	(error) => {
		// 		console.log('Error watching location mode. Error:' + error);
		// 	});
		// 		 // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
		// 		 BackgroundGeolocation.isLocationEnabled().then((enabled) => {
		// 			 if (enabled) {
		// 				 console.log(BackgroundGeolocation.start());
		// 				 // .then((pos)=>{
		// 				 //   console.log('Start callback' + pos);
		// 				 // },
		// 				 // (err)=>{
		// 				 //   console.log('Start error' + err);
		// 				 // }); 
		// 			 } else {
		// 				 Diagnostic.switchToLocationSettings();
		// 			 }
		// 		 })
				 let options = {
					 frequency: 6000, 
					 enableHighAccuracy: true
				 };

				 this.watch = Geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
					 console.log('Foreground');
					 console.log(position);
					 BackgroundGeolocation.getLogEntries(100).then((logEntries) => {
						 // var COLORS = Object();
						 // COLORS['ERROR'] = 'background:white;color:red';
						 // COLORS['WARN'] = 'background:black;color:yellow';
						 // COLORS['INFO'] = 'background:white;color:blue';
						 // COLORS['TRACE'] = 'background:white;color:black';
						 // COLORS['DEBUG'] = 'background:white;color:black';

						 // var logFormatter = function(logEntry) {
							 // var d = new Date(logEntry.timestamp);
							 // var dateStr = [d.getFullYear(), this.padLeft(d.getMonth()+1,2), this.padLeft(d.getDate(),2)].join('/');
							 // var timeStr = [this.padLeft(d.getHours(),2), this.padLeft(d.getMinutes(),2), this.padLeft(d.getSeconds(),2)].join(':');
							 // return ['%c[', dateStr, ' ', timeStr, '] %c', logEntry.logger, ':', logEntry.message].join('');
						 // }

						 // return ((logEntries, logFormatter, COLORS, MAX_LINES) => {
							 // MAX_LINES = MAX_LINES || 100; // maximum lines to print per batch
							 // var batch = Math.ceil(logEntries.length / MAX_LINES);
							 // var logLines = Array(MAX_LINES); //preallocate memory prevents GC
							 // var logLinesColor = Array(MAX_LINES * 2);
							 // for (var i = 0; i < batch; i++) {
								 // var it = 0;
								 // var logEntriesPart = logEntries.slice((i * MAX_LINES), (i + 1) * MAX_LINES);
								 // for (var j = 0; j < logEntriesPart.length; j++) {
									 // var logEntry = logEntriesPart[j];
									 // logLines[j] = logFormatter(logEntry);
									 // logLinesColor[it++] = ('background:white;color:black');
									 // logLinesColor[it++] = (COLORS[logEntry.level]);      
								 // }
								 // if (logEntriesPart.length < MAX_LINES) {
									 // console.log.apply(console, [logLines.slice(0,logEntriesPart.length).join('\n')]
																		 // .concat(logLinesColor.slice(0,logEntriesPart.length*2)));
								 // } else {
									 // console.log.apply(console, [logLines.join('\n')].concat(logLinesColor));
								 // }
							 // }
						 // })(logEntries, logFormatter, COLORS);
							console.log(JSON.stringify(logEntries));
							console.log(logEntries);
					 });
					 this.ngRedux.dispatch(this.setLocation(position.coords.longitude, position.coords.latitude));
				 });
	}
	// padLeft(nr, n, str) {
	// 	return Array(n - String(nr).length + 1).join(str || '0') + nr;
	// }

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
                    Diagnostic.switchToLocationSettings();
                  })
                } else {
                  console.log('location not authorized');
                  Diagnostic.switchToLocationSettings();
                }
              })
            } else {
              console.log('location not enabled')
              Diagnostic.switchToLocationSettings();
            }
          }, (error) =>{
            console.log(error);
            Diagnostic.switchToLocationSettings();
          });
        }, (error) =>{
          console.log(error);
          Diagnostic.switchToLocationSettings();
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