import {
  Component,
  ViewChild,
  OnInit,
  NgZone,
} from '@angular/core';
import {
  NavController,
  NavParams,
	Platform,
  LoadingController, 
  Events,
} from 'ionic-angular';
const _ = require('lodash');
import * as moment from 'moment';
import distanceCalculator from '../../utils/distanceCalculator';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';

/**
 * RxJS
 */
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

  public loadingItem;

  public filter$                  : Observable<any>;
  public activities$              : Observable<any>;
  public location$                : Observable<any>;

  public filterSub$               : Subscription;
  public activitiesSub$           : Subscription;
  public locationSub$             : Subscription;

  public typeSelected             : any;
  public searchQuery              : string;
  public selectedSearch           : any;
  public shownGroup               : any;
  public searchDistance           : number  = 2;
  public activityType             : string  = '';
  public activeType               : string  = 'DISTANCE';
  public mapSearched              : boolean = false;
  public coordinates              : any     = {};
	public isDevice						      : boolean = false;
  public greatestDistance         : number = 2;


  public locationCount = 0;
  public activityCount = 0;
  public filterCount = 0;

  constructor(
    private navCtrl           : NavController,
    private params            : NavParams,
    private platform          : Platform,
    private events            : Events,
    private ngRedux           : NgRedux<any>,
    private zone              : NgZone,
    private userActions       : UserActions,
    private eventDataActions  : EventDataActions,
    public loadingCtrl        : LoadingController
  ) {
    console.log('SEARCH PAGE OPENING');
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
		this.isDevice = this.platform.is('cordova') && !this.platform.is('browser');
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
    this.location$ = this.ngRedux.select(['currentUser', 'location'])
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
    .map((items:any) => {
      console.log(items.toJS());
      return items
      .filter((item) => {
        return !item.isAttending;
      })
      .filter((item) => {
        return moment(item.get('startDate').get('iso')) > moment().add('days', '2'); //TODO: Modify for time considered active;
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
      .sort((a, b) => {
        console.log(moment(a.getIn(['startDate','iso'])) > moment(b.getIn(['startDate','iso'])));
        return moment(a.getIn(['startDate','iso'])) > moment(b.getIn(['startDate','iso']));
      })
      .toJS();
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

  getActivities(ev) {
    console.log(ev); 
		this.searchQuery = ev.target.value;
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
    console.log('toggleView');
    this.activeType = clickedType;
  }

  sliderChange() {
    console.log('sliderUpdate');
    // if(this.searchDistance > this.greatestDistance && this.coordinates) {
      if (!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
        if (Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180) {
          this.ngRedux.dispatch(this.eventDataActions.fetchEventsByCoordinates(this.searchDistance, this.coordinates.latitude, this.coordinates.longitude));
          this.greatestDistance = this.searchDistance;
        }
      }
    // }
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
    this.loadingItem = this.loadingCtrl.create({
      content: '',
      dismissOnPageChange: true,
    })
    this.loadingItem.present();
    this.navCtrl.setRoot(HomePage);
  }
  menuOpened(){
    this.events.publish('menu:opened',  {});
  }
}
