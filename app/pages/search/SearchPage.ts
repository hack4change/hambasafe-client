import {Component, ViewChild, OnInit, NgZone, SimpleChange} from '@angular/core';
import {NavController} from 'ionic-angular';
const _ = require('lodash');
import distanceCalculator from '../../utils/distanceCalculator';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/**
 *  Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';
import {usersActions} from '../../actions/usersActions';

/*
 * Pages
 */
import {HomePage} from '../home/HomePage';
import {ActivityListPage} from '../activity-list/ActivityListPage';

/*
 * Components
 */
import {MapComponent} from '../../components/map/map.component.ts';
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  templateUrl: 'build/pages/search/search.html',
  directives : [
    MapComponent,
    ActivityItemComponent,
  ]
})
export class SearchPage {
  @ViewChild('myMap') mapChild;
  activities$                  : Observable<any>;
  location$                    : Observable<any>;
  activitiesSub$               : Subscription;
  locationSub$                 : Subscription;
  typeSelected              : any;
  selectedSearch            : any;
  shownGroup                : any;
  searchDistance            : number  = 2;
  activityType              : any     = '';
  activeType                : string  = 'TIME';
  mapSearched               : boolean = false;
  coordinates               : any     = {};

  constructor(private nav: NavController, private ngRedux: NgRedux<any>, private zone: NgZone) {}

  ngOnInit() {
    this.locationConnector();
    this.activityConnector();
  }
  ngOnDestroy(){
    this.locationSub$.unsubscribe();
    // this.activitiesSub$.unsubscribe();
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
          if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
            if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
              this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(150, this.coordinates.latitude, this.coordinates.longitude));
            }
          }
        }
      }
    });

  }
  activityConnector() {
    this.activities$ = this.ngRedux.select((state) => {
       return state.getIn(['eventData', 'items'])
       .filter((item) => {
         console.log(this.activityType);
         if(this.activityType !== '' && this.activeType === 'TIME') {
           console.log(this.activeType);
           return item && item.get('eventType') ? this.activeType === item.get('eventType').get('name'): false;
         }
         //XXX: Time sorting;
         return true;
       })
       .filter((item) => {
         if(this.activeType == 'SEARCH') {
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
         }
         //XXX: Time sorting;
         return distanceCalculator(
           this.coordinates.latitude,
           this.coordinates.longitude,
           item.get('startLocation').get('coordinates').get('latitude'),
           item.get('startLocation').get('coordinates').get('longitude')
         ) <= 150;
       })
       .toJS().sort(function(a, b) {
         return a.startDate.iso > b.startDate.iso;
       })
     });
    this.activitiesSub$ = this.activities$.subscribe((x) => {
      console.log(x);
    })  
  }

  isActive(callingType) {
    return callingType === this.activeType;
  }
  toggleView(clickedType) {
    this.activeType = clickedType;
  }

  searchRadius() {
    this.activeType = 'SEARCH';
    var lat = this.mapChild.latLng.lat();
    var lng = this.mapChild.latLng.lng();
    var geoCoder = this.mapChild.geoCoder;

    this.coordinates = {
      latitude: lat,
      longitude: lng,
    }
    // if(!!lat && !!lng){
    if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
      if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
        // geoCoder.geocode({'location' : this.mapChild.latLng}, (results, status) => {
        this.ngRedux.dispatch(usersActions.setLocation(this.coordinates.longitude, this.coordinates.latitude));
        // })
      }
    }
    // }
  }

  goBack() {
    this.nav.pop();
  }
  goHome(){
    this.nav.setRoot(HomePage);
  }
}
