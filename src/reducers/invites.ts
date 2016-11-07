import {fromJS, Map} from 'immutable';
// const _ = require('lodash');

import actionTypes from '../actionTypes';


const INIT_STATE = Map<string, any>(fromJS({
  status: "UNSUBSCRIBED",
  items: {} 
}))

export default function invites(state:any = INIT_STATE, action:any = {}) {
  console.log('action');
  console.log(action);
  switch (action && action.type) {
    case actionTypes.INVITE_SUBSCRIBE_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.INVITE_SUBSCRIBE_SUCCESS:
      return state.set('status', action.data.get('status'));
    case actionTypes.INVITE_SUBSCRIBE_FAIL:
      return state.set('status', action.data.get('status'));
    case actionTypes.INVITE_FETCH_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.INVITE_FETCH_SUCCESS:
      return state.set('items', state.get('items').merge(action.data.get('items')));
    case actionTypes.INVITE_FETCH_FAIL:
      // return state.set('items', state.get('items').delete(action.data.get('objectId')));
    case actionTypes.INVITE_DELETE_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.INVITE_DELETE_SUCCESS:
      return state.set('items', state.get('items').delete(action.data.get('objectId')));
    case actionTypes.INVITE_DELETE_FAIL:
      // return state.set('items', state.get('items').delete(action.data.get('objectId')));
    case actionTypes.INVITE_ACCEPT_INIT:
    case actionTypes.INVITE_ACCEPT_SUCCESS:
    case actionTypes.INVITE_ACCEPT_FAIL:
    case actionTypes.INVITE_DECLINE_INIT:
    case actionTypes.INVITE_DECLINE_SUCCESS:
    case actionTypes.INVITE_DECLINE_FAIL:
    default:
      return state;
  }
}

