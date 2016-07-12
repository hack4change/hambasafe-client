import {Component, OnInit, NgZone} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController} from 'ionic-angular';
const _ = require('lodash');
import distanceCalculator from '../../utils/distanceCalculator';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

/**
 *  Redux
 */
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';


/*
 *  Pages
 */
import {TermsPage} from '../terms/TermsPage';
import {CreatePage} from '../create/CreatePage';
import {SearchPage} from '../search/SearchPage';

/*
 *  Components
 */
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  templateUrl : 'build/pages/home/home.html',
  directives : [
    ActivityItemComponent,
  ],
  pipes : [
    AsyncPipe
  ]
})
export class HomePage {
  isFiltered: string = 'public';
  activities$: Observable<any>;
  isEmpty: any = 'true';
  sliderDistance: number = 2;
  greatestDistance: number = 2;
  coordinates: any;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>, private zone: NgZone) { }
   
  ngOnInit(){
    let options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
      function(res){console.log(res)},
      function(err){console.log(err)},
      options
    );

  }

  isActive(filterBy) {
    return this.isFiltered === filterBy;
  }

  toggleView(newFilter) {
    this.isFiltered = newFilter;
  }

  sliderChange() {
    if(this.sliderDistance > this.greatestDistance && this.coordinates) {
      this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(this.sliderDistance, this.coordinates.latitude, this.coordinates.longitude));
      this.greatestDistance = this.sliderDistance;
    }
  }

  checkEmpty() {
    return this.isEmpty.toString();
  }

  goToCreate() {
    this.nav.push(CreatePage);
  }

  loadSearch() {
    console.log('goSearch');
    this.nav.setRoot(SearchPage);
  }
}
