import actionTypes from '../actionTypes';
import {fromJS, Map} from 'immutable';
// const _ = require('lodash');

const INIT_STATE =  Map<string, any>(fromJS({
  status: "ANONYMOUS",
  // id : '',
  // fbId : '',
  // accessToken: '',
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  location: {
    longtiude: null,
    latitude : null,
  },
  mobileNumber: '',
  email : '',
  profilePicture: '',
  message: '',
}))

export default function currentUser(state:any = INIT_STATE, action: any= {}) {
  console.log(action);
  switch (action && action.type) {
    case actionTypes.USER_CREATE_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_CREATE_SUCCESS:
      return  state
    .set('status', action.data.get('status'))
    .set('message', action.data.get('message'));
    case actionTypes.USER_CREATE_FAIL:
      return state
    .set('status', action.data.get('status'))
    .set('message', action.data.get('message'))
    case actionTypes.USER_AUTH_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_AUTH_SUCCESS:
      return state.merge(action.data);
    case actionTypes.USER_AUTH_FAIL:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_LOGOUT_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_LOGOUT_SUCCESS:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_LOGOUT_FAIL:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_SET_POSITION:
      return state.set('location', action.data);
    case actionTypes.USER_SET_STATUS:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_UPDATE_SUCCESS:
      return state.merge(action.data);
    default:
      return state;
  }
};

// interface actionsState<T>{
//   data:Immutable<T>
// }
/*
 *
 *
 *   
 *    interface actionsState<T>{
 *    data:immutable<T>
 *    }
 *interface user{
 name:string;
 }
 *
 *
 *
 *
 */
