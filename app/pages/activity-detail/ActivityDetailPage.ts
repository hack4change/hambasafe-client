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
import {usersActions}     from '../../actions/usersActions';

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
  users$: Observable<any>;
  usersSub$: Subscription;
  userId$: Observable<any>;
  userIdSub$:   Subscription;
  currentUserId: number;
  mustRate:  boolean = false;
  description: string;
  users = [];
  
  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {
    console.log("ActivityDetailPage");
    this.activityId = this.params.data['activityId'];
    console.log(this.activityId);
    console.log(this.activityId);
    this.mustRate = this.params.data['mustRate'];
  };

  ngOnInit() {
    if(this.mustRate){
      this.ngRedux.dispatch(usersActions.fetchByAttendance(this.activityId))
    }
    this.userId$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'objectId']));
    this.users$ = this.ngRedux.select((state) => {
      return state
      .getIn(['users', 'items'])
      .filter((user) => {
        return user.get('attendance').includes(this.activityId);
      })
      .toJSON()
    }) 
    this.activity$ = this.ngRedux.select(
      state => {
        return state.getIn(['eventData', 'items'])
        .find(item => {
          console.log(item.get('objectId') === this.activityId);
          return item.get('objectId') === this.activityId;
        })
        .toJSON()
      }
    ); 
    this.userIdSub$ = this.userId$.subscribe((userId) => {
      this.zone.run(() => {
        this.currentUserId = userId;
        this.activitySub$ = this.activity$.subscribe(activity => {
          this.zone.run(() => {
            if(activity.author.objectId == this.currentUserId) {
              this.isAuthor = true;  
            }
          })
        })
      })
    })

    this.usersSub$ =  this.users$.subscribe((users) => {
      console.log('ATTENDED BY USERS')
      console.log(users)
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

  rateActivity() {
    // this.ngRedux.dispatch(eventDataActions.rateActivity(this.activityId, rating));
    // this.ngRedux.dispatch(usersActions.rateUser(this.userId, rating));
    this.goBack();
  }
  joinActivity() {
    this.ngRedux.dispatch(eventDataActions.joinActivity(this.activityId));
    this.goBack();
  }
  
  inviteUsers() {
    this.nav.push(ActivityInvitePage, {
      activityId : this.activityId
    });
  }
}
