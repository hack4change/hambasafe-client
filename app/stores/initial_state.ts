import {fromJS, List, Map} from 'immutable';
import {EventDatum} from '../eventDatum';
import {User} from '../user';

export const getInitialState = ()=> {
  return Map<string, any>({
    eventDatum: Map<string, any>(fromJS({status: "loading", items: []})),
    user: Map<string, any>(fromJS({status: "loading", items: []})),
  })
}

