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
import {NgRedux} from 'ng2-redux';
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
public inviteSub$;

constructor(
  public http: Http,
  public parseManager: ParseManager,
  public ngRedux: NgRedux<any>
) {
  console.log('Hello InviteActions Provider');
}

  subscribe():any {
    return dispatch => {
      dispatch(this.setSubscribeLoading());
      this.inviteSub$ = this.parseManager.subscribeToInvites();
      this.inviteSub$.on('create', (invite) => {
        console.log('add to invites');
        console.log(invite);
        var jsInvite = invite.toJSON();
        this.ngRedux.dispatch(this.setCreateSuccess(jsInvite));
        this.ngRedux.dispatch(this.setCreateEvent(jsInvite.activityPtr));
      })
      this.inviteSub$.on('delete', (invite) => {
        this.ngRedux.dispatch(this.setDeleteSuccess(invite.toJSON()['objectId']));
      })
      this.inviteSub$.on('error', (err) => {
        this.ngRedux.dispatch(this.setSubscribeError(err));
      })

      this.parseManager.fetchInvites()
      .then((res) => {
        if(res.length) {
          for(var i = 0; i < res.length; i++){
            this.ngRedux.dispatch(this.setCreateSuccess(res[i]));
            this.ngRedux.dispatch(this.setCreateEvent(res[i].activityPtr));
          }
        }
      })
      .catch((err)=>{
        console.log('ERROR: fetch attending');
        console.log(err);
        this.ngRedux.dispatch(this.setSubscribeError(err));
      });
    }
  }
  deleteInvite(activityId:string):any {
    return dispatch => {
      console.log('delete invite');
      this.parseManager.deleteInvite(activityId)
      .then((res) => {
        this.ngRedux.dispatch(this.setDeleteSuccess(res));
      })
      .catch((err) => {
        dispatch(this.setDeleteFailure(err));
      })
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
    console.log("INVITE EVENT CREATE");
    console.log(res);
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

