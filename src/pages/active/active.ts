import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';

/**
 * RxJS
 */
import {Observable, Subscription} from 'rxjs';

/*
 * Immutable
 */
import { Map } from 'immutable';

/*
 *  Pages
 */
import { MapPage } from '../map/map';


/*
 * Actions
 */
import { EventDataActions } from '../../actions/event-data.actions';
import { UserActions } from '../../actions/user.actions';

/*
  Generated class for the Active page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-active',
  templateUrl: 'active.html'
})
export class ActivePage implements OnInit, OnDestroy {
  //PARAM
  activityId    : string = null;

  users$        :  Observable<any>;
  usersSub$     :  Subscription;
  activity$     :  Observable<any> = Observable.of({});
  activitySub$  :  Subscription;
  attendees$     :  Observable<any> = Observable.of({});
  attendeesSub$  :  Subscription;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private ngRedux: NgRedux<any>,
    private userActions : UserActions,
    private eventDataActions : EventDataActions
  ) {};

  /**
   * Lifecycle hooks
   */
  ngOnInit() {
    this.activityId =  this.navParams.get('activityId');
    this.ngRedux.dispatch(this.userActions.fetchByAttendance(this.activityId))
    this.activity$ = this.ngRedux.select(['eventData', 'items', this.activityId])
    .map((activityItem : Map<string, any>) => {
      console.log('Active Item on Page');
      console.log(activityItem);
      return activityItem.toJS()
    });
    this.users$ = this.ngRedux.select(['users', 'items'])
    .map((user:Map<string, any>)=>{
      return user
      .filter((user : Map<string, any>) => {
        return !!user.get('attendance') ? user.get('attendance').includes(this.activityId): false;
      })
      .toList()
      .toJS()
    })
    this.activity$ = this.ngRedux.select(['eventData', 'items'])
    .map((item:Map<string, any>)=>{
      if(!this.activityId) {
        return;
      }
      return item
      .get(this.activityId)
      .toJS();
    });
    this.activitySub$ = this.activity$.subscribe((activityItem : any) => {
      console.log(activityItem);
    })
  }

  ngOnDestroy() {
    if(!!this.usersSub$) {
      this.usersSub$.unsubscribe();
    }
    if(!!this.activitySub$) {
      this.activitySub$.unsubscribe();
    }
  }
  ionViewDidLoad() {
    console.log('Hello ActivePage Page');
  }

  viewMap() {
    console.log()
    this.activity$.subscribe((activityItem) => {
      console.log(activityItem);
      this.navCtrl.push(MapPage, {
        lng: activityItem.startLocation.coordinates.longitude,
        lat: activityItem.startLocation.coordinates.latitude,
        infoText: activityItem.startLocation.tileWords,
      });
    })
  }

}
