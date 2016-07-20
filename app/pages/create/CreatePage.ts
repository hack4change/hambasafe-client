declare var google;

import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

/*
 *  Pages
 */
import { HomePage } from '../home/HomePage';

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

  created$: Observable<any>;
  userId$: Observable<any>;
  activeType: string= '';
  currentUserId: number;
  createModal = null; 
  private isPublic : boolean = true;
  private eventType;
  private name;
  private description
  private distance
  private startTime;
  private startDate;
  private startLocation;
  private endTime;
  private endDate;
  private endLocation;
  private intensity;
  private waitMins;
  private geoCoder: any;
  private minDate: string;
  private maxDate: string;
  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {}

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
    var tmpDate = new Date();
    this.minDate    = tmpDate.toISOString().split("T")[0];
    this.maxDate    = (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).toISOString().split("T")[0];
    this.startDate  = this.minDate;
    this.created$ = this.ngRedux.select(state=>state.getIn(['eventData', 'status']));
    this.userId$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'id']));

    this.created$.subscribe(eventStatus => {
      switch (eventStatus) {
        case 'CREATED': 
          if(this.createModal) {
          this.createModal.dismiss()
        }
        this.nav.setRoot(HomePage);
        setTimeout(() => {
          this.ngRedux.dispatch(eventDataActions.setIdle());
        })
        break;
        case 'CREATING': 
          this.createModal = Loading.create({
          content: "Creating...",
          // spinner: 'crescent',
          dismissOnPageChange : true,
        })

        this.nav.present(this.createModal);
        break;
        case 'CREATE_ERROR': 
          if(this.createModal) {
          this.createModal.dismiss()
          //TODO: REMOVE
        }
      }
    });
    this.userId$.subscribe(userId => {
      this.currentUserId = userId;
    })
    console.log(this.created$);
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
		if(this.distance >150) {
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
		if(Math.abs(this.startLocation.longitude) > 90 ||Math.abs(this.startLocation.longitude) > 180) {
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
    if( Date.now() >= (new Date(convertedDate.getTime() - 60*60000)).getTime() ){
      this.nav.present(Loading.create({
        content: "It has to start at least one hour from now! :-D",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    }
    var data = {
      'name'          : this.name,
      'description'   : this.description,
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
    if(type=='START_LOCATION'){
      this.startLocation = {
        'latitude' : this.startMap.latLng.lat(),
        'longitude' : this.startMap.latLng.lng(),
      }
    } else if(type=='END_LOCATION'){
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

//  private eventService:EventService
//  shownGroup = null;
//  options = {};
//  eventData;
//  import {EventService} from "./EventService";
//  searchEvents  () {





    
  // }
//eventType = ["Walk", "Run", "Cycle"]; 
//  typeSelected = this.eventType[0];
  

//  toggleGroup = function (group) {
//    if (this.isGroupShown(group)) {
//      this.shownGroup = null;
//    } else {
//      this.shownGroup = group;
//    }
//  };

//  toggleSelection = function (selected, group) {
//    this.typeSelected = selected;
//    this.toggleGroup(group);


//  $scope.toggleSelection = function (selected, group) {
//    $scope.typeSelected = selected;
//    $scope.toggleGroup(group);
//  };

//  isGroupShown = function (type, group) {
//    return this.shownGroup === group && this.typeSelected !== type;
//  };

//  isShown = function (type, group) {
//    return this.shownGroup === group && this.typeSelected !== type;
//  };
//  details;
//  result;

//  create() {
//    console.log(this.details);
//    console.log(this.result);
//    this.generateLocationFromAutoComplete(this.details);
//  }

 
//  generateLocationFromAutoComplete(details) {
//    var location: any = {};
//    location.Address = details.formatted_address;
//    location.Suburb = this.extractSuburb(details.address_components);
//    location.City = this.extractCity(details.address_components);
//    location.Province = this.extractProvince(details.address_components);
//    location.Country = this.extractCountry(details.address_components);
//    location.Latitude = details.geometry.location.lat();
//    location.Longtitude = details.geometry.location.lng();
//    console.log(location);
//    return location;


//  }

//   extractSuburb(results) {
//    var suburbResults;
//    suburbResults = this.findType('sublocality_level_2', results);
//    if (suburbResults && suburbResults.length && suburbResults.length > 0)
//      return suburbResults[0].long_name;

//    suburbResults = this.findType('sublocality_level_1', results);
//    if (suburbResults && suburbResults.length && suburbResults.length > 0)
//      return suburbResults[0].long_name;

//    suburbResults = this.findType('sublocality', results);
//    if (suburbResults && suburbResults.length && suburbResults.length > 0)
//      return suburbResults[0].long_name;

//    return null;
//  }

//   extractCity(results) {
//    var suburbResults;
//    suburbResults = this.findType('locality', results);
//    if (suburbResults && suburbResults.length > 0)
//      return suburbResults[0].long_name;

//    return null;
//  }

//   extractProvince(results) {
//    var suburbResults;
//    suburbResults = this.findType('administrative_area_level_1', results);
//    if (suburbResults && suburbResults.length && suburbResults.length > 0)
//      return suburbResults[0].long_name;

//    return null;
//  }

//   extractCountry(results) {
//    var suburbResults;
//    suburbResults = this.findType('country', results);
//    if (suburbResults && suburbResults.length && suburbResults.length > 0)
//      return suburbResults[0].long_name;

//    return null;
//  }

//   findType(type, addressComponents) {
//    var results = [];

//    if(!addressComponents) {
//      return results;
//    }

//    var i = 0;
//    for (i = 0; i < addressComponents.length; i++) {
//      var addressComponent = addressComponents[i];
//      if (addressComponent != null && addressComponent.types != null) {
//        var j = 0;
//        for (j = 0; j < addressComponent.types.length; j++) {
//          var localType = addressComponent.types[j];
//          console.log("local type: " + localType + " - " + addressComponent.long_name);
//          if (type == localType) {
//            results.push(addressComponent);
//          }
//        }
//      }
//    }
//    return results;
//  }
