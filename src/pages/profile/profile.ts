import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController,
  // Loading
} from 'ionic-angular';

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
 *  Pages
 */
import { CreatePage } from '../create/create';
import { HomePage}  from '../home/home';
import { SearchPage } from '../search/search';
import { RegistrationPage } from '../registration/registration';
import { InvitesPage } from '../invites/invites';
import { ActivityListPage } from '../activity-list/activity-list';
import { AddFriendPage } from '../add-friend/add-friend';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  currentUser$: Observable<any>;
  userActivities$ : Observable<any>;

  currentUserSub$     : Subscription;
  userActivitiesSub$  : Subscription;

  currentUserId : string;

  maxStars : Object = [1, 2, 3, 4, 5];
  userRating : number = 3;
  createdCount: number = 0;
  joinedCount: number = 0;
  upcomingCount: number = 0;
  listTypes : any =  [
    {
      'header' : '{ Upcoming }',
      'fetchExpression' : () => {
      },
      'filterExpression' : (activity) => {
        console.log(activity.get('dateTimeStart'));
        return (new Date(activity.get('startDate').get('iso'))).getTime() >= Date.now() && !!activity.get('isAttending');
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne.get('dateTimeStart') <= activityTwo.get('dateTimeStart');
      }
    },
    {
      'header' : '{ Joined }',
      'fetchExpression' : (activity) => {
      },
      'filterExpression' : (activity) => {
        return !!activity.get('isAttending');
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne.get('dateTimeStart') >= activityTwo.get('dateTimeStart');
      }
    },
    {
      'header' : '{ Created }',
      'fetchExpression' : () => {
      },
      'filterExpression' : (activity) => {
        console.log(this);
        return activity.get('author').get('objectId') === this.currentUserId;
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne.get('dateTimeStart') >= activityTwo.get('dateTimeStart');
      }
    },
  ];

  constructor(
    private navCtrl: NavController,
    private ngRedux: NgRedux<any>
  ) {}

  ngOnInit() {
    this.currentUser$ = this.ngRedux.select('currentUser').map((currentUser: Map<string, any>) => currentUser.toJS());
    this.currentUserSub$ = this.currentUser$.subscribe((currentUser) => {
      this.currentUserId = currentUser['objectId'];
      this.userRating = currentUser['rating'];
    })
  }

  ngOnDestroy() {
    console.log('Destroying Subscriptions')
    if(!!this.currentUserSub$) {
      this.currentUserSub$.unsubscribe();
    }
  }
	
	goHome() {
    this.navCtrl.setRoot(HomePage);
	}

	goSearch() {
    this.navCtrl.setRoot(SearchPage);
	}

	goCreate() {
    this.navCtrl.push(CreatePage);
	}

	goInvites() {
    this.navCtrl.push(InvitesPage);
	}

	goActivityList(index: number) {
    this.navCtrl.push(ActivityListPage, {
      'header' : this.listTypes[index]['header'],
      'filter' : this.listTypes[index]['filterExpression'],
    });
	}

  goBack() {
    console.log('GoBack')
    if(this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  goEditProfile() {
    this.navCtrl.setRoot(RegistrationPage, {
      'edit': true
    }) 
  }

  getIsRated(starNumber: number) {
    if(starNumber <= this.userRating) {
      return 'rating-gold';
    } else {
      return 'rating-grey';
    }
  }
  addFriend(){
    this.navCtrl.push(AddFriendPage, {});
  }
}
