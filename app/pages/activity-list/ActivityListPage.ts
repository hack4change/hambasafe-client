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
// import {ActivityList} from '../act'

@Component({
  templateUrl: 'build/pages/activity-list/activity-list.html'
})
export class ActivityListPage {
  currentUser$: Observable<any>;
  maxStars : Object = [1, 2, 3, 4, 5];
  userRating : number = 3;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {}

  ngOnInit() {
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

}

