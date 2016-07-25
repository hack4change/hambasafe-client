import actionTypes from '../actionTypes.ts';

export default function users(state:any, action:any = {}) {
  console.log('users reducer');
  switch (action && action.type) {
    case actionTypes.USER_FETCH_INIT:
      return state.set('status', action.data.get('status'))
    case actionTypes.USER_FETCH_SUCCESS:
      return state.set('items', state.get('items').merge(action.data.get('items')));
    case actionTypes.USER_FETCH_FAIL:
      return state
    .set('status', action.data.get('status'))
    .set('message', action.data.get('message'));
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
