import actionTypes from '../actionTypes';

import {fromJS, Map} from 'immutable';
// const _ = require('lodash');


const INIT_STATE =  Map<string, any>(fromJS({
  status: "idle",
  visibleType: '',
  items: {},
}))

export default function eventData(state:any = INIT_STATE, action:any = {}) {
  console.log('action');
  console.log(action);
  switch (action && action.type) {
    case actionTypes.EVENTS_VISIBLE_SET:
      return state.set('visibleType', action.data.get('visibile'))
    case actionTypes.EVENTS_STATUS_SET:
      return state
    .set('status', action.data.get('status'))
    .set('message', action.data.get('message'));

//CREATE EVENTS
    case actionTypes.EVENT_CREATE_INIT:
      console.log(action.data.get('status'));
    return state.set('status', action.data.get('status'));

    case actionTypes.EVENT_CREATE_SUCCESS:
      return state
    .set('status', action.data.get('status'))
    .set('message', action.data.get('message'))
    .set('items', state.get('items').mergeDeep(action.data.get('items')));
    case actionTypes.EVENT_CREATE_FAIL:
      return state.set('status', action.data.get('status'));

    case actionTypes.EVENT_JOIN_INIT:
      return state;
      
    case actionTypes.EVENT_JOIN_SUCCESS:
      console.log(action.data.get('activityId'));
      return state.updateIn(['items', action.data.get('activityId'), 'isAttending'], true, val => true);
    case actionTypes.EVENT_JOIN_FAIL:

//DELETE EVENTS
    case actionTypes.EVENTS_DELETE_INIT:
    case actionTypes.EVENTS_DELETE_SUCCESS:
    case actionTypes.EVENTS_DELETE_FAIL:
//FETCH EVENTS
    case actionTypes.EVENTS_FETCH_INIT:
    case actionTypes.EVENTS_FETCH_SUCCESS:
    return state.set('items', state.get('items').mergeDeep(action.data.get('items')));
    case actionTypes.EVENTS_FETCH_FAIL:
//RATING EVENTS
    case actionTypes.RATING_FETCH_INIT:
    case actionTypes.RATING_FETCH_SUCCESS:
    case actionTypes.RATING_FETCH_FAIL:
    default:
      return state;
  }
};
