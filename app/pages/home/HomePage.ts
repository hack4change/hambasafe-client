import {Component, OnInit, NgZone} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController} from 'ionic-angular';
const _ = require('lodash');
import distanceCalculator from '../../utils/distanceCalculator';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';
import {usersActions} from '../../actions/usersActions';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

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
  activities$                  : Observable<any>;
  activitiesToRate$            : Observable<any>;
  location$                    : Observable<any>;

  activitiesSub$               : Subscription;
  activitiesToRateSub$         : Subscription;
  locationSub$                 : Subscription;

  isFiltered: string = 'public';
  isEmpty: any = 'true';
  searchDistance: number = 2;
  greatestDistance: number = 2;
  coordinates: any;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>, private zone: NgZone) { }
   
  ngOnInit() {
    this.ngRedux.dispatch(usersActions.getLocation());
    this.locationConnector();
    this.activityConnector();
  }

  ngOnDestroy() {
    console.log('Destroying Subscriptions')
    this.locationSub$.unsubscribe();
    this.activitiesSub$.unsubscribe();
  }

  locationConnector() {
    this.location$ = this.ngRedux.select((state) => {
      var pos = state.getIn(['currentUser', 'location']);
      return {
        longitude : pos.get('longitude'),
        latitude : pos.get('latitude')
      }
    })
    this.locationSub$ = this.location$.subscribe((pos) => {
      if(pos.longitude === null || pos.latitude === null) {
        this.ngRedux.dispatch(usersActions.getLocation());
      } else {
        if(!_.isEqual(pos, this.coordinates)) {
          this.coordinates = pos;
          console.log('location update');
          if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
            if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
              console.log('activity update')
              this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(this.searchDistance, this.coordinates.latitude, this.coordinates.longitude));
            }
          }
        }
      }
    });
  }
  activityConnector() {
    this.activities$ = this.ngRedux.select((state) => {
      console.log('activity update');
      return state.getIn(['eventData', 'items'])
      .filter((item)=> {
        if((new Date(item.get('startDate').get('iso'))).getTime() <= Date.now()){
          return false
        };
        console.log(item);
        if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
          if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180) {
            return distanceCalculator(
              this.coordinates.latitude,
              this.coordinates.longitude,
              item.get('startLocation').get('coordinates').get('latitude'),
              item.get('startLocation').get('coordinates').get('longitude')
            ) <= this.searchDistance;
          }
        }
        return false;
      })
      .toList()
      .toJS()
      .sort(function(a, b) {
        return a.startDate.iso > b.startDate.iso;
      })
    });
    this.activitiesToRate$ =  this.ngRedux.select((state) => {
      console.log('activity update');
      return state.getIn(['eventData', 'items'])
      .filter((item) => {
        if((new Date(item.get('startDate').get('iso'))).getTime() > Date.now()){
          return false
        };
        return item.get('isAttending');
      })
      .toList()
      .toJS().sort(function(a, b) {
        return a.startDate.iso > b.startDate.iso;
      })
    });
    this.activitiesSub$ = this.activities$.subscribe((x) => {
      console.log(x);
      this.zone.run(() => {
        console.log('isEmpty');
        console.log(x.length == 0);
        this.isEmpty = (x.length == 0).toString();
      })
    });
    this.activitiesToRateSub$ = this.activitiesToRate$.subscribe((activity)=> {
      console.log(activity);
    
    });
  }

  isActive(filterBy) {
    return this.isFiltered === filterBy;
  }

  toggleView(newFilter) {
    this.isFiltered = newFilter;
  }

  sliderChange() {
    console.log('sliderUpdate');
    // if(this.searchDistance > this.greatestDistance && this.coordinates) {
      if (!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
        if (Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180) {
          this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(this.searchDistance, this.coordinates.latitude, this.coordinates.longitude));
          this.greatestDistance = this.searchDistance;
        }
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
