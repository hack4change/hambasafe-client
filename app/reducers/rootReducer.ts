import {combineReducers} from 'redux-immutable';

import users from './users';
import eventData from './eventData';

const rootReducer = combineReducers({
  users,
  eventData,
});

export default rootReducer;
