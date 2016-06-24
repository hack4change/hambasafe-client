import actionTypes from '../actionTypes.ts';

export default function currentUser(state:any, action:any = {}) {
  switch (action && action.type) {
    case actionTypes.USER_AUTH_INIT:
    case actionTypes.USER_AUTH_SUCCESS:
    case actionTypes.USER_AUTH_FAIL:
      return action.data;
    default:
      return state;
  }
};
