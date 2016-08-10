declare var google;
declare var uploadcare;

import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {FormBuilder, NgForm, ControlGroup, Validators} from '@angular/common';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

/*
 *  Validators
 */
import {DistanceValidator} from  '../../validators/distance';
import {WaitTimeValidator} from  '../../validators/waitTime';


/*
 *  Pages
 */
import { HomePage } from '../home/HomePage';
import { ActivityDetailPage } from '../../pages/activity-detail/ActivityDetailPage';

/*
 * Components
 */
import {MapComponent} from '../../components/map/map.component.ts';

@Component({
  templateUrl: 'build/pages/create/create.html',
  directives : [
    MapComponent,
  ]
})
export class CreatePage {
  @ViewChild('startMap') startMap;
  @ViewChild('endMap') endMap;

  created$    : Observable<any>;
  activity$   : Observable<any>;
  userId$     : Observable<any>;

  createdSub$ :  Subscription;
  activitySub$:  Subscription;
  userIdSub$  :   Subscription;

  isChange    : boolean = false;
  activityId  : string = '';

  createForm: ControlGroup;
  activeType: string = '';
  currentUserId: number;
  createModal = null; 
  isPublic : boolean = true;
  eventType;
  name;
  description
  distance
  startTime;
  startDate;
  startLocation;
  endTime;
  endDate;
  endLocation;
  intensity;
  waitTime;
  geoCoder: any;
  minDate: string;
  maxDate: string;

  constructor(private loadingCtrl : LoadingController, private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      isPublic: [
        "",
      ],
      eventType: [
        "",
      ],
      intensity: [
        "",
      ],
      name: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.required
        ]),
      ],
      description: [
        "",
        Validators.compose([
          Validators.minLength(40),
          Validators.maxLength(400),
          Validators.required
        ]),
      ],
      distance: [
        "",
        Validators.compose([
          DistanceValidator.isValid,
          Validators.required
        ]),
      ],
      startTime: [
        "",
      ],
      startDate: [
        "",
      ],
      waitTime: [
        "",
        Validators.compose([
          WaitTimeValidator.isValid,
          Validators.required
        ]),
      ],
    });
  }

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
    if(this.params && this.params.data && this.params.data.isChange){
      if( this.params.data.activityId){
        this.isChange   = this.params.data.isChange;
        this.activityId = this.params.data.activityId;
      } else {
        this.goBack();
      }
    }
    var tmpDate = new Date();
    this.minDate    = tmpDate.toISOString().split("T")[0];
    this.maxDate    = (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).toISOString().split("T")[0];
    this.startDate  = this.minDate;
    this.created$ = this.ngRedux.select(state=>{
      return {
        status: state.getIn(['eventData', 'status']),
        message: state.getIn(['eventData', 'message'])
      }
    });
    if(this.isChange && this.activityId){
      this.activity$ = this.ngRedux.select(state=>{
          return state.getIn(['eventData', 'items', this.activityId]).toJS();
      });
      this.activitySub$ = this.activity$.subscribe((activity) => {
        if(!!activity) {
          this.isPublic = activity.isPublic;
          this.eventType = activity.eventType;
          this.name = activity.name;
          this.description = activity.description;
          this.distance = activity.distance;
          var d = new Date(activity.startDate.iso);
          this.startTime = d.toLocaleTimeString();
          this.startDate = d.toISOString().split("T")[0];//d.getFullYear() + "-" + d.getMonth() + "-"+ d.getDate();
          this.startLocation = activity.startLocation.coordinates;
          this.intensity = activity.intensity;
          this.waitTime = activity.waitTime;
          console.log(this.waitTime);
        }
      });

    }
    this.userId$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'id']));

    this.createdSub$ = this.created$.subscribe(eventStatus => {

      console.log('created refresh');
      switch (eventStatus.status) {
        case 'CREATED': 
          if(this.createModal) {
          this.createModal.dismiss()
        }
        console.log(eventStatus.status);
        console.log(eventStatus.message);
        // this.nav.setRoot(HomePage);
        // this.ngRedux.dispatch(eventDataActions.joinActivity(eventStatus.message))
        this.nav.setRoot(ActivityDetailPage, {
          'activityId' : eventStatus.message
        })
        this.ngRedux.dispatch(eventDataActions.setIdle());
        break;
        case 'CREATING': 
          this.createModal = this.loadingCtrl.create({
          content: !!this.isChange ?  "Saving...": "Creating...",
          dismissOnPageChange : true,
        })

        this.createModal.present();
        break;
        case 'CREATE_ERROR': 
          if(this.createModal) {
          this.createModal.dismiss()
        }
      }
    });
    this.userIdSub$ = this.userId$.subscribe(userId => {
      this.currentUserId = userId;
    })
  }

  ngOnDestroy() {
    if(!!this.createdSub$){
      this.createdSub$.unsubscribe();
    }
    if(!!this.userIdSub$){
      this.userIdSub$.unsubscribe();
    }
  }
    

	createActivity() {
    var roundDateToISO = ":00.000Z";
    console.log(this.startTime);
    console.log(this.eventType);
		if(!this.eventType) {
      this.loadingCtrl.create({
        content: 'Select an event type... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(!this.intensity) {
      this.loadingCtrl.create({
        content: 'Select an intensity... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(!this.name) {
      this.loadingCtrl.create({
        content: 'Enter a name for the event... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(!this.description) {
      this.loadingCtrl.create({
        content: 'Enter a description... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(this.description.length < 40) {
      this.loadingCtrl.create({
        content: '40 character minimum for the description! :-P (40-400)',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(this.description.length > 400) {
      this.loadingCtrl.create({
        content: "Hate to be stickler, but your description's a touch long! (40-400)",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(isNaN(this.distance)) {
      this.loadingCtrl.create({
        content: 'Enter a distance... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(this.distance < 0) {
      this.loadingCtrl.create({
        content: "Hey, distance not displacement!",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(this.distance > 150) {
       this.loadingCtrl.create({
        content: "The maximum distance for an event is 150Km!",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(!this.startTime) {
      this.loadingCtrl.create({
        content: 'Tell us what time it starts... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(!this.startDate) {
      this.loadingCtrl.create({
        content: 'Tell us what day it starts... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(!this.startLocation) {
      this.loadingCtrl.create({
        content: 'Tell us where it starts... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(Math.abs(this.startLocation.longitude) > 90 || Math.abs(this.startLocation.longitude) > 180) {
      this.loadingCtrl.create({
        content: 'A location on earth please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return
		}
		if(isNaN(this.waitTime)) {
      this.loadingCtrl.create({
        content: 'Tell us how long you can wait... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(this.waitTime < 0) {
      this.loadingCtrl.create({
         content: "It's a bit rude to leave before people arrive!",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		if(this.waitTime > 30) {
      this.loadingCtrl.create({
        content: "You can't be waiting around that long! :O",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
		}
		// if(!this.endTime) {
		// 	return; 
		// }
		// if(!this.endDate) {
		// 	return; 
		// }
		// if(!this.endLocation) {
		// 	return; 
		// }
    var convertedDate = new Date(this.startDate  + " " + this.startTime);
    if( Date.now() >= convertedDate.getTime() - 60*60000) {
      this.loadingCtrl.create({
        content: "It has to start at least one hour from now! :-D",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }).present();
      return;
    }
    var data = {
      'name'          : this.name.trim(),
      'description'   : this.description.trim(),
      'distance'      : Number(this.distance),
      'intensity'     : this.intensity,
      'eventType'     : this.eventType,
      'startDate'     : convertedDate,
      // 'endDate'       : this.endDate  +  "T"+this.endTime + roundDateToISO,
      'waitTime'      : Number(this.waitTime),
      'isPublic'      : this.isPublic,
      'startLocation' : {
        longitude: this.startLocation.longitude,
        latitude: this.startLocation.latitude,
      },
      // 'endLocation' : {
      //   longitude: this.endLocation.lng(),
      //   latitude: this.endLocation.lat(),
      // },
    }
    if(this.isChange){
      this.ngRedux.dispatch(eventDataActions.updateActivity(this.activityId, data));
    } else {
      this.ngRedux.dispatch(eventDataActions.createActivity(data));
    }
	}
  openMap(type: string) {
    this.activeType = type;
  }
  closeMap(type: string) {
    if(type=='START_LOCATION') { 
      this.startLocation = {
        'latitude' : this.startMap.latLng.lat(),
        'longitude' : this.startMap.latLng.lng(),
      }
    } else if(type=='END_LOCATION') {
      this.endLocation = this.endMap.latLng;
    }
      this.activeType = '';
  }
  onCreation() {
  }
  goBack(){
    this.nav.pop();
  }
}

