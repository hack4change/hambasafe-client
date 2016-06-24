import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
import {User} from '../user';

const API_ROOT = 'http://hambasafetesting.azurewebsites.net';

// Success.
const setSuccessState = (response) => {
  return {
    data: fromJS({
      items: response.data.children.map((p)=>User.fromJS(p.data)),
      status: 'success',
    }),
    type: actionTypes.USER_AUTH_SUCCESS,
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
    type: actionTypes.USER_AUTH_FAIL,
  };
};

const setLoadingState = () => {
  return {
    data: fromJS({
      items: [],
      status: 'loading',
    }),
    type: actionTypes.USER_AUTH_INIT,
  };
};

const authhUser = ():any => {
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

export const authActions = {
  authhUser,
};
