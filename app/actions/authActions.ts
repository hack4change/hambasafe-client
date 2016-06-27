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
      status: 'attempting',
    }),
    type: actionTypes.USER_AUTH_INIT,
  };
};

const authUser = ():any => {
  return dispatch => {
    // const url = 'https://www.reddit.com/top/.json?limit=10';

    //
    // Set loading state.
    //
    // dispatch(setLoadingState());
  };
};
const fbLogin(){
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      FB.login(function(response: any) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function(response: any) {
            console.log('Good to see you, ' + response.name + '.');
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }) 
    }
  })
}

export const authActions = {
  authUser,
};
