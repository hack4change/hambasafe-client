import actionTypes from '../actionTypes.ts';
const _ = require('lodash');

export default function eventData(state:any, action:any = {}) {
  console.log('action');
  console.log(action);
  switch (action && action.type) {
    case actionTypes.EVENTS_STATUS_SET:
      console.log(action.data.get('status'));
    return state.set('status', action.data.get('status'));

//CREATE EVENTS
    case actionTypes.EVENT_CREATE_INIT:
      console.log(action.data.get('status'));
    return state.set('status', action.data.get('status'));

    case actionTypes.EVENT_CREATE_SUCCESS:
      return state.set('status', action.data.get('status'));

    case actionTypes.EVENT_CREATE_FAIL:
      return state.set('status', action.data.get('status'));

    case actionTypes.EVENT_JOIN_INIT:
      return state;
      
    case actionTypes.EVENT_JOIN_SUCCESS:
    var items = state.get('items').toSet().union(action.data.get('items').toSet()).toList();
    return state.set('items', items);
    case actionTypes.EVENT_JOIN_FAIL:

//DELETE EVENTS
    case actionTypes.EVENTS_DELETE_INIT:
    case actionTypes.EVENTS_DELETE_SUCCESS:
    case actionTypes.EVENTS_DELETE_FAIL:
//FETCH EVENTS
    case actionTypes.EVENTS_FETCH_INIT:
    case actionTypes.EVENTS_FETCH_SUCCESS:
    var items = state.get('items').toSet().union(action.data.get('items').toSet()).toList();
    return state.set('items', items);
    case actionTypes.EVENTS_FETCH_FAIL:
//RATING EVENTS
    case actionTypes.RATING_FETCH_INIT:
    case actionTypes.RATING_FETCH_SUCCESS:
    case actionTypes.RATING_FETCH_FAIL:
    default:
      return state;
  }
};
