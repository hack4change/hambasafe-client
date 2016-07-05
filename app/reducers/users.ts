import actionTypes from '../actionTypes.ts';

export default function users(state:any, action:any = {}) {
  switch (action && action.type) {
    case actionTypes.USER_FETCH_INIT:
      return state;
    case actionTypes.USER_FETCH_SUCCESS:
      return state;
    case actionTypes.USER_FETCH_FAIL:
      return state;
    case actionTypes.RATING_INIT:
      return state;
    case actionTypes.RATING_SUCCESS:
      return state;
    case actionTypes.RATING_FAIL:
      return state;
    default:
      return state;
  }
};
