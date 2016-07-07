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
import {SearchPage} from '../search/SearchPage';
 import {ActivityListPage} from '../activity-list/ActivityListPage';

@Component({
  templateUrl: 'build/pages/profile/profile.html'
})
export class ProfilePage {
  currentUser$: Observable<any>;
  maxStars : Object = [1, 2, 3, 4, 5];
  userRating : number = 3;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {}

  ngOnInit() {
    this.currentUser$ = this.ngRedux.select(state=> {
      console.log(state.get('currentUser').toJS());
      return state.get('currentUser').toJS();
    });
  }
	
	goHome() {
    this.nav.setRoot(SearchPage);
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

  getIsRated(starNumber: number) {
    console.log(starNumber);
    if(starNumber <= this.userRating) {
      return 'rating-gold';
    } else {
      return 'rating-grey';
    }
  }
}
