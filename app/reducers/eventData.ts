import actionTypes from '../actionTypes.ts';

export default function eventData(state:any, action:any = {}) {
  console.log('here');
  switch (action && action.type) {
    case actionTypes.EVENTS_STATUS_SET:
      console.log(action.data.get('status'));
      return state.set('status', action.data.get('status'));
    case actionTypes.EVENTS_CREATE_INIT:
      console.log(action.data.get('status'));
      return state.set('status', action.data.get('status'));
    case actionTypes.EVENTS_CREATE_SUCCESS:
      return state.set('status', action.data.get('status'));
    case actionTypes.EVENTS_CREATE_FAIL:
    case actionTypes.EVENTS_DELETE_INIT:
    case actionTypes.EVENTS_DELETE_SUCCESS:
    case actionTypes.EVENTS_DELETE_FAIL:
    case actionTypes.EVENTS_FETCH_INIT:
    case actionTypes.EVENTS_FETCH_SUCCESS:
    case actionTypes.EVENTS_FETCH_FAIL:
    case actionTypes.RATING_FETCH_INIT:
    case actionTypes.RATING_FETCH_SUCCESS:
    case actionTypes.RATING_FETCH_FAIL:
    default:
      return state;
  }
};
