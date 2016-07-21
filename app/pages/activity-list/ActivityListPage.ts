import {Component, OnInit, NgZone} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController, NavParams, Loading} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 *  Pages
 */
import {HomePage} from '../home/HomePage';
import {SearchPage} from '../search/SearchPage';
// import {ActivityList} from '../act'

/*
 *  Components
 */
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  templateUrl: 'build/pages/activity-list/activity-list.html',
  directives : [
    ActivityItemComponent,
  ],
  pipes : [
    AsyncPipe
  ]
})
export class ActivityListPage {
  activities$     : Observable<any>;
  activitiesSub$  : Subscription;
  listHeader      : string;
  coordinates     : Object = {};
  shouldInclude   : any;

  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) { }

  ngOnInit() {
    this.listHeader     = this.params.data['header'];
    this.shouldInclude  = this.params.data['filter'];

    navigator.geolocation.getCurrentPosition((pos) => {
      this.coordinates = pos.coords;
      this.zone.run(() => {
        this.activityConnector();
      })
    })
  }

  activityConnector() {
    this.activities$ = this.ngRedux.select((state) => {
      return state.getIn(['eventData', 'items'])
      .filter((activity) => {
        return this.shouldInclude(activity);
      })
      .toJS()
    });

    this.activitiesSub$ = this.activities$.subscribe(x => {
      this.zone.run(() => {
        console.log('Search Update');
      })
    });

  }
	
	goHome() {
    this.nav.setRoot(HomePage);
	}
	goSearch() {
    this.nav.setRoot(SearchPage);
	}
	goBack() {
		this.nav.pop();
	}

}

