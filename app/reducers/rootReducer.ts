import {combineReducers} from 'redux-immutable';

import users from './users';
import eventData from './eventData';
import currentUser from './currentUser';

const rootReducer = combineReducers({
  users,
  eventData,
  currentUser,
});

export default rootReducer;
