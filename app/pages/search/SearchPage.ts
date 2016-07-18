import {Component, ViewChild, OnInit, NgZone, SimpleChange} from '@angular/core';
import {NavController} from 'ionic-angular';
const _ = require('lodash');
import distanceCalculator from '../../utils/distanceCalculator';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/**
 *  Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

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
  activities$               : Observable<any>;
  typeSelected              : any;
  selectedSearch            : any;
  shownGroup                : any;
  searchDistance            : number = 2;
  activityType              : any = '';
  activeType                : string = 'TIME';
  mapSearched               : boolean = false;
  coordinates               : any;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>, private zone: NgZone) { }

  ngOnInit() {
    var options = {timeout: 10000, enableHighAccuracy: true};
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.coordinates = pos.coords;
        if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
          if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
            this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(150, this.coordinates.longitude, this.coordinates.latitude));
          }
        }
        this.zone.run(() => {
          this.activityConnector();
        })
      },
      (err) => {
        console.log(err);
      },
      options
    )
    this.ngRedux.dispatch(eventDataActions.fetchEvents());
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
                item.get('startLocation').get('latitude'),
                item.get('startLocation').get('longitude')
              ) <= this.searchDistance;
            }
          }

          return false;
        }
        //XXX: Time sorting;
        return true;
      })
      .toJS().sort(function(a, b) {
        return a.startDate.iso > b.startDate.iso;
      })
    });

    this.activities$.subscribe(x => {
      this.zone.run(() => {
        console.log('Search Update');
      })
    });

  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}) {
    // this.activityConnector()
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
        this.ngRedux.dispatch(eventDataActions.fetchEventsByCoordinates(this.searchDistance, this.coordinates.latitude, this.coordinates.latitude));
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
