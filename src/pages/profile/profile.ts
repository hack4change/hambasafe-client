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
        return activity.get('dateTimeStart') >= Date.now();
      }
    },
    {
      'header' : '{ Joined }',
      'fetchExpression' : (activity) => {
      },
      'filterExpression' : (activity) => {
        return !!activity.get('isAttending') ? true : false;
      }
    },
    {
      'header' : '{ Created }',
      'fetchExpression' : () => {
      },
      'filterExpression' : (activity) => {
        // return activity.get('author').get('objectId') === .parseManager.getCurrentUser()['id'];
        return true
      }
    },
  ];

  constructor(
    private navCtrl: NavController,
    private ngRedux: NgRedux<any>
  ) {}

  ngOnInit() {
    this.currentUser$ = this.ngRedux.select('currentUser');
  }

  ngOnDestroy() {
    console.log('Destroying Subscriptions')
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
    this.navCtrl.push(InvitesPage, {});
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
