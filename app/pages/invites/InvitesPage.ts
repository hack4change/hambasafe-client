import {Component, OnInit, NgZone} from '@angular/core';
import {NavController, NavParams, Loading} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';
import {inviteActions} from '../../actions/inviteActions';

/*
 *  Pages
 */
import {CreatePage} from '../create/CreatePage';
import {HomePage} from '../home/HomePage';
import {SearchPage} from '../search/SearchPage';
import {ActivityListPage} from '../activity-list/ActivityListPage';
import {AddFriendPage} from '../add-friend/AddFriendPage';

/*
 *  Components
 */
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  templateUrl: 'build/pages/invites/invites.html',
  directives : [
    ActivityItemComponent,
  ]
})
export class InvitesPage {

  userId$                 : Observable<any>;
  activityInvitesIn$      : Observable<any>;
  activityInvitesOut$     : Observable<any>;

  userIdSub$              : Subscription;
  activityInvitesInSub$   : Subscription;
  activityInvitesOutSub$  : Subscription;

  currentUserId           : string;
  selectedActivities 	= [];
	viewType					      : string= 'RECEIVED';

  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {}

  ngOnInit() {
    console.log(this.viewType);
    this.userId$ = this.ngRedux.select((state) => state.getIn(['currentUser', 'objectId']))
    this.userIdSub$ = this.userId$.subscribe((storeUserId)=>this.currentUserId=storeUserId);

    this.activityInvitesIn$ = this.ngRedux.select((state) => {
      console.log('here');
      var invites = state.getIn(['invites', 'items'])
      .filter((item)=>{
        console.log(item);
        return item.get('inviteePtr').get('objectId') == this.currentUserId
      })
      .toList()
      .toJS();
      var activities = state.getIn(['eventData', 'items']);
      var invitedActivities = [];
      for(var i = 0; i < invites.length; i++) {
        var activityToPush = activities.get(invites[i].activityPtr['objectId'])
        console.log(invites[i].activityPtr['objectId']);
        console.log(activityToPush);
        if(!!activityToPush) {
          invitedActivities.push(activityToPush.toJSON());
        }
      }
      return invitedActivities;
      // return invites;
    })
    this.activityInvitesOut$ = this.ngRedux.select((state) => {
      console.log('here');
      var invites = state.getIn(['invites', 'items']).toList().toJS();
      var activities = state.getIn(['eventData', 'items']);
      var invitedActivities = [];
      for(var i = 0; i < invites.length; i++) {
        var activityToPush = activities.get(invites[i].activityPtr['objectId'])
        // console.log(invites[i].activityPtr['objectId']);
        // console.log(activityToPush);
        if(!!activityToPush){
          invitedActivities.push(activityToPush.toJSON());
        } else {
          //TODO: Dispatch GET ACTIVITY
        }
      }
      return invitedActivities;
    })
    this.activityInvitesInSub$ = this.activityInvitesIn$.subscribe((invitedActivities) => {
      console.log(invitedActivities);
    })
    this.activityInvitesOutSub$ = this.activityInvitesOut$.subscribe((invitedActivities) => {
      console.log(invitedActivities);
    })
  } 

  ngOnDestroy() {
    if(!!this.userIdSub$) {
      this.userIdSub$.unsubscribe();
    }
    if(!!this.activityInvitesInSub$) {
      this.activityInvitesInSub$.unsubscribe();
    }
    if(!!this.activityInvitesOutSub$) {
      this.activityInvitesOutSub$.unsubscribe();
    }
  }

  toggleSelect(userItem){
    console.log('toggle Select')
    if(!!this.selectedActivities[userItem['objectId']]){
      delete this.selectedActivities[userItem['objectId']]
    } else {
      this.selectedActivities[userItem['objectId']] = true;
    }
  }
  isSelected(objectId){
    return !!this.selectedActivities[objectId] ? {
      'selected-user' : true
    } : {
    };
  }
  emptySelection(){
    return Object.keys(this.selectedActivities).length == 0;
  }

  deleteInvite(activityId:string){
    console.log('delete Triggered');
    this.ngRedux.dispatch(inviteActions.deleteInvite(activityId));
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
}
