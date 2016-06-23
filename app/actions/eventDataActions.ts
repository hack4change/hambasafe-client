import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
import {EventDatum} from '../post';

// Success.
const setSuccessState = (response) => {
  return {
    data: fromJS({
      items: response.data.children.map((p)=> EventDatum.fromJS(p.data)),
      status: 'success',
    }),
    type: actionTypes.EVENTS_FETCH_SUCCESS,
  };
};

// Error.
const setErrorState = (error) => {
  return {
    data: fromJS({
      items: [],
      message: error,
      status: 'error',
    }),
    type: actionTypes.EVENTS_FETCH_FAIL,
  };
};

const setLoadingState = () => {
  return {
    data: fromJS({
      items: [],
      status: 'loading',
    }),
    type: actionTypes.EVENTS_FETCH_INIT,
  };
};

const fetchPosts = ():any => {
  return dispatch => {
    const url = 'https://www.reddit.com/top/.json?limit=10';

    // Set loading state.
    dispatch(setLoadingState());

    // Do request.
    jsonRequest(
      url,
      (error) => dispatch(setErrorState(error)),
      (response) => dispatch(setSuccessState(response))
    );
  };
};

export const postsActions = {
  fetchEvents,
};
