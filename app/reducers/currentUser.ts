import actionTypes from '../actionTypes.ts';

export default function currentUser(state:any, action:any = {}) {
  console.log(action);
  switch (action && action.type) {
    case actionTypes.USER_AUTH_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_AUTH_SUCCESS:
      let retState = state.set('accessToken', action.data.get('accessToken'))
      retState = retState.set('status', action.data.get('status'));
      retState = retState.set('id', action.data.get('name'));
      retState = retState.set('id', action.data.get('id'));
      console.log(retState);
      return retState;
    case actionTypes.USER_AUTH_FAIL:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_LOGOUT_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_LOGOUT_SUCCESS:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_LOGOUT_FAIL:
      return state.set('status', action.data.get('status'));
    default:
      return state;
  }
};
