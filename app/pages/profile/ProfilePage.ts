import {Component, OnInit} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 *  Pages
 */
import {CreatePage} from '../create/CreatePage';
import {HomePage} from '../home/HomePage';
import {SearchPage} from '../search/SearchPage';
import {ActivityListPage} from '../activity-list/ActivityListPage';

@Component({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
  currentUser$: Observable<any>;
  maxStars : Object = [1, 2, 3, 4, 5];
  userRating : number = 3;
  userActivities$ : Observable<any>;
  userActivitiesSub$ : Subscription;
  createdCount: number = 0;
  joinedCount: number = 0;
  upcomingCount: number = 0;
  listTypes : any =  [
    {
      'header' : '{ Upcoming }',
      'fetchExpression' : () => {
      },
      'filterExpression' : (activity) => {
        console.log(this);
        return activity.get('dateTimeStart') >= Date.now();
      }
    },
    {
      'header' : '{ Joined }',
      'fetchExpression' : (activity) => {
      },
      'filterExpression' : (activity) => {
        return activity.get('isAttending');
      }
    },
    {
      'header' : '{ Created }',
      'fetchExpression' : () => {
      },
      'filterExpression' : (activity) => {
        console.log(activity);
        console.log(activity.get('author').get('objectId'));
        return activity.get('author').get('objectId') === window.parseManager.getCurrentUser()['id'];
      }
    },
  ];

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {}

  ngOnInit() {
    this.currentUser$ = this.ngRedux.select((state)=> {
      return state.get('currentUser').toJS();
    });
    // userActivities$ = this.ngRedux.select((state)=> {
    //   state.getIn
    // })
  }

  ngOnDestroy() {
    console.log('Destroying Subscriptions')
    // this.userActivitiesSub$.unsubscribe();
  }
	
	goHome() {
    this.nav.setRoot(HomePage);
	}
	goSearch() {
    this.nav.setRoot(SearchPage);
	}
	goCreate() {
    this.nav.push(CreatePage);
	}
	goBack() {
		this.nav.pop();
	}
	goActivityList(index: number) {
    this.nav.push(ActivityListPage, {
      'header' : this.listTypes[index]['header'],
      'filter' : this.listTypes[index]['filterExpression'],
    });
	}

  getIsRated(starNumber: number) {
    if(starNumber <= this.userRating) {
      return 'rating-gold';
    } else {
      return 'rating-grey';
    }
  }
}
