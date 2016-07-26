import {fromJS, List, Map} from 'immutable';
import {EventDatum} from '../eventDatum';
import {User} from '../user';

export const getInitialState = ()=> {
  return Map<string, any>({
    eventData: Map<string, any>(fromJS({
      status: "idle",
      visibleType: '',
      items: {},
    })),
    users: Map<string, any>(fromJS({
      status: "idle",
      items: {},
    })),
    invites: Map<string, any>(fromJS({
      status: "UNSUBSCRIBED",
      items: {} 
    })),
    currentUser: Map<string, any>(fromJS({
      status: "ANONYMOUS",
      // id : '',
      // fbId : '',
      // accessToken: '',
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      location: {
        longtiude: null,
        latitude : null,
      },
      mobileNumber: '',
      email : '',
      profilePicture: '',
      message: '',
    }))
  })
}

