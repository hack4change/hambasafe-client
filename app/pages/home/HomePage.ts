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
   
  ngOnInit() {
    var options = { timeout: 10000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.coordinates = pos.coords;
        this.zone.run(() => {
          this.activities$ = this.ngRedux.select(
            state => {
              return state.getIn(['eventData', 'items'])
              .filter((item) => {
                return distanceCalculator(
                  this.coordinates.latitude,
                  this.coordinates.longitude,
                  item.get('startLocation').get('latitude'),
                  item.get('startLocation').get('longitude')
                ) <= this.sliderDistance;
              })
              .toJS()
            }
          );
          this.activities$.subscribe(x => {
            this.zone.run(() => {
              this.isEmpty = !!x ? ( x.length == 0 ).toString() : 'true';
            })
          });
          if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
            this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(this.sliderDistance, this.coordinates.latitude, this.coordinates.longitude));
          }
        })
      },
      (err) => {
        console.log(err)
      },
      options
    )
  }

  isActive(filterBy) {
    return this.isFiltered === filterBy;
  }

  toggleView(newFilter) {
    this.isFiltered = newFilter;
  }

  sliderChange() {
    // if(this.sliderDistance > this.greatestDistance && this.coordinates) {
    if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude){
      this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(this.sliderDistance, this.coordinates.latitude, this.coordinates.longitude));
      this.greatestDistance = this.sliderDistance;
    }
    // }
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
