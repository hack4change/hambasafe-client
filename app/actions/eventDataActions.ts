import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
import {EventDatum} from '../eventDatum';

const API_ROOT = 'http://hambasafetesting.azurewebsites.net/v1';

/*
 * FETCHING
 */
// Success.
const setFetchSuccessState = (response) => {
  return {
    data: fromJS({
      items: response.data.children.map((p)=> EventDatum.fromJS(p.data)),
      status: 'success',
    }),
    type: actionTypes.EVENTS_FETCH_SUCCESS,
  };
};

// Error.
const setFetchErrorState = (error) => {
  return {
    data: fromJS({
      items: [],
      message: error,
      status: 'error',
    }),
    type: actionTypes.EVENTS_FETCH_FAIL,
  };
};

const setFetchLoadingState = () => {
  return {
    data: fromJS({
      items: [],
      status: 'loading',
    }),
    type: actionTypes.EVENTS_FETCH_INIT,
  };
};

const fetchEvents = (distance: number, latitude: number, longitude: number) : any => {
  return dispatch => {
    const url = API_ROOT + '/Events/events-by-coordinates';

    const options = {
      query: {
        distance  : distance,
        latitude  : latitude,
        longitude : longitude,
      }
    }
    // Set loading state.
    dispatch(setFetchLoadingState());

    // Do request.
    jsonRequest(
      url,
      options,
      (error) => dispatch(setFetchErrorState(error)),
      (response) => dispatch(setFetchSuccessState(response))
    );
  };
};

/**
 * Creating
 */
const setCreateSuccessState = (response) => {
  return {
    data: fromJS({
      status: 'created',
    }),
    type: actionTypes.EVENTS_CREATE_SUCCESS,
  };
};

// Error.
const setCreateErrorState = (error) => {
  return {
    data: fromJS({
      message: error,
      status: 'error',
    }),
    type: actionTypes.EVENTS_CREATE_FAIL,
  };
};
const setCreateLoadingState = () => {
  console.log('loadingState');
  return {
    data: fromJS({
      status: 'creating',
    }),
    type: actionTypes.EVENTS_CREATE_INIT,
  };
}


const createEvent = (data):any => {
  return dispatch => {
    const url = API_ROOT  + '/Events/create-event';
    console.log('event Create')
    const options = {
      method : 'POST',
      body : data,
    }

    // Set loading state.
    // dispatch(setCreateLoadingState());

    // Do request.
    // jsonRequest(
    //   url,
    //   options,
    //   (error) => dispatch(setCreateErrorState(error)),
    //   (response) => dispatch(setCreateSuccessState(response))
    // );
  };
};

const setIdle = ():any => {
  return {
    data: fromJS({
      status: 'idle',
    }),
    type: actionTypes.EVENTS_STATUS_SET,
  };
};

export const eventDataActions = {
  fetchEvents,
  createEvent,
  setIdle,
};
