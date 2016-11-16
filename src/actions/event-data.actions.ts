import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import actionTypes from '../actionTypes';
import { NgRedux } from 'ng2-redux';
import {fromJS} from 'immutable';
import { ParseManager } from '../providers/parse-manager';
const _ = require('lodash');

/*
  Generated class for the EventDataActions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EventDataActions {
  public attendingSub$;

  constructor(public http: Http, public parseManager: ParseManager, public ngRedux: NgRedux<any>) {
    console.log('Hello EventDataActions Provider');
  }

  setFetchSuccessState(response) {
    console.log('FETCH SUCCESS');
    console.log(response);
    return {
      data: fromJS({
        items: _.keyBy(response, 'objectId'),
        status: 'SUCCESS',
      }),
      type: actionTypes.EVENTS_FETCH_SUCCESS,
    };
  };

  // Error.
  setFetchErrorState(error) : any {
    return {
      data: fromJS({
        items: {},
        message: error,
        status: 'ERROR',
      }),
      type: actionTypes.EVENTS_FETCH_FAIL,
    };
  };

  setFetchLoadingState() {
    return {
      data: fromJS({
        items: {},
        status: 'loading',
      }),
      type: actionTypes.EVENTS_FETCH_INIT,
    };
  };

  fetchEvent(activityId: string) : any {
    return dispatch => {
      console.log('dispatch');
      // Set loading state.
      dispatch(this.setFetchLoadingState());

      this.parseManager.getActivity(activityId)
      .then((res) => {
          this.ngRedux.dispatch(this.setFetchSuccessState(res));
      })
      .catch((err) => {
        console.log(err);
        this.ngRedux.dispatch(this.setFetchErrorState(err));
      })
    };
  }

  fetchEvents() : any {
    return dispatch => {
      console.log('dispatch');
      // Set loading state.
      dispatch(this.setFetchLoadingState());

    };
  };
  fetchEventsBySuburb(suburb: string) : any {
    return dispatch => {
      console.log('dispatch');
      // const url = API_ROOT + '/Events/events-by-suburb';

      // Set loading state.
      dispatch(this.setFetchLoadingState());

    };
  }

  fetchEventsByQuery(query: string, latitude: number, longitude: number) : any {
    return dispatch => {
      console.log('dispatch');
      if(!query){
        return;
      }
      query = query.toLowerCase().trim();

      // Set loading state.
      dispatch(this.setFetchLoadingState());
      // Do request.
      this.parseManager.getActivitiesByQuery(query, latitude, longitude)
      .then((res) => {
        console.log('succesfully fetched activities by query');
        console.log(res);
        this.ngRedux.dispatch(this.setFetchSuccessState(res));
        return Promise.resolve(res);
      })
      .catch((err)=> {
        return dispatch(this.setFetchErrorState(err));
      });
    };
  }
  fetchEventsByCoordinates(distance: number, latitude: number, longitude: number) : any {
    return dispatch => {
      console.log('dispatch');

      // Set loading state.
      dispatch(this.setFetchLoadingState());
      // Do request.
      this.parseManager.getActivitiesByLocation(distance, latitude, longitude)
      .then((res) => {
        console.log('succesfully fetched activities by coords');
        console.log(res);
        this.ngRedux.dispatch(this.setFetchSuccessState(res));
      })
      .catch((err) => {
        console.log('parse saving error');
        this.ngRedux.dispatch(this.setFetchErrorState(err));
      })
    };
  }

  /**
   * CREATE
   */
  createActivity(data) : any {
    return dispatch => {
      console.log('event Create')
      dispatch(this.setCreateLoadingState());
      this.parseManager.createActivity(data)
      .then((res) => {
        console.log(res);
        return this.ngRedux.dispatch(this.setCreateSuccessState(res));
      })
      .catch((err) => {
        console.log('PARSE CREATE ACTIVITY ERROR');
        this.ngRedux.dispatch(this.setCreateErrorState(err));
      })
    };
  }

  /**
   * UPDATE
   */
  updateActivity(activityId, data) : any {
    return dispatch => {
      console.log('event Create')
      dispatch(this.setCreateLoadingState());
      this.parseManager.updateActivity(activityId, data)
      .then((res) => {
        console.log(res);
        this.ngRedux.dispatch(this.setCreateSuccessState(res));
      })
      .catch((err) => {
        console.log('PARSE CREATE ACTIVITY ERROR');
        this.ngRedux.dispatch(this.setCreateErrorState(err));
      })
      // Set loading state.

      // Do request.
    };
  }
  setCreateSuccessState(response) {
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
  setCreateErrorState(error) {
    return {
      data: fromJS({
        message: error,
        status: 'CREATE_ERROR',
      }),
      type: actionTypes.EVENT_CREATE_FAIL,
    };
  };
  setCreateLoadingState() {
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

  joinActivity(activityId) : any {
    return dispatch => {
      console.log('event Join')
      dispatch(this.setJoinLoadingState());
      this.parseManager.joinActivity(
        activityId,
        (error) => dispatch(this.setJoinErrorState(error)),
          (response) => dispatch(this.setJoinSuccessState(response))
      );
    };
  };

  setJoinSuccessState(response) {
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
  setJoinErrorState(error) {
    return {
      data: fromJS({
        message: error,
        status: 'JOIN_ERROR',
      }),
      type: actionTypes.EVENT_JOIN_FAIL,
    };
  };
  setJoinLoadingState() {
    console.log('loadingState');
    return {
      data: fromJS({
        status: 'JOINING',
      }),
      type: actionTypes.EVENT_JOIN_INIT,
    };
  }

  setVisible(filterString) : any {
    console.log('setting visible')
    return {
      data: fromJS({
        'visible' : filterString
      }),
      type: actionTypes.EVENTS_VISIBLE_SET,
    };
  };

  setIdle() : any {
    return {
      data: fromJS({
        message:  '',
        status:   'idle',
      }),
      type: actionTypes.EVENTS_STATUS_SET,
    };
  };
  inviteToActivity(activityId, userKeys):any {
    return dispatch => {
      dispatch(this.setInviteLoadingState());
      this.parseManager.inviteToActivity(activityId, userKeys)
      .r
        // (res) => dispatch(this.setInviteSuccessState(res)),
        //   (res) => dispatch(this.setInviteErrorState(res))
    }
  }
  setInviteSuccessState(response) {
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
  setInviteErrorState(error) {
    return {
      data: fromJS({
        message: error,
        status: 'INVITE_ERROR',
      }),
      type: actionTypes.EVENT_INVITE_FAIL,
    };
  };
  setInviteLoadingState() {
    console.log('loadingState');
    return {
      data: fromJS({
        status: 'INVITING',
      }),
      type: actionTypes.EVENT_INVITE_INIT,
    };
  }

  subscribeAttending() : any {
    return dispatch => {
      this.attendingSub$ = this.parseManager.subscribeToAttending();
      this.attendingSub$
      .on('create', (attendance) => {
        var attendedActivity = attendance.get('activityReference').toJSON();
        attendedActivity.isAttending = true;
        if (!attendance.get('ratingPtr')) {
          attendedActivity.mustRate = true;
        } else {
          attendedActivity.mustRate = false;
        }
        this.ngRedux.dispatch(this.setFetchSuccessState([attendedActivity]))
      })

      this.attendingSub$
      .on('update', (attendance) => {
        var attendedActivity = attendance.get('activityReference').toJSON();
        attendedActivity.isAttending = true;
        if (!attendance.get('ratingPtr')) {
          attendedActivity.mustRate = true;
        } else {
          attendedActivity.mustRate = false;
        }
        this.ngRedux.dispatch(this.setFetchSuccessState([attendedActivity]))
      })

      this.attendingSub$
      .on('delete', (attendance) => {
        this.ngRedux.dispatch(this.setDeleteAttending(attendance));
      })

      this.parseManager.fetchAttending()
      .then((res)=>{
        this.ngRedux.dispatch(this.setFetchSuccessState(res));
      })
      .catch((err)=>{
        console.log('ERROR: fetch attending');
        console.log(err);
        this.ngRedux.dispatch(this.setFetchErrorState(err));
      });
    }
  }

  setCreateAttending(res) : any {

  }
  setDeleteAttending(res) : any {

  }
  setSubscribeAttendingSuccess() : any {

  }
  setSubscribeAttendingFail(err) : any {

  }
  rateActivity(activityId : string, rating:number) : any {
    return dispatch => {
      this.parseManager.rateActivity(
        activityId,
        rating,
        (res) => {
          this.setRatingSuccess();
        },
        (err) => {
          this.setRatingFailure(err);
        }
      )
    }
  }

  setRatingSuccess() {

  }
  setRatingFailure(err){

  }

}
