import actionTypes from '../actionTypes.ts';

export default function eventData(state:any, action:any = {}) {
  switch (action && action.type) {
    case actionTypes.EVENTS_CREATE_INIT:
    case actionTypes.EVENTS_CREATE_SUCCESS:
    case actionTypes.EVENTS_CREATE_FAIL:
      return action.data;
    case actionTypes.EVENTS_DELETE_INIT:
    case actionTypes.EVENTS_DELETE_SUCCESS:
    case actionTypes.EVENTS_DELETE_FAIL:
      return action.data;
    case actionTypes.EVENTS_FETCH_INIT:
    case actionTypes.EVENTS_FETCH_SUCCESS:
    case actionTypes.EVENTS_FETCH_FAIL:
      return action.data;
    case actionTypes.RATING_FETCH_INIT:
    case actionTypes.RATING_FETCH_SUCCESS:
    case actionTypes.RATING_FETCH_FAIL:
      return action.data;
    default:
      return state;
  }
};
