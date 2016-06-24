import * as keyMirror from 'keymirror';

const actionTypes = keyMirror({
//USER
  USER_AUTH_INIT              : undefined,
  USER_AUTH_SUCCESS           : undefined,
  USER_AUTH_FAIL              : undefined,

  USER_CREATE_INIT            : undefined,
  USER_CREATE_SUCCESS         : undefined,
  USER_CREATE_FAIL            : undefined,

  USER_FETCH_INIT             : undefined,
  USER_FETCH_SUCCESS          : undefined,
  USER_FETCH_FAIL             : undefined,

//EVENTS

  EVENTS_STATUS_SET            : undefined,

  EVENTS_CREATE_INIT           : undefined,
  EVENTS_CREATE_FAIL           : undefined,
  EVENTS_CREATE_SUCCESS        : undefined,

  EVENTS_DELETE_INIT           : undefined,
  EVENTS_DELETE_FAIL           : undefined,
  EVENTS_DELETE_SUCCESS        : undefined,

  EVENTS_FETCH_INIT            : undefined,
  EVENTS_FETCH_FAIL            : undefined,
  EVENTS_FETCH_SUCCESS         : undefined,

//OTHER
  RATING_INIT                 : undefined,
  RATING_FAIL                 : undefined,
  RATING_SUCCESS              : undefined,
})

export default actionTypes;
