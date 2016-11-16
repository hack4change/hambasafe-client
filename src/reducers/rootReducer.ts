import {combineReducers} from 'redux';

import users from './users';
import eventData from './eventData';
import invites from './invites';
import currentUser from './currentUser';
import pages from './pages';

const rootReducer = combineReducers({
  users,
  eventData,
  invites,
  currentUser,
  pages,
});

export default rootReducer;
