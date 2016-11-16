import {
  Component,
  ViewChildren,
  QueryList,
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
import { HomePage } from '../home/home';
import { CreatePage } from '../create/create';
import { SearchPage } from '../search/search';
import { ActivityInvitePage } from '../activity-invite/activity-invite';

/*
 *  Components
 */
// import { ActivityItem } from '../../components/activity-item/activity-item';
import { UserItem } from '../../components/user-item/user-item';

/*
  Generated class for the ActivityDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity-detail.html'
})
export class ActivityDetailPage implements OnInit {
  @ViewChildren(UserItem) userItemChildren:QueryList<UserItem>;
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

  activity      : any;
  currentUserId: number;
  mustRate:  boolean = false;
  description: string;
  users = [];
  maxStars : Object = [1, 2, 3, 4, 5];
  activityRating: number = 0;
  groupRating: number = 0;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private zone: NgZone,
    private userActions : UserActions,
    private eventDataActions : EventDataActions
  ) {
    console.log("ActivityDetailPage");
  };

  ngOnInit() {
    this.activityId = this.params.data['activityId'];
    this.mustRate = this.params.data['mustRate'];
    if(this.mustRate) {
      this.ngRedux.dispatch(this.userActions.fetchByAttendance(this.activityId))
    }
    this.userId$ = this.ngRedux.select(['currentUser', 'objectId']);
    this.users$ = this.ngRedux.select(['users', 'items'])
    .map((user:Map<string, any>)=>{
      return user
      .filter((user : Map<string, any>) => {
        return !!user.get('attendance') ? user.get('attendance').includes(this.activityId): false;
      }).toList().toJS()
    })
    this.activity$ = this.ngRedux.select(['eventData', 'items'])
    .map((item:Map<string, any>)=>{
      if(!this.activityId) {
        return;
      }
      return item
      .get(this.activityId)
      .toJS();
    });
    this.userIdSub$ = this.userId$.subscribe((userId) => {
      this.currentUserId = userId;
      this.activitySub$ = this.activity$.subscribe((activity) => {
        this.zone.run(() => {
          this.activity = activity;
          if(!!activity && activity.author.objectId == this.currentUserId) {
            this.isAuthor = true;  
          }
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

  ratingRequired(){
    return !!this.mustRate ? this.mustRate.toString(): 'false';
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
    this.navCtrl.setRoot(HomePage);
	}

	goSearch() {
    this.navCtrl.setRoot(SearchPage);
	}

  goBack() {
    console.log('GoBack')
    if(this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  rateActivity() {
    this.ngRedux.dispatch(this.eventDataActions.rateActivity(this.activityId, this.activityRating));
    
    this.userItemChildren.toArray().forEach((userItem)=> {
      console.log('userItem');
      this.ngRedux.dispatch(this.userActions.rateUser(userItem.user.objectId, this.activityId, userItem.rating));
    })
    this.goBack();
  }
  joinActivity() {
    this.ngRedux.dispatch(this.eventDataActions.joinActivity(this.activityId));
    this.goBack();
  }
  
  editActivity() {
    this.navCtrl.push(CreatePage, {
      isChange: true,
      activityId: this.activityId
    });
  }
  cannotEdit() {
    return (new Date(this.activity.startDate.iso)).getTime() < Date.now();
  }
  inviteUsers() {
    this.navCtrl.push(ActivityInvitePage, {
      activityId : this.activityId
    });
  }
}
