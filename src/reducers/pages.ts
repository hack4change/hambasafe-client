import {fromJS, Map} from 'immutable';
// const _ = require('lodash');

import actionTypes from '../actionTypes';

const INIT_STATE = Map<string, any>(fromJS({
  status: "UNSUBSCRIBED",
  search  : {},
  home    : {
    visibility : 'all',
  },
  friends : {},
}))

export default function pages(state:any = INIT_STATE, action:any = {}) {
  console.log('action');
  console.log(action);
  switch (action && action.type) {
    case actionTypes.PAGE_HOME_UPDATE:
      return state.set('home', action.data);
    default:
      return state;
  }
}


