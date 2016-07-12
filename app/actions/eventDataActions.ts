import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
import {EventDatum} from '../eventDatum';
 import {ParseManager} from '../models/parseManager';

const API_ROOT = 'http://hambasafetesting.azurewebsites.net/v1';


// const parseManager =  ParseManager();

/*
 * FETCHING
 */
// Success.
const setFetchSuccessState = (response) => {
  console.log(response);
  return {
    data: fromJS({
      items: response,
      status: 'SUCCESS',
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
      status: 'ERROR',
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
      status: 'CREATING',
    }),
    type: actionTypes.EVENTS_CREATE_INIT,
  };
}


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
  fetchEventsBySuburb,
  fetchEventsByCoordinates,
  createActivity,
  setIdle,
};
