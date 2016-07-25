import actionTypes from '../actionTypes.ts';

export default function currentUser(state:any, action: any= {}) {
  console.log(action);
  switch (action && action.type) {
    case actionTypes.USER_CREATE_INIT:
      return state.set('status', action.data.get('status'));
    case actionTypes.USER_CREATE_SUCCESS:
      var retState = state.set('status', action.data.get('status'));
      return retState.set('message', action.data.get('message'));
    case actionTypes.USER_CREATE_FAIL:
      var retState = state.set('status', action.data.get('status'));
      return retState.set('message', action.data.get('message'));
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
    default:
      return state;
  }
};
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
