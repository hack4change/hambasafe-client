import {
  forwardRef,
  Component,
  ViewChild,
  OnInit,
  Input,
  NgZone,
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController, NavParams} from 'ionic-angular';
const _ = require('lodash');
import {capitalize} from '../../utils/capitalize.ts';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';
import {usersActions} from '../../actions/usersActions';

/*
 *  Pages
 */
import {HomePage} from '../home/HomePage';
import {SearchPage} from '../search/SearchPage';

@Component({
  templateUrl: 'build/pages/activity-invite/activity-invite.html',
  pipes : [
    capitalize
  ]
})
export class ActivityInvitePage {
  activityId              : string = ''
  currentQuery            : string = '';
  visibleUsers$           : Observable<any>;
  visibleUsersSub$        : Subscription;
  userId$                 : Observable<any>;
  // userIdSub$              : Subscripton;
  // invitationStatus$     : Observable<any>;
  // invitationStatusSub$  : Subscription;
  currentUserId           : string;
  selectedUsers = {};
  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {}
  ngOnInit() {
    this.activityId = this.params.data.activityId
    // this.userStatus = this.ngRedux.select((state)=>state.getIn(['eventData', 'status']))
    this.userId$ = this.ngRedux.select((state)=>state.getIn(['currentUser', 'objectId']))
    // this.ngRedux.dispatch(inviteActions.setIdle());
    // this.invitationStatus$ = this.ngRedux.select((state)=>state.getIn(['invite', 'status']))
    this.visibleUsers$ = this.ngRedux.select(
      (state) => {
        return state
        .getIn(['users', 'items'])
        .filter(item => {
          return (this.currentQuery !== '' && (item.get('firstName') + ' ' + item.get('lastName')).indexOf(this.currentQuery.toLowerCase()) !== -1) || !!this.selectedUsers[item.get('objectId')];
          // && this.selectUsers.tem.get('objectId')
        })
        .toList()
        .toJSON()
      }
    );
    this.visibleUsersSub$ = this.visibleUsers$.subscribe(() => {

    })
    // this.invitationStatusSub$ = this.invitationStatusSub$.subscribe((status) => {
    //   // if(status === "INVITED") {
    //   //   this.nav.pop();
    //   // }
    // )
  }
  /**
   *  NAVIGATION
   **/
  goHome() {
    this.nav.setRoot(HomePage);
  }
  goSearch() {
    this.nav.setRoot(SearchPage);
  }
  goBack() {
    console.log('GoBack')
    if(this.nav.canGoBack()){
      this.nav.pop();
    } else {
      this.nav.setRoot(HomePage);
    }
  }
  /**
   * 
   a*/
  inviteToActivity(){
    if(this.activityId && Object.keys(this.selectedUsers).length){
      this.ngRedux.dispatch(eventDataActions.inviteToActivity(this.activityId, Object.keys(this.selectedUsers)));
      this.nav.pop();
    }
  }
  toggleSelect(userItem){
    console.log('toggle Select')
    if(!!this.selectedUsers[userItem['objectId']]){
      delete this.selectedUsers[userItem['objectId']]
    } else {
      this.selectedUsers[userItem['objectId']] = true;
    }
  }
  getFromInput(ev){
    console.log(ev);
    this.currentQuery = ev.target.value.trim();
    this.ngRedux.dispatch(usersActions.findUsers(this.currentQuery));
  }
  isSelected(objectId){
    return !!this.selectedUsers[objectId] ? {
      'selected-user' : true
    } : {
    };
  }
  emptySelection(){
    return Object.keys(this.selectedUsers).length == 0;
  }
}
