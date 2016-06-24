import {fromJS, List, Map} from 'immutable';
import {EventDatum} from '../eventDatum';
import {User} from '../user';

export const getInitialState = ()=> {
  return Map<string, any>({
    eventData: Map<string, any>(fromJS({status: "loading", items: []})),
    users: Map<string, any>(fromJS({status: "loading", items: []})),
    currentUser: {
      status: "loading",
      id : '',
      isLoggedIn: false,
      username: '',
    }
  })
}

