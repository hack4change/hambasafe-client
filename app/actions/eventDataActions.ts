import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
import {EventDatum} from '../eventDatum';
import {ParseManager} from '../models/parseManager';
const _ = require('lodash');

const API_ROOT = 'http://hambasafetesting.azurewebsites.net/v1';


// const parseManager =  ParseManager();

/*
 * FETCHING
 */
// Success.
const setFetchSuccessState = (response) => {
  return {
    data: fromJS({
      items: _.keyBy(response, 'objectId'),
      status: 'SUCCESS',
    }),
    type: actionTypes.EVENTS_FETCH_SUCCESS,
  };
};

// Error.
const setFetchErrorState = (error) => {
  return {
    data: fromJS({
      items: {},
      message: error,
      status: 'ERROR',
    }),
    type: actionTypes.EVENTS_FETCH_FAIL,
  };
};

const setFetchLoadingState = () => {
  return {
    data: fromJS({
      items: {},
      status: 'loading',
    }),
    type: actionTypes.EVENTS_FETCH_INIT,
  };
};

const fetchEvent = (activityId: string) : any => {
  return dispatch => {
    console.log('dispatch');
    // Set loading state.
    dispatch(setFetchLoadingState());

    window.parseManager.getActivity(
      activityId,
      (error) => dispatch(setFetchErrorState(error)),
        (response) => dispatch(setFetchSuccessState(response))
    );
  };
};
const fetchEvents = () : any => {
  return dispatch => {
    console.log('dispatch');
    const url = API_ROOT + '/Events/events';


    const options = {
    }
    // Set loading state.
    dispatch(setFetchLoadingState());

    // Do request.
    // jsonRequest(
    //   url,
    //   options,
    //   (error) => dispatch(setFetchErrorState(error)),
    //   (response) => dispatch(setFetchSuccessState(response))
    // );
  };
};
const fetchEventsBySuburb = (suburb: string) : any => {
  return dispatch => {
    console.log('dispatch');
    const url = API_ROOT + '/Events/events-by-suburb';

    const options = {
      query: {
        suburb: suburb
      }
    }
    // Set loading state.
    dispatch(setFetchLoadingState());

    // Do request.
    // jsonRequest(
    //   url,
    //   options,
    //   (error) => dispatch(setFetchErrorState(error)),
    //   (response) => dispatch(setFetchSuccessState(response))
    // );
  };
};
const fetchEventsByCoordinates = (distance: number, latitude: number, longitude: number) : any => {
  return dispatch => {
    console.log('dispatch');
    const url = API_ROOT + '/Events/events-by-coordinates';

    // Set loading state.
    dispatch(setFetchLoadingState());
    // Do request.
    window.parseManager.getActivitiesByLocation(
      distance,
      latitude,
      longitude,
      (error) => dispatch(setFetchErrorState(error)),
        (response) => dispatch(setFetchSuccessState(response))
    );
  };
};

/**
 * CREATE
 */
const createActivity = (data):any => {
  return dispatch => {
    console.log('event Create')
    dispatch(setCreateLoadingState());
    window.parseManager.createActivity(
      data,
      (error) => dispatch(setCreateErrorState(error)),
      (response) => dispatch(setCreateSuccessState(response))
    );
    // Set loading state.

    // Do request.
  };
};

/**
 * UPDATE
 */
const updateActivity = (activityId, data):any => {
  return dispatch => {
    console.log('event Create')
    dispatch(setCreateLoadingState());
    window.parseManager.updateActivity(
      activityId,
      data,
      (error) => dispatch(setCreateErrorState(error)),
      (response) => dispatch(setCreateSuccessState(response))
    );
    // Set loading state.

    // Do request.
  };
};
const setCreateSuccessState = (response) => {
  return {
    data: fromJS({
      status: 'CREATED',
      message: response.message,
      items: _.keyBy([response.item], 'objectId')
    }),
    type: actionTypes.EVENT_CREATE_SUCCESS,
  };
};

// Error.
const setCreateErrorState = (error) => {
  return {
    data: fromJS({
      message: error,
      status: 'CREATE_ERROR',
    }),
    type: actionTypes.EVENT_CREATE_FAIL,
  };
};
const setCreateLoadingState = () => {
  console.log('loadingState');
  return {
    data: fromJS({
      status: 'CREATING',
    }),
    type: actionTypes.EVENT_CREATE_INIT,
  };
}

/*
 *  JOIN
 */

const joinActivity = (activityId):any => {
  return dispatch => {
    console.log('event Join')
    dispatch(setJoinLoadingState());
    window.parseManager.joinActivity(
      activityId,
      (error) => dispatch(setJoinErrorState(error)),
      (response) => dispatch(setJoinSuccessState(response))
    );
  };
};

const setJoinSuccessState = (response) => {
  console.log('Join SUCCESS');
  console.log(response);
  return {
    data: fromJS({
      activityId: response['objectId'],
      status: 'JOINED',
    }),
    type: actionTypes.EVENT_JOIN_SUCCESS,
  };
};

// Error.
const setJoinErrorState = (error) => {
  return {
    data: fromJS({
      message: error,
      status: 'JOIN_ERROR',
    }),
    type: actionTypes.EVENT_JOIN_FAIL,
  };
};
const setJoinLoadingState = () => {
  console.log('loadingState');
  return {
    data: fromJS({
      status: 'JOINING',
    }),
    type: actionTypes.EVENT_JOIN_INIT,
  };
}

const setVisible = (filterString):any => {
  console.log('setting visible')
  return {
    data: fromJS({
      'visible' : filterString
    }),
    type: actionTypes.EVENTS_VISIBLE_SET,
  };
};

const setIdle = ():any => {
  return {
    data: fromJS({
      message:  '',
      status:   'idle',
    }),
    type: actionTypes.EVENTS_STATUS_SET,
  };
};
const inviteToActivity = (activityId, userKeys):any => {
  return dispatch => {
    dispatch(setInviteLoadingState());
    window.parseManager.inviteToActivity(
      activityId,
      userKeys,
      (res) => dispatch(setInviteSuccessState(res)),
      (res) => dispatch(setInviteErrorState(res))
    )
  }
}
const setInviteSuccessState = (response) => {
  console.log('Invite SUCCESS');
  console.log(response);
  return {
    data: fromJS({
      activityId: response['objectId'],
      status: 'INVITED',
    }),
    type: actionTypes.EVENT_INVITE_SUCCESS,
  };
};

// Error.
const setInviteErrorState = (error) => {
  return {
    data: fromJS({
      message: error,
      status: 'INVITE_ERROR',
    }),
    type: actionTypes.EVENT_INVITE_FAIL,
  };
};
const setInviteLoadingState = () => {
  console.log('loadingState');
  return {
    data: fromJS({
      status: 'INVITING',
    }),
    type: actionTypes.EVENT_INVITE_INIT,
  };
}
const subscribeAttending = ():any => {
  return dispatch => {
    window.parseManager.subscribeToAttending(
      (err) => {
        dispatch(setSubscribeAttendingFail(err))
      },
      (res) => {
        dispatch(setFetchSuccessState(res))
      },
      (res) => {
        dispatch(setDeleteAttending(res))
      }
    );
  }
}
const setCreateAttending = (res):any => {

}
const setDeleteAttending = (res):any => {
  
}
const setSubscribeAttendingSuccess = ():any => {

}
const setSubscribeAttendingFail = (err):any => {

}
const rateActivity = (activityId : string, rating:number):any => {
  return dispatch => {
    window.parseManager.rateActivity(
      activityId,
      rating,
      (res) => {
        setRatingSuccess();
      },
      (err) => {
        setRatingFailure(err);
      }
    )
  }
}

const setRatingSuccess = () => {

}
const setRatingFailure = (err) => {

}

export const eventDataActions = {
  fetchEvent,
  fetchEvents,
  fetchEventsBySuburb,
  fetchEventsByCoordinates,
  createActivity,
  updateActivity,
  joinActivity,
  setIdle,
  setVisible,
  inviteToActivity,
  subscribeAttending,
  rateActivity,
};
