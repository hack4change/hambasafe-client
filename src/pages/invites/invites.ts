import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  NavController,
  NavParams,
  // Loading
}from 'ionic-angular';

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

/*
 * Actions
 */
import {
  EventDataActions
} from '../../actions/event-data.actions';
import {
  InviteActions
} from '../../actions/invite.actions';

/*
 *  Pages
 */
// import {CreatePage} from '../create/create';
import {HomePage} from '../home/home';
import { SearchPage } from '../search/search';
// import {ActivityListPage} from '../activity-list/activity-list';
// import {AddFriendPage} from '../add-friend/add-friend';

@Component({
  selector: 'page-invites',
  templateUrl: 'invites.html'
})
export class InvitesPage implements OnInit{
  userId$                 : Observable<any>;
  activityInvitesIn$      : Observable<any>;
  activityInvitesOut$     : Observable<any>;

  userIdSub$              : Subscription;
  activityInvitesInSub$   : Subscription;
  activityInvitesOutSub$  : Subscription;

  currentUserId           : string;
  selectedActivities 	= [];
	viewType					      : string= 'RECEIVED';

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private zone: NgZone,
    private eventDataActions: EventDataActions,
    private inviteActions : InviteActions,
  ) {}

  ngOnInit() {
    console.log(this.viewType);
    this.userId$ = this.ngRedux.select(['currentUser', 'objectId']);
    this.userIdSub$ = this.userId$.subscribe((storeUserId)=>this.currentUserId=storeUserId);

    this.activityInvitesIn$ = this.ngRedux.select((state) => {
      console.log('here');
      var invites = state['invites'].get('items')
      .filter((item)=>{
        console.log(item);
        return item.get('inviteePtr').get('objectId') == this.currentUserId
      })
      .toList()
      .toJS();
      var activities = state['eventData'].get('items');
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
      var invites = state['invites'].get('items').toList().toJS();
      var activities = state['eventData'].get('items');
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
    this.ngRedux.dispatch(this.inviteActions.deleteInvite(activityId));
  }

  /**
   *  NAVIGATION
   **/
  goHome() {
    this.navCtrl.setRoot(HomePage);
  }
  goSearch() {
    this.navCtrl.setRoot(SearchPage);
  }
  goBack() {
    console.log('GoBack')
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }
}
