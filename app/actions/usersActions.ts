import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
import {User} from '../user';

const API_ROOT = 'http://hambasafetesting.azurewebsites.net/v1/Users';

/*
 *  FETCH USER
 */

// Success.
const setSuccessState = (response) => {
  return {
    data: fromJS({
      items: [],//response.data.children.map((p)=>User.fromJS(p.data)),
      status: 'SUCCESS',
    }),
    type: actionTypes.USER_FETCH_SUCCESS,
  };
};

// Error.
const setErrorState = (error) => {
  return {
    data: fromJS({
      items: [],
      message: error,
      status: 'ERROR',
    }),
    type: actionTypes.USER_FETCH_FAIL,
  };
};

const setLoadingState = () => {
  return {
    data: fromJS({
      items: [],
      status: 'LOADING',
    }),
    type: actionTypes.USER_FETCH_INIT,
  };
};

const fetchUser = ():any => {
  return dispatch => {
    const url = API_ROOT + '/user';
    // Set loading state.
    dispatch(setLoadingState());

    var options = {
    
    }
    // Do request.
    jsonRequest(
      url,
      options,
      (error) => dispatch(setErrorState(error)),
      (response) => dispatch(setSuccessState(response))
    );
  };
};

/*
 *  CREATE USER
 *
 */
// Error.
const createUserError = (error) => {
  console.log('error');
  return {
    data: fromJS({
      message: error,
      status: 'CREATE_ERROR',
    }),
    type: actionTypes.USER_CREATE_FAIL,
  };
}

const createUserSuccess = (response) => {
  console.log('success');
  console.log(response);
  return {
    data: fromJS({
      'status': 'CREATE_SUCCESS',
      'id' : response,
    }),
    type: actionTypes.USER_CREATE_SUCCESS,
  };
};

const setUsersCreating = () => {
  return {
    data: fromJS({
      items: [],
      status: 'CREATING',
    }),
    type: actionTypes.USER_CREATE_INIT,
  };
};

const createUser = (data):any => {
  return dispatch => {
    const url = API_ROOT + '/create-user';

    const options = {
      method : 'POST',
      body : data,
    }

    console.log(options);
    // Set loading state.
    dispatch(setUsersCreating());

    // Do request.
    jsonRequest(
      url,
      options,
      (error) => dispatch(createUserError(error)),
      (response) => dispatch(createUserSuccess(response))
    );
  };
};

const setUsersIdle = ():any => {
  return dispatch => {
    // Set loading state.
    dispatch(setUsersIdle());
  };
};

export const usersActions = {
  fetchUser,
  createUser,
  setUsersIdle,
};
