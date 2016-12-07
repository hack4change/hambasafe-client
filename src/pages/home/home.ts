import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController,
  NavParams,
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

import * as moment from 'moment';

/*
 *  Pages
 */
import { CreatePage } from '../create/create';
// import { HomePage}  from '../home/home';
import { SearchPage } from '../search/search';
import { RegistrationPage } from '../registration/registration';
import { InvitesPage } from '../invites/invites';
// import { ActivityListPage } from '../activity-list/activity-list';
import { AddFriendPage } from '../add-friend/add-friend';

/*
 * Actions
 */
import { UserActions } from '../../actions/user.actions';
import { EventDataActions } from '../../actions/event-data.actions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  user$: Observable<any>;
  activities$ : Observable<any>;

  userSub$     : Subscription;
  activitiesSub$  : Subscription;

  userId : string = null;

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
        return activity['author']['objectId'] === this.userId;
      },
      'sortExpression' : (activityOne, activityTwo) => {
        return activityOne['dateTimeStart'] >= activityTwo['dateTimeStart'];
      }
    },
  ];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private ngRedux: NgRedux<any>,
    private userActions : UserActions,
    private eventDataActions: EventDataActions
  ) {}

  ngOnInit() {
    this.queryFunc = this.listTypes[this.querySelected]['filterExpression'];

    if(this.navParams.get('userId')) {
      this.userId = this.navParams.get('userId');
    }
    if(this.userId){
      this.user$ = this.ngRedux.select(['users', 'items', this.userId]).map((user: Map<string, any>) => user.toJS());
    } else {
      this.user$ = this.ngRedux.select('currentUser').map((currentUser: Map<string, any>) => currentUser.toJS());
    }
    this.ngRedux.dispatch(this.userActions.fetchUserById(this.userId));
    this.ngRedux.dispatch(this.eventDataActions.fetchByUserId(this.userId));
    
    this.activities$ = this.ngRedux.select(['eventData', 'items'])
    .map((items: Map<string, any>) => {
      console.log('PROFILE ITEMS');
      return items
      .toList()
      .toJS()
      .sort((a, b) => {
        return moment(a.startDate.iso) > moment(b.startDate.iso);
      });
    });
    this.userSub$ = this.user$.subscribe((user) => {
      if(user == undefined){

      }
      // this.userId = user['objectId'];
      this.userRating = user['rating'];
    })
  }

  ngOnDestroy() {
    console.log('Destroying Subscriptions')
    if(!!this.userSub$) {
      this.userSub$.unsubscribe();
    }
    if(!!this.activitiesSub$) {
      this.activitiesSub$.unsubscribe();
    }
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
  formatDate(date){
    return moment(date).format('DD-MMM-YYYY');
  }
}
