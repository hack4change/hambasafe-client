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
// import { ActivityListPage } from '../activity-list/activity-list';
import { AddFriendPage } from '../add-friend/add-friend';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  currentUser$: Observable<any>;
  activities$ : Observable<any>;

  currentUserSub$     : Subscription;
  activitiesSub$  : Subscription;

  currentUserId : string;

  maxStars : Object = [1, 2, 3, 4, 5];
  userRating : number = 3;
  queryFunc : Function;
  querySelected : number = 0;
  listTypes : any =  [
    {
      'header' : '{ Upcoming }',
      'filterExpression' : (activity) => {
        console.log(activity);
        console.log(activity['startDate']);
        return (new Date(activity['startDate']['iso'])).getTime() >= Date.now() && !!activity['isAttending'];
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne['dateTimeStart'] <= activityTwo['dateTimeStart'];
      }
    },
    {
      'header' : '{ Joined }',
      'fetchExpression' : (activity) => {
      },
      'filterExpression' : (activity) => {
        console.log(activity);
        return !!activity['isAttending'];
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne['dateTimeStart'] >= activityTwo['dateTimeStart'];
      }
    },
    {
      'header' : '{ Created }',
      'fetchExpression' : () => {
      },
      'filterExpression' : (activity) => {
        console.log(this);
        return activity['author']['objectId'] === this.currentUserId;
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne['dateTimeStart'] >= activityTwo['dateTimeStart'];
      }
    },
  ];

  constructor(
    private navCtrl: NavController,
    private ngRedux: NgRedux<any>
  ) {}

  ngOnInit() {
    this.queryFunc = this.listTypes[this.querySelected]['filterExpression'];
    this.currentUser$ = this.ngRedux.select('currentUser').map((currentUser: Map<string, any>) => currentUser.toJS());
    this.activities$ = this.ngRedux.select(['eventData', 'items'])
    .map((items: Map<string, any>) => {
      console.log('PROFILE ITEMS');
      console.log(items.toJS());
      return items.toList().toJS();
    });
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
    if(!!this.activitiesSub$) {
      this.activitiesSub$.unsubscribe();
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
    // this.navCtrl.push(ActivityListPage, {
    //   'header' : this.listTypes[index]['header'],
    //   'filter' : this.listTypes[index]['filterExpression'],
    // });
    this.querySelected = index;
    this.queryFunc = this.listTypes[this.querySelected]['filterExpression'];
    console.log(this.queryFunc.toString());
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
  getFilterButtonClasses(index:number) : any{
    if(this.querySelected == index) {
      return {
        'active-filter' : true,
        'square-corner' : true,
        'borderless'    : true,
      }
    }
    return {
      'inactive-filter' : true,
      'square-corner'   : true,
      'borderless'      : true,
    }
  }
}
