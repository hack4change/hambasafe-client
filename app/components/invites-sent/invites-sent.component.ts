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
import {HomePage} from '../../pages/home/HomePage';
import {SearchPage} from '../../pages/search/SearchPage';

@Component({
  templateUrl: 'build/components/invites-sent/invites-sent.html',
})
export class InvitesSentComponent {
  userId$             : Observable<any>;
  userIdSub$          : Subscription;
  activities$         : Observable<any>;
  activitiesSub$      : Subscription;
  currentUserId       : string;
  selectedActivities = [];

  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {}

  ngOnInit() {
    this.userId$ = this.ngRedux.select((state) => state.getIn(['currentUser', 'objectId']))
    this.activities$ = this.ngRedux.select((state) => {
      console.log('here');
      var invites = state.getIn(['invites', 'items']).toList().toJS();
      var activities = state.getIn(['eventData', 'items']);
      var invitedActivities = [];
      for(var i = 0; i < invites.length; i++) {
        // if(!){
        //   invitedActivities.push(activities) 
        // } else {
        //   // this.ngRedux.dispatch
        // }
        var activityToPush = activities.get(invites[i].activityPtr['objectId'])
        console.log(invites[i].activityPtr['objectId']);
        console.log(activityToPush);
        if(!!activityToPush){
          invitedActivities.push(activityToPush.toJSON());
        } else {
          //TODO: GET NEW ACTIVITY
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
    console.log('toggle Select');
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
