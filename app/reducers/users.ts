import actionTypes from '../actionTypes.ts';

export default function users(state:any, action:any = {}) {
  switch (action && action.type) {
    case actionTypes.USER_AUTH_INIT:
    case actionTypes.USER_AUTH_SUCCESS:
    case actionTypes.USER_AUTH_FAIL:
      return action.data;
    case actionTypes.USER_CREATE_INIT:
    case actionTypes.USER_CREATE_SUCCESS:
    case actionTypes.USER_CREATE_FAIL:
      return action.data;
    case actionTypes.USER_FETCH_INIT:
    case actionTypes.USER_FETCH_SUCCESS:
    case actionTypes.USER_FETCH_FAIL:
      return action.data;
    case actionTypes.RATING_FETCH_INIT:
    case actionTypes.RATING_FETCH_SUCCESS:
    case actionTypes.RATING_FETCH_FAIL:
      return action.data;
    default:
      return state;
  }
};
