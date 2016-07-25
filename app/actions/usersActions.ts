import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
const _ = require('lodash');

/*
 *  DECLARATIONS
 */
declare var window;

const API_ROOT = 'http://hambasafetesting.azurewebsites.net/v1/Users';

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

/*
 *  FETCH USER
 */
const fetchFriends = ():any => {
  return dispatch => {
  };
};

/*
 *  FETCH USER
 */
const fetchUser = ():any => {
  return dispatch => {
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
const setFetchLoading = () => {
  return {
    data: fromJS({
      items: [],
      status: 'LOADING',
    }),
    type: actionTypes.USER_FETCH_INIT,
  };
};


/*
 *  CREATE USER
 *
 */
const createUser = (data):any => {
  return dispatch => {
    dispatch(setUsersCreating());
    window.parseManager.signUp(
      data, 
     (response) => dispatch(createUserSuccess()),
     (error) => dispatch(createUserError(error))
    )
  };
};
const createUserSuccess = () => {
  console.log('success');
  return {
    data: fromJS({
      'status': 'CREATE_SUCCESS',
      // 'id' : response,
    }),
    type: actionTypes.USER_CREATE_SUCCESS,
  };
};
const createUserError = (error) => {
  console.log('error');
  return {
    data: fromJS({
      message: error,
      status: 'CREATE_ERROR',
    }),
    type: actionTypes.USER_CREATE_FAIL,
  };
}
const setUsersCreating = () => {
  return {
    data: fromJS({
      items: [],
      status: 'CREATING',
    }),
    type: actionTypes.USER_CREATE_INIT,
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
  findUsers,
  fetchUser,
  createUser,
  // setUsersIdle,
  getLocation,
  setLocation,
};
