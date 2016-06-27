import {Component, OnInit} from '@angular/core';
import {NavController, Loading} from 'ionic-angular';
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

/*
 *  Pages
 */
import { HomePage } from '../home/HomePage';

@Component({
  templateUrl: 'build/pages/create/create.html'
})
export class CreatePage {
  created$: Observable<any>;
  createModal = null; 
  eventType;
  name;
  description
  startTime;
  startDate;
  startLocation;
  endTime;
  endDate;
  endLocation;
  waitMins;
  constructor(private nav: NavController, private ngRedux: NgRedux<any>) { }

  ngOnInit(){
  
    this.created$ = this.ngRedux.select(state=>state.getIn(['eventData', 'status']));

    this.created$.subscribe(eventStatus => {
      console.log(eventStatus)
      switch (eventStatus) {
        case 'created': 
          if(this.createModal) {
          this.createModal.dismiss()
        }
        this.nav.setRoot(HomePage);
        break;
        case 'creating': 
          this.createModal = Loading.create({
          content: "Creating...",
          spinner: 'crescent',
          dismissOnPageChange : true,
        })
        this.nav.present(this.createModal);
        break;
        case 'error': 
          if(this.createModal) {
          this.createModal.dismiss()
          //TODO: REMOVE
        }
      }
    });
    console.log(this.created$);
  }
    

	createEvent() {
    var roundDateToISO = ":00.000Z";
    console.log(this.startTime);
    console.log(this.waitMins);
		if(!this.eventType) {
			return; 
		}
		if(!this.name) {
			return; 
		}
		if(!this.description) {
			return; 
		}
		if(!this.startTime) {
			return; 
		}
		if(!this.startDate) {
			return; 
		}
		if(!this.startLocation) {
			return; 
		}
		if(!this.endTime) {
			return; 
		}
		if(!this.endDate) {
			return; 
		}
		if(!this.endLocation) {
			return; 
		}
		if(!this.waitMins) {
			return; 
		}
		var data = {
			'Name'          : this.name,
			'Description'   : this.description,
			'EventType'     : {
				'Name'          : this.eventType,
			},
			'DateTimeStart' : this.startDate+"T"+this.startTime + roundDateToISO,
      'DateTimeEnd'   : this.endDate+"T"+this.endTime +  roundDateToISO,
      'StartLocation' : {
        'Country'  : 'Cape Town',//(string, optional),
        'Province' : 'Western Cape', //(string, optional),
        'Suburb' : 'Rondebosch', //(string, optional),
        'PostCode' : '8000', //(string, optional),
        'Address' : '3 Some Avenue', //(string, optional),
        'Latitude' : '99', //(number, optional),
        'Longitude' : '-99', 
      },
      'EndLocation' : {
        'Country'  : 'Cape Town',         //(string, optional)
        'Province' : 'Western Cape',      //(string, optional)
        'Suburb' : 'Rondebosch',          //(string, optional)
        'PostCode' : '8000',              //(string, optional)
        'Address' : '3 Some Avenue',      //(string, optional)
        'Latitude' : '98',                //(number, optional)
        'Longitude' : '-98',              //(number, optional)
      },
      'OwnerUser' : {
        'FirstNames'  : 'George',
        'LastNames'   : 'Phillips',
      },
      'WaitMins'      : this.waitMins,
		}
    console.log(data);
    this.ngRedux.dispatch(eventDataActions.createEvent(data));
	}

  onCreation(){
  
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
