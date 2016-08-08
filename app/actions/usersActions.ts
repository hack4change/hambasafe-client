import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
const _ = require('lodash');

/*
 *  DECLARATIONS
 */
declare var window;

const API_ROOT = 'http://hambasafetesting.azurewebsites.net/v1/Users';

const subscribeToFriends = ():any => {
  return dispatch => {
    dispatch(setSubscribeLoading());
    window.parseManager.subscribeToFriends(
      () => {
        dispatch(setSubscribeSuccess());
      },
      (err) => {
        dispatch(setSubscribeError(err));
      },
      (res) => {
        dispatch(setFetchSuccess(res));
      },
      (res) => {
        dispatch(setDeleteSuccess(res));
      }
    )
  };
};


/*
 *  FETCH USER
 */
const findUsers = (query):any => {
  return dispatch => {
    dispatch(setFetchLoading());
    window.parseManager.fetchUsersByName(
      query, 
     (res) => dispatch(setFetchSuccess(res)),
     (err) => dispatch(setFetchError(err))
    )
  };
};

/**
 *  Fetch Users that have an attending reference to an event
 */
const fetchByAttendance = (activityId: string):any => {
  return dispatch => {
    dispatch(setFetchLoading());
    window.parseManager.fetchByAttendance(
      activityId, 
     (res) => dispatch(setFetchSuccess(res)),
     (err) => dispatch(setFetchError(err))
    )
  }
}

/*
 *  FETCH USER
 */
const fetchFriends = ():any => {
  //TODO:
  return dispatch => {
    dispatch(setFetchLoading());
  };
};

/*
 *  ADD FRIENDS
 */
const addFriends = (userKeys: any):any => {
  return dispatch => {
    console.log('add friend action');
    dispatch(setFetchLoading());
    window.parseManager.addFriends(
      userKeys,
     (res) => dispatch(setAddFriendSuccess(res)),
     (err) => dispatch(setAddFriendError(err))
    )
  };
};

/*
 *  FETCH USER
 */
const fetchUser = ():any => {
  return dispatch => {
  };
};

/*
 *  CREATE USER
 */
const createUser = (data):any => {
  return dispatch => {
    dispatch(setCreateUserInit());
    window.parseManager.signUp(
      data, 
     (response) => dispatch(setCreateUserSuccess()),
     (error) => dispatch(setCreateUserError(error))
    )
  };
};


// const setUsersIdle = ():any => {
//   return dispatch => {
//     // Set loading state.
//     dispatch(setUsersIdle());
//   };
// };

const getLocation = ():any => {
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
                    dispatch(setLocation(pos.coords.longitude, pos.coords.latitude));
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
          dispatch(setLocation(pos.coords.longitude, pos.coords.latitude));
        },
        (err) => {
          console.log(err);
        },
        options
      )
    }
  };
}


const rateUser = (userId : string, activityId : string, rating:number):any => {
  return dispatch => {
    window.parseManager.rateUser(
      userId,
      activityId,
      rating,
      (res) => {
        setRatingSuccess();
      },
      (err) => {
        setRatingFailure(err);
      }
    )
  }
}

/**
 *
 */
const setSubscribeLoading = () => {
  return {
    type  : actionTypes.FRIEND_SUBSCRIBE_INIT,
    data  : fromJS({
      'status': 'SUBSCRIBING',
    })
  }
}
const setSubscribeSuccess = () => {
  return {
    type  : actionTypes.FRIEND_SUBSCRIBE_SUCCESS,
    data  : fromJS({
      'status': 'SUBSCRIBED',
    })
  }
}
const setSubscribeError = (err) => {
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
const setCreateUserInit = () => {
  return {
    data: fromJS({
      items: [],
      status: 'CREATING',
    }),
    type: actionTypes.USER_CREATE_INIT,
  };
};
const setCreateUserSuccess = () => {
  console.log('success');
  return {
    data: fromJS({
      'status': 'CREATE_SUCCESS',
      // 'id' : response,
    }),
    type: actionTypes.USER_CREATE_SUCCESS,
  };
};
const setCreateUserError = (error) => {
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
const setAddFriendLoading = () => {
  return {
    data: fromJS({
      items: [],
      status: 'ADDING',
    }),
    type: actionTypes.USER_ADD_FRIEND_INIT,
  };
};
const setAddFriendSuccess = (response) => {
  console.log(response);
  return {
    data: fromJS({
      items: _.keyBy([response], 'objectId'),//response.data.children.map((p)=>User.fromJS(p.data)),
      status: 'SUCCESS',
    }),
    type: actionTypes.USER_ADD_FRIEND_SUCCESS,
  };
};
const setAddFriendError = (error) => {
  return {
    data: fromJS({
      items: {},
      message: error,
      status: 'ERROR',
    }),
    type: actionTypes.USER_ADD_FRIEND_FAIL,
  };
};

/**
 *
 */
const setFetchLoading = () => {
  return {
    data: fromJS({
      items: [],
      status: 'LOADING',
    }),
    type: actionTypes.USER_FETCH_INIT,
  };
};
const setFetchSuccess = (response) => {
  console.log(response);
  return {
    data: fromJS({
      items: _.keyBy([response], 'objectId'),//response.data.children.map((p)=>User.fromJS(p.data)),
      status: 'SUCCESS',
    }),
    type: actionTypes.USER_FETCH_SUCCESS,
  };
};
const setFetchError = (error) => {
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
const setRatingInit = () => {
//TODO:
}
const setRatingSuccess = () => {
//TODO:
}

const setRatingFailure = (err) => {
//TODO:
}

/**
 * 
 */
const setDeleteInit = (res) => {
  return {
  }
}
const setDeleteSuccess = (res) => {
  return {
    type  : actionTypes.FRIEND_DELETE_SUCCESS,
    data  : fromJS({
      'objectId'  : res
    })
  }
}
const setDeleteFailure = (res) => {
  return {
    type  : actionTypes.FRIEND_DELETE_FAIL,
    data  : fromJS({
      'objectId'  : res
    })
  }
}

const setLocation = (longitude: number, latitude: number):any => {
  console.log('set Location');
  return {
    data: fromJS({
      longitude: longitude,
      latitude: latitude
    }),
    type: actionTypes.USER_SET_POSITION,
  };
};

export const usersActions = {
  subscribeToFriends,
  fetchByAttendance,
  addFriends,
  createUser,
  findUsers,
  fetchUser,
  getLocation,
  setLocation,
  rateUser,
};
