import * as keyMirror from 'keymirror';

const actionTypes = keyMirror({
//USER
  USER_LOGOUT_INIT              : undefined,
  USER_LOGOUT_SUCCESS           : undefined,
  USER_LOGOUT_FAIL              : undefined,

  USER_AUTH_INIT                : undefined,
  USER_AUTH_SUCCESS             : undefined,
  USER_AUTH_FAIL                : undefined,

  USER_CREATE_INIT              : undefined,
  USER_CREATE_SUCCESS           : undefined,
  USER_CREATE_FAIL              : undefined,

  USER_FETCH_INIT               : undefined,
  USER_FETCH_SUCCESS            : undefined,
  USER_FETCH_FAIL               : undefined,

  USER_SET_POSITION             : undefined,
  USER_SET_POSITION_FAIL        : undefined,
  USER_SET_POSITION_SUCCESS     : undefined,
//EVENTS

  EVENT_VISIBLE_SET             : undefined,
  EVENTS_STATUS_SET              : undefined,

  EVENT_CREATE_INIT             : undefined,
  EVENT_CREATE_FAIL             : undefined,
  EVENT_CREATE_SUCCESS          : undefined,

  EVENT_JOIN_INIT               : undefined,
  EVENT_JOIN_FAIL               : undefined,
  EVENT_JOIN_SUCCESS            : undefined,

  EVENT_DELETE_INIT             : undefined,
  EVENT_DELETE_FAIL             : undefined,
  EVENT_DELETE_SUCCESS          : undefined,

  EVENTS_FETCH_INIT             : undefined,
  EVENTS_FETCH_FAIL             : undefined,
  EVENTS_FETCH_SUCCESS          : undefined,

//OTHER
  RATING_INIT                   : undefined,
  RATING_FAIL                   : undefined,
  RATING_SUCCESS                : undefined,

  USER_SET_STATUS               : undefined,
})

export default actionTypes;
