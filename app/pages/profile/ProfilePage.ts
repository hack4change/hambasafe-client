import {Component, OnInit} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

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
  listTypes : any =  [
    {
      'header' : '{ Upcoming }',
      'filterExpression' : (activity) => {
        console.log(this);
        return activity.get('dateTimeStart') >= Date.now();
      }
    },
    {
      'header' : '{ Joined }',
      'filterExpression' : (activity) => {
        return activity.get('attendees').includes(this.currentUser$['id']);
      }
    },
    {
      'header' : '{ Created }',
      'filterExpression' : (activity) => {
        return activity.get('ownerUser').get('id') === this.currentUser$['id'];
      }
    },
  ];

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {}

  ngOnInit() {
    this.currentUser$ = this.ngRedux.select((state)=> {
      return state.get('currentUser').toJS();
    });
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
    console.log('loading ActivityListPage')
    this.nav.push(ActivityListPage, {
      'header' : this.listTypes[index]['header'],
      'filter' : this.listTypes[index]['filterExpression'],
    });
	}

  getIsRated(starNumber: number) {
    console.log(starNumber);
    if(starNumber <= this.userRating) {
      return 'rating-gold';
    } else {
      return 'rating-grey';
    }
  }
}
