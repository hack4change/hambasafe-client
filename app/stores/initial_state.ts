import {fromJS, List, Map} from 'immutable';
import {EventDatum} from '../eventDatum';
import {User} from '../user';

export const getInitialState = ()=> {
  return Map<string, any>({
    eventData: Map<string, any>(fromJS({status: "idle", items: []})),
    users: Map<string, any>(fromJS({status: "idle", items: []})),
    currentUser: {
      status: "ANONYMOUS",
      id : '',
      accessToken: '',
      isLoggedIn: false,
      username: '',
    }
  })
}

