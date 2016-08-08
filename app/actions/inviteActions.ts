import actionTypes from '../actionTypes.ts';
import {fromJS} from 'immutable';
import jsonRequest from '../utils/jsonRequest';
const _ = require('lodash');

/*
 *  DECLARATIONS
 */
declare var window;
const subscribe = ():any => {
  return dispatch => {
    dispatch(setSubscribeLoading());
    window.parseManager.subscribeToInvites(
      () => {
        dispatch(setSubscribeSuccess());
      },
      (err) => {
        dispatch(setSubscribeError(err));
      },
      (res) => {
        dispatch(setCreateSuccess(res));
        dispatch(setCreateEvent(res.activityPtr));
      },
      (res) => {
        dispatch(setDeleteSuccess(res));
      }
    )
  }
}
const deleteInvite = (activityId:string):any => {
  return dispatch => {
    console.log('delete invite');
    window.parseManager.deleteInvite(
      activityId, 
      (err) => {
        dispatch(setDeleteFailure(err));
      },
      (res) => {
        dispatch(setDeleteSuccess(res));
      }
    )
  }
}

const setSubscribeLoading = () => {
  return {
    type  : actionTypes.INVITE_SUBSCRIBE_INIT,
    data  : fromJS({
      'status': 'SUBSCRIBING',
    })
  }
}
const setSubscribeSuccess = () => {
  return {
    type  : actionTypes.INVITE_SUBSCRIBE_SUCCESS,
    data  : fromJS({
      'status': 'SUBSCRIBED',
    })
  }
}

const setCreateEvent = (res) => {
  return {
    data: fromJS({
      items: _.keyBy([res], 'objectId'),
      status: 'SUCCESS',
    }),
    type: actionTypes.EVENTS_FETCH_SUCCESS,
  };
}
const setCreateSuccess = (res) => {
  return {
    type  : actionTypes.INVITE_FETCH_SUCCESS,
    data  : fromJS({
      items : _.keyBy([res], 'objectId'),
    })
  }
}
const setDeleteSuccess = (res) => {
  return {
    type  : actionTypes.INVITE_DELETE_SUCCESS,
    data  : fromJS({
      'objectId'  : res
    })
  }
}
const setDeleteFailure = (res) => {
  return {
    type  : actionTypes.INVITE_DELETE_FAIL,
    data  : fromJS({
      'objectId'  : res
    })
  }
}


const setSubscribeError = (err) => {
  console.log('INVITE SUBSCRIPTION ERROR');
  return {
    type  : actionTypes.INVITE_SUBSCRIBE_FAIL,
    data  : fromJS({
      'status'    : 'UNSUBSCRIBED',
    })
  }

}
const setIdle = (err) => {
  return {
    type  : actionTypes.INVITE_SET_STATUS,
    data  : fromJS({
      'status'    : '',
    })
  }

}

export const inviteActions = {
  subscribe,
  deleteInvite,
};
