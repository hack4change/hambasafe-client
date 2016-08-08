import {
  forwardRef,
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
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
import { CreatePage } from '../create/CreatePage';
import {SearchPage} from '../search/SearchPage';
import {ActivityInvitePage} from '../activity-invite/ActivityInvitePage';

/*
 *  Components
 */
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';
import {UserItemComponent} from '../../components/user-item/user-item.component.ts';

@Component({
  templateUrl: 'build/pages/activity-detail/activity-detail.html',
  directives : [
    forwardRef(() => ActivityItemComponent),
    UserItemComponent,
  ],
})
export class ActivityDetailPage {
  @ViewChildren(UserItemComponent) userItemChildren:QueryList<UserItemComponent>;
  activityId: string;
  isAuthor: boolean= false;

  activity$     : Observable<any>;
  eventStatus$  : Observable<any>;
  users$        : Observable<any>;
  userId$       : Observable<any>;


  eventStatusSub$   : Subscription;
  activitySub$      : Subscription;
  usersSub$         : Subscription;
  userIdSub$        : Subscription;

  currentUserId: number;
  mustRate:  boolean = false;
  description: string;
  users = [];
  maxStars : Object = [1, 2, 3, 4, 5];
  activityRating: number = 0;
  groupRating: number = 0;

  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {
    console.log("ActivityDetailPage");
    this.activityId = this.params.data['activityId'];
    this.mustRate = this.params.data['mustRate'];
  };

  ngOnInit() {
    if(this.mustRate) {
      this.ngRedux.dispatch(usersActions.fetchByAttendance(this.activityId))
    }
    this.userId$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'objectId']));
    this.users$ = this.ngRedux.select((state) => {
      return state
      .getIn(['users', 'items'])
      .filter((user) => {
        return !!user.get('attendance') ? user.get('attendance').includes(this.activityId): false;
      })
      .toList()
      .toJS()
    }) 
    this.activity$ = this.ngRedux.select(
      state => {
        return state.getIn(['eventData', 'items'])
        .find(item => {
          console.log(item.get('objectId') === this.activityId);
          return item.get('objectId') === this.activityId;
        })
        .toJS()
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
    if(!!this.userIdSub$) {
      this.userIdSub$.unsubscribe();
    }
    if(!!this.usersSub$) {
      this.usersSub$.unsubscribe();
    }
    if(!!this.activitySub$) {
      this.activitySub$.unsubscribe();
    }
  }

  getActivityRating(index: number) {
    return index <= this.activityRating ? {
      'rated': 'true'
    } : {
    };
  } 

  getGroupRating(index: number) {
    return index <= this.groupRating ? {
      'rated': 'true'
    } : {
    };
  } 
  setGroupRating(index:number) {
    this.userItemChildren.toArray().forEach((userItem)=> {
      console.log('userItem');
      if(!userItem.hasChanged) {
        userItem.setRating(index, false);
      }
    })
    this.groupRating = index;
  }
  setActivityRating(index:number) {
    this.activityRating = index;
  }

	goHome() {
    this.nav.setRoot(HomePage);
	}

	goSearch() {
    this.nav.setRoot(SearchPage);
	}

  goBack() {
    console.log('GoBack')
    if(this.nav.canGoBack()) {
      this.nav.pop();
    } else {
      this.nav.setRoot(HomePage);
    }
  }

  rateActivity() {
    this.ngRedux.dispatch(eventDataActions.rateActivity(this.activityId, this.activityRating));
    
    this.userItemChildren.toArray().forEach((userItem)=> {
      console.log('userItem');
      this.ngRedux.dispatch(usersActions.rateUser(userItem.user.objectId, this.activityId, userItem.rating));
    })
    this.goBack();
  }
  joinActivity() {
    this.ngRedux.dispatch(eventDataActions.joinActivity(this.activityId));
    this.goBack();
  }
  
  editActivity() {
    this.nav.push(CreatePage, {
      isChange: true,
      activityId: this.activityId
    });
  }
  inviteUsers() {
    this.nav.push(ActivityInvitePage, {
      activityId : this.activityId
    });
  }
}
