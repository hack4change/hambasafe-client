declare var google;
declare var uploadcare;

import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

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

  created$  : Observable<any>;
  userId$   : Observable<any>;

  createdSub$:  Subscription;
  userIdSub$:   Subscription;

  activeType: string= '';
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
  waitMins;
  geoCoder: any;
  minDate: string;
  maxDate: string;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {}

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
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
        this.nav.setRoot(ActivityDetailPage, {
          'activityId' : eventStatus.message
        })
        this.ngRedux.dispatch(eventDataActions.setIdle());
        break;
        case 'CREATING': 
          this.createModal = Loading.create({
          content: "Creating...",
          dismissOnPageChange : true,
        })

        this.nav.present(this.createModal);
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
    console.log(this.created$);
  }

  ngOnDestroy(){
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
      this.nav.present(Loading.create({
        content: 'Select an event type... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(!this.name) {
      this.nav.present(Loading.create({
        content: 'Enter a name for the event... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(!this.description) {
      this.nav.present(Loading.create({
        content: 'Enter a description... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(this.description.length < 40) {
      this.nav.present(Loading.create({
        content: '40 character minimum for the description! :-P (40-400)',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(this.description.length > 400) {
      this.nav.present(Loading.create({
        content: "Hate to be stickler, but your description's a touch long! (40-400)",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(isNaN(this.distance)) {
      this.nav.present(Loading.create({
        content: 'Enter a distance... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(this.distance < 0) {
      this.nav.present(Loading.create({
        content: "Hey, distance not displacement!",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(this.distance > 150) {
      this.nav.present( Loading.create({
        content: "The maximum distance for an event is 150Km!",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(!this.startTime) {
      this.nav.present(Loading.create({
        content: 'Tell us what time it starts... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(!this.startDate) {
      this.nav.present(Loading.create({
        content: 'Tell us what day it starts... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(!this.startLocation) {
      this.nav.present(Loading.create({
        content: 'Tell us where it starts... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(Math.abs(this.startLocation.longitude) > 90 || Math.abs(this.startLocation.longitude) > 180) {
      this.nav.present(Loading.create({
        content: 'A location on earth please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return
		}
		if(isNaN(this.waitMins)) {
      this.nav.present(Loading.create({
        content: 'Tell us how long you can wait... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(this.waitMins < 0) {
      this.nav.present(Loading.create({
         content: "It's a bit rude to leave before people arrive!",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
		}
		if(this.waitMins > 30) {
      this.nav.present(Loading.create({
        content: "You can't be waiting around that long! :O",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
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
      this.nav.present(Loading.create({
        content: "It has to start at least one hour from now! :-D",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
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
      'waitTime'      : Number(this.waitMins),
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
    this.ngRedux.dispatch(eventDataActions.createActivity(data));
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

