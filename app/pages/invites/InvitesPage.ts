import {Component, OnInit, NgZone} from '@angular/core';
import {NavController, NavParams, Loading} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

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
import {InvitesReceivedComponent} from '../../components/invites-received/invites-received.component.ts';
import {InvitesSentComponent} from '../../components/invites-sent/invites-sent.component.ts';

@Component({
  templateUrl: 'build/pages/invites/invites.html',
  directives : [
    ActivityItemComponent,
  ]
})
export class InvitesPage {
  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {}
  userId$             : Observable<any>;
  userIdSub$          : Subscription;
  activities$         : Observable<any>;
  activitiesSub$      : Subscription;
  currentUserId       : string;
  selectedActivities 	= [];
	viewType					  : string= 'RECEIVED';

  ngOnInit() {
    console.log(this.viewType);
    this.userId$ = this.ngRedux.select((state) => state.getIn(['currentUser', 'objectId']))
    this.activities$ = this.ngRedux.select((state) => {
      console.log('here');
      var invites = state.getIn(['invites', 'items']).toList().toJS();
      var activities = state.getIn(['eventData', 'items']);
      var invitedActivities = [];
      for(var i = 0; i < invites.length; i++) {
        var activityToPush = activities.get(invites[i].activityPtr['objectId'])
        console.log(invites[i].activityPtr['objectId']);
        console.log(activityToPush);
        if(!!activityToPush){
          invitedActivities.push(activityToPush.toJSON());
        } else {
          //TODO: Dispatch GET ACTIVITY
        }
      }
      return invitedActivities;
    })
    this.userIdSub$ = this.userId$.subscribe((storeUserId)=>this.currentUserId=storeUserId);
    this.activitiesSub$ = this.activities$.subscribe((invitedActivities) => {
      console.log(invitedActivities);
    })
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
