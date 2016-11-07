/*
 *  DECLARATIONS
 */
declare var window;
/*
 * Imports
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {fromJS} from 'immutable';
import * as _ from 'lodash';

import actionTypes from '../actionTypes';

import { ParseManager } from '../providers/parse-manager'

/*
  Generated class for the InviteActions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InviteActions {

  constructor(
    public http: Http,
    public parseManager: ParseManager
  ) {
    console.log('Hello InviteActions Provider');
  }

  subscribe():any {
    return dispatch => {
      dispatch(this.setSubscribeLoading());
      this.parseManager.subscribeToInvites(
        () => {
          dispatch(this.setSubscribeSuccess());
        },
        (err) => {
          dispatch(this.setSubscribeError(err));
        },
        (res) => {
          dispatch(this.setCreateSuccess(res));
          dispatch(this.setCreateEvent(res.activityPtr));
        },
        (res) => {
          dispatch(this.setDeleteSuccess(res));
        }
      )
    }
  }
  deleteInvite(activityId:string):any {
    return dispatch => {
      console.log('delete invite');
      this.parseManager.deleteInvite(
        activityId, 
        (err) => {
          dispatch(this.setDeleteFailure(err));
        },
        (res) => {
          dispatch(this.setDeleteSuccess(res));
        }
      )
    }
  }

  setSubscribeLoading() {
    return {
      type  : actionTypes.INVITE_SUBSCRIBE_INIT,
      data  : fromJS({
        'status': 'SUBSCRIBING',
      })
    }
  }
  setSubscribeSuccess() {
    return {
      type  : actionTypes.INVITE_SUBSCRIBE_SUCCESS,
      data  : fromJS({
        'status': 'SUBSCRIBED',
      })
    }
  }

  setCreateEvent(res) {
    return {
      data: fromJS({
        items: _.keyBy([res], 'objectId'),
        status: 'SUCCESS',
      }),
      type: actionTypes.EVENTS_FETCH_SUCCESS,
    };
  }
  setCreateSuccess(res) {
    return {
      type  : actionTypes.INVITE_FETCH_SUCCESS,
      data  : fromJS({
        items : _.keyBy([res], 'objectId'),
      })
    }
  }
  setDeleteSuccess(res) {
    return {
      type  : actionTypes.INVITE_DELETE_SUCCESS,
      data  : fromJS({
        'objectId'  : res
      })
    }
  }
  setDeleteFailure(res) {
    return {
      type  : actionTypes.INVITE_DELETE_FAIL,
      data  : fromJS({
        'objectId'  : res
      })
    }
  }


  setSubscribeError(err) {
    console.log('INVITE SUBSCRIPTION ERROR');
    return {
      type  : actionTypes.INVITE_SUBSCRIBE_FAIL,
      data  : fromJS({
        'status'    : 'UNSUBSCRIBED',
      })
    }

  }
  setIdle(err) {
    return {
      type  : actionTypes.INVITE_SET_STATUS,
      data  : fromJS({
        'status'    : '',
      })
    }

  }
}

