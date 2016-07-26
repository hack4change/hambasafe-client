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

/*
 *  Pages
 */
import { HomePage } from '../home/HomePage';
import {SearchPage} from '../search/SearchPage';
import {ActivityInvitePage} from '../activity-invite/ActivityInvitePage';

/*
 *  Components
 */
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  templateUrl: 'build/pages/activity-detail/activity-detail.html',
  directives : [
    forwardRef(() => ActivityItemComponent),
  ],
})
export class ActivityDetailPage {
  activityId: string;
  isAuthor: boolean= false;
  activity$: Observable<any>;
  activitySub$: Subscription;
  eventStatus$ : Observable<any>;
  eventStatusSub$ : Subscription;
  userId$: Observable<any>;
  userIdSub$:   Subscription;
  currentUserId: number;
 
  description: string;
  
  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {
    console.log("ActivityDetailPage");
    this.activityId = this.params.data['activityId'];
    console.log(this.activityId);
    this.ngRedux.dispatch(eventDataActions.joinActivity(this.activityId));
  };

  ngOnInit() {
    this.userId$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'objectId']));
    this.activity$ = this.ngRedux.select(
      state => 
        state.getIn(['eventData', 'items'])
        .find(item => {
          console.log(item.get('objectId') === this.activityId);
          return item.get('objectId') === this.activityId;
        })
        .toJS()
    );
    this.userIdSub$ = this.userId$.subscribe(userId => {
      this.zone.run(() => {
        this.currentUserId = userId;
        this.activitySub$ = this.activity$.subscribe(activity => {
          this.zone.run(() => {
            console.log('Activitiy Subscription');
            console.log(activity);
            if(activity.author.objectId == this.currentUserId){
              this.isAuthor = true;  
            }
          })
        })
      })
    })
  }

  ngOnDestroy() {
    this.userIdSub$.unsubscribe();
    this.activitySub$.unsubscribe();
  }

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

  joinActivity() {
    this.ngRedux.dispatch(eventDataActions.joinActivity(this.activityId));
  }
  
  inviteUsers() {
    this.nav.push(ActivityInvitePage, {
      activityId : this.activityId
    });
  }
}
