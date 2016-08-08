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

  USER_ADD_FRIEND_INIT          : undefined,
  USER_ADD_FRIEND_SUCCESS       : undefined,
  USER_ADD_FRIEND_FAIL          : undefined,

  USER_FETCH_INIT               : undefined,
  USER_FETCH_SUCCESS            : undefined,
  USER_FETCH_FAIL               : undefined,

  USER_SET_POSITION             : undefined,
  USER_SET_POSITION_FAIL        : undefined,
  USER_SET_POSITION_SUCCESS     : undefined,
  USER_SET_STATUS               : undefined,

//FRIENDS
  
  FRIEND_SUBSCRIBE_INIT         : undefined, 
  FRIEND_SUBSCRIBE_SUCCESS      : undefined, 
  FRIEND_SUBSCRIBE_FAIL         : undefined, 

  FRIEND_DELETE_INIT            : undefined, 
  FRIEND_DELETE_SUCCESS         : undefined, 
  FRIEND_DELETE_FAIL            : undefined, 

//EVENTS

  EVENT_VISIBLE_SET             : undefined,
  EVENTS_STATUS_SET             : undefined,

  EVENT_CREATE_INIT             : undefined,
  EVENT_CREATE_FAIL             : undefined,
  EVENT_CREATE_SUCCESS          : undefined,

  EVENT_INVITE_INIT             : undefined,
  EVENT_INVITE_FAIL             : undefined,
  EVENT_INVITE_SUCCESS          : undefined,

  EVENT_JOIN_INIT               : undefined,
  EVENT_JOIN_FAIL               : undefined,
  EVENT_JOIN_SUCCESS            : undefined,

  EVENT_DELETE_INIT             : undefined,
  EVENT_DELETE_FAIL             : undefined,
  EVENT_DELETE_SUCCESS          : undefined,

  EVENTS_FETCH_INIT             : undefined,
  EVENTS_FETCH_FAIL             : undefined,
  EVENTS_FETCH_SUCCESS          : undefined,

  //INVITES
  INVITE_SUBSCRIBE_INIT         : undefined,
  INVITE_SUBSCRIBE_SUCCESS      : undefined,
  INVITE_SUBSCRIBE_FAIL         : undefined,
  INVITE_FETCH_INIT             : undefined,
  INVITE_FETCH_SUCCESS          : undefined,
  INVITE_FETCH_FAIL             : undefined,
  INVITE_DELETE_INIT            : undefined,
  INVITE_DELETE_SUCCESS         : undefined,
  INVITE_DELETE_FAIL            : undefined,
  INVITE_ACCEPT_INIT            : undefined,
  INVITE_ACCEPT_SUCCESS         : undefined,
  INVITE_ACCEPT_FAIL            : undefined,
  INVITE_DECLINE_INIT           : undefined,
  INVITE_DECLINE_SUCCESS        : undefined,
  INVITE_DECLINE_FAIL           : undefined,
  INVITE_SET_STATUS             : undefined,

  //OTHER
  RATING_INIT                   : undefined,
  RATING_FAIL                   : undefined,
  RATING_SUCCESS                : undefined,
})

export default actionTypes;
