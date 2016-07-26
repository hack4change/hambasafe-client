import {combineReducers} from 'redux-immutable';

import users from './users';
import eventData from './eventData';
import invites from './invites';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  users,
  eventData,
  invites,
  currentUser,
});

export default rootReducer;
