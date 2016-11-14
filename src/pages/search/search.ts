import {
  Component,
  ViewChild,
  OnInit,
  NgZone,
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';
const _ = require('lodash');
import distanceCalculator from '../../utils/distanceCalculator';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import { EventDataActions } from '../../actions/event-data.actions';
import { UserActions } from '../../actions/user.actions';

/*
 * Pages
 */
import { HomePage } from '../home/home';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage implements OnInit{
  @ViewChild('myMap') mapChild;

  filter$                   : Observable<any>;
  activities$               : Observable<any>;
  location$                 : Observable<any>;

  filterSub$                : Subscription;
  activitiesSub$            : Subscription;
  locationSub$              : Subscription;

  typeSelected              : any;
  searchQuery               : string;
  selectedSearch            : any;
  shownGroup                : any;
  searchDistance            : number  = 2;
  public activityType       : string  = '';
  activeType                : string  = 'TIME';
  mapSearched               : boolean = false;
  coordinates               : any     = {};

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private zone: NgZone,
    private userActions : UserActions,
    private eventDataActions : EventDataActions
  ) {}

  ngOnInit() {
    this.locationConnector();
    this.activityConnector();
    this.filterConnector();
  }

  ngOnDestroy() {
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
    this.ngRedux.dispatch(this.userActions.getLocation());
    this.location$ = this.ngRedux.select('location')
    .map((pos : any) => {
      return {
        longitude : !!pos ? pos.get('longitude') : 0,
        latitude : !!pos ? pos.get('latitude') : 0
      }
    })
    this.locationSub$ = this.location$.subscribe((pos) => {
      if(!_.isEqual(pos, this.coordinates)) {
        this.coordinates = pos;
        if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
          if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
            //SET 35KM to be default max radius around to search
            this.ngRedux.dispatch(this.eventDataActions.fetchEventsByCoordinates(35, this.coordinates.latitude, this.coordinates.longitude));
          }
        }
      }
    });

  }
  activityConnector() {
    this.activities$ = this.ngRedux
    .select(['eventData', 'items'])
    .map((items:any)=>{
      return items
      .filter((item) => {
        return (new Date(item.get('startDate').get('iso'))).getTime() > Date.now();
      })
      .filter((item:any) => {
        console.log(this.activityType);
        // if(this.activityType !== '' && this.activeType === 'TIME') {
        //   console.log(this.activeType);
        //   return item && item.get('eventType') ? this.activeType === item.get('eventType'): false;
        // }
        return true;
      })
      .filter((item:any) => {
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
      })
      .toList()
      .toJS()
      .sort(function(a, b) {
        console.log(a);
        console.log(b);
        return a.startDate.iso > b.startDate.iso;
      })
    })
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
    this.filter$ = this.ngRedux.select(['eventData', 'visible']);
  
    this.filterSub$ = this.filter$.subscribe((filterString)=>{
      this.activityType = filterString;
    })
  }

  getActivities(ev){
    console.log(ev); 
    if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
      if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
        this.ngRedux.dispatch(this.eventDataActions.fetchEventsByQuery(ev.target.value, this.coordinates.latitude, this.coordinates.longitude));
      }
    }
  }

  isActive(callingType) {
    return callingType === this.activeType;
  }

  toggleView(clickedType) {
    this.activeType = clickedType;
  }

  searchRadius() {
    console.log('searching with in radius');
    let lat = null;
    let lng = null;
    this.mapChild.getLatitude().then((res) => {
      lat = res; 
      return this.mapChild.getLongitude();
    }).then((res)=>{
      console.log(res);
      console.log(lng);
      console.log(lat);
      lng = res;
      // var geoCoder = this.mapChild.geoCoder;

      this.coordinates = {
        latitude: lat,
        longitude: lng,
      }
      // if(!!lat && !!lng){
      if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
        if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
          // geoCoder.geocode({'location' : this.mapChild.latLng}, (results, status) => {
          this.activeType = 'SEARCH';
          this.ngRedux.dispatch(this.userActions.setLocation(this.coordinates.longitude, this.coordinates.latitude));
          // })
        }
      }
      // }
    }).catch((err)=>{
      console.log('caught err');
      console.log(err);
    });
  }

  toggleFilter(filterString) {
    console.log('filter!!');
    console.log(filterString);
    console.log(this.activityType);
    this.ngRedux.dispatch(this.eventDataActions.setVisible(this.activityType));
  }
  goBack() {
    this.navCtrl.pop();
  }
  goHome(){
    this.navCtrl.setRoot(HomePage);
  }
}
