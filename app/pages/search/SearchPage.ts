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

  filter$                   : Observable<any>;
  activities$               : Observable<any>;
  location$                 : Observable<any>;

  filterSub$                : Subscription;
  activitiesSub$            : Subscription;
  locationSub$              : Subscription;

  typeSelected              : any;
  selectedSearch            : any;
  shownGroup                : any;
  searchDistance            : number  = 2;
  activityType              : string  = '';
  activeType                : string  = 'TIME';
  mapSearched               : boolean = false;
  coordinates               : any     = {};

  constructor(private nav: NavController, private ngRedux: NgRedux<any>, private zone: NgZone) {}

  ngOnInit() {
    this.locationConnector();
    this.activityConnector();
    this.filterConnector();
  }
  ngOnDestroy(){
    if(!!this.locationSub$){
      this.locationSub$.unsubscribe();
    }
    if(!!this.activitiesSub$){
      this.activitiesSub$.unsubscribe();
    }
    if(!!this.filterSub$){
      this.filterSub$.unsubscribe();
    }
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
      console.log('search update');
       return state.getIn(['eventData', 'items'])
       .filter((item) => {
         return (new Date(item.get('startDate').get('iso'))).getTime() > Date.now();
       })
       .filter((item) => {
         console.log(this.activityType);
         // if(this.activityType !== '' && this.activeType === 'TIME') {
         //   console.log(this.activeType);
         //   return item && item.get('eventType') ? this.activeType === item.get('eventType'): false;
         // }
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
         return distanceCalculator(
           this.coordinates.latitude,
           this.coordinates.longitude,
           item.get('startLocation').get('coordinates').get('latitude'),
           item.get('startLocation').get('coordinates').get('longitude')
         ) <= 150;
       }).toList()
       .toJS().sort(function(a, b) {
         console.log(a);
         console.log(b);
         return a.startDate.iso > b.startDate.iso;
       })
     });
    this.activitiesSub$ = this.activities$.subscribe((activity) => {
      console.log()
      this.zone.run(() => {
        if(this.activityType && activity.eventType != this.activityType){
          activity = undefined; 
        }
      })
    })  
  }

  filterConnector(){
    this.filter$ = this.ngRedux.select((state) => state.getIn(['eventData', 'visible']))
  
    this.filterSub$ = this.filter$.subscribe((filterString)=>{
      this.activityType = filterString;
    })
  }

  ngOnChanges(changes){
    console.log(changes);
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

  toggleFilter(filterString) {
    console.log('filter!!');
    console.log(filterString);
    console.log(this.activityType);
    this.ngRedux.dispatch(eventDataActions.setVisible(this.activityType));
  }
  goBack() {
    this.nav.pop();
  }
  goHome(){
    this.nav.setRoot(HomePage);
  }
}
