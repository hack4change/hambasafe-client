import {
  Component,
  OnInit,
  NgZone,
} from '@angular/core';
// import {AsyncPipe} from '@angular/common';
import {
  NavController,
  NavParams
} from 'ionic-angular';
// const _ = require('lodash');

/**
 *  Redux
 */
import {
  NgRedux
} from 'ng2-redux';
import {
  Observable,
  Subscription
} from 'rxjs';
import {
  Map
} from 'immutable';

/*
 * Actions
 */
import {EventDataActions} from '../../actions/event-data.actions';
import {UserActions} from '../../actions/user.actions';

/*
 *  Pages
 */
import {HomePage} from '../home/home';
import { SearchPage } from '../search/search';

/*
  Generated class for the ActivityInvite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity-invite',
  templateUrl: 'activity-invite.html'
})
export class ActivityInvitePage implements OnInit {

  activityId              : string = ''
  currentQuery            : string = '';

  visibleUsers$           : Observable<any>;
  userId$                 : Observable<any>;

  visibleUsersSub$        : Subscription;
  userIdSub$              : Subscription;

  // invitationStatus$     : Observable<any>;
  // invitationStatusSub$  : Subscription;
  currentUserId           : string;
  selectedUsers = {};
  constructor(
    private nav: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private zone: NgZone,
    private userActions : UserActions,
    private eventDataActions : EventDataActions
  ) {}
  ngOnInit() {
    this.activityId = this.params.data.activityId
    // this.userStatus = this.ngRedux.select((state)=>state.getIn(['eventData', 'status']))
    this.userId$ = this.ngRedux.select(['currentUser', 'objectId'])
    // this.ngRedux.dispatch(inviteActions.setIdle());
    // this.invitationStatus$ = this.ngRedux.select((state)=>state.getIn(['invite', 'status']))
    this.visibleUsers$ = this.ngRedux.select(['users', 'items'])
    .map((item: Map<string, any>) => {
      return item
      .filter((item: Map<string, any>) => {
        console.log(item);
        if(!this.currentQuery){
          return true;
        }
        return (this.currentQuery !== '' && (item.get('firstName') + ' ' + item.get('lastName')).indexOf(this.currentQuery.toLowerCase()) !== -1) || !!this.selectedUsers[item.get('objectId')];
        // && this.selectUsers.tem.get('objectId')
      })
      .toList()
      .toJS()
    })
    this.visibleUsersSub$ = this.visibleUsers$.subscribe(() => {

    })
    // this.invitationStatusSub$ = this.invitationStatusSub$.subscribe((status) => {
    //   // if(status === "INVITED") {
    //   //   this.nav.pop();
    //   // }
    // )
  }

  ngOnDestroy() {
    if(!!this.visibleUsersSub$) {
      this.visibleUsersSub$.unsubscribe();
    }
    if(!!this.userIdSub$) {
      this.userIdSub$.unsubscribe();
    }
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
   * View Actions
   */
  inviteToActivity(){
    if(this.activityId && Object.keys(this.selectedUsers).length){
      this.ngRedux.dispatch(this.eventDataActions.inviteToActivity(this.activityId, Object.keys(this.selectedUsers)));
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
    this.ngRedux.dispatch(this.userActions.findUsers(this.currentQuery));
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
