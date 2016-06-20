import { Component, OnInit } from '@angular/core';
import {EventService} from "./EventService";
export class CreateEventComponent{
  shownGroup = null;
options = {};

constructor(private eventService:EventService) {
    

  }
   eventData

  searchEvents  () {

<<<<<<< HEAD:app/event/CreateEventComponent.ts
    this.eventService.createEvent(
      {id: 1}).then(
=======
    EventFactory.create(
      {
        'id': 1
      },
>>>>>>> 4ff3d74b4efda841ff45f5dc0381e7f59a6d2d52:scripts/controllers/CreateCtrl.ts
      function (event) {
        this.eventData = event;
      },
      function (error) {

      });
  }
eventType = ["Walk", "Run", "Cycle"]; 
  typeSelected = this.eventType[0];
  

  toggleGroup = function (group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
<<<<<<< HEAD:app/event/CreateEventComponent.ts
  toggleSelection = function (selected, group) {
    this.typeSelected = selected;
    this.toggleGroup(group);
=======

  $scope.toggleSelection = function (selected, group) {
    $scope.typeSelected = selected;
    $scope.toggleGroup(group);
>>>>>>> 4ff3d74b4efda841ff45f5dc0381e7f59a6d2d52:scripts/controllers/CreateCtrl.ts
  };

  isGroupShown = function (type, group) {
    return this.shownGroup === group && this.typeSelected !== type;
  };

  isShown = function (type, group) {
    return this.shownGroup === group && this.typeSelected !== type;
  };
  details;
  result;

  create  () {
    console.log(this.details);
    console.log(this.result);
    this.generateLocationFromAutoComplete(this.details);
  }
<<<<<<< HEAD:app/event/CreateEventComponent.ts
 
   generateLocationFromAutoComplete(details) {
    var location :any= {};
    location.Address = details.formatted_address;
    location.Suburb = this.extractSuburb(details.address_components);
    location.City = this.extractCity(details.address_components);
    location.Province = this.extractProvince(details.address_components);
    location.Country = this.extractCountry(details.address_components);
    location.Latitude = details.geometry.location.lat();
    location.Longtitude = details.geometry.location.lng();
    console.log(location);
    return location;
=======

  function generateLocationFromAutoComplete(details) {
    var placeDetails :any = {};
    placeDetails.Address = details.formatted_address;
    placeDetails.Suburb = extractSuburb(details.address_components);
    placeDetails.City = extractCity(details.address_components);
    placeDetails.Province = extractProvince(details.address_components);
    placeDetails.Country = extractCountry(details.address_components);
    placeDetails.Latitude = details.geometry.location.lat();
    placeDetails.Longtitude = details.geometry.location.lng();
    return placeDetails;
>>>>>>> 4ff3d74b4efda841ff45f5dc0381e7f59a6d2d52:scripts/controllers/CreateCtrl.ts
  }

   extractSuburb(results) {
    var suburbResults;
    suburbResults = this.findType('sublocality_level_2', results);
    if (suburbResults && suburbResults.length && suburbResults.length > 0)
      return suburbResults[0].long_name;

    suburbResults = this.findType('sublocality_level_1', results);
    if (suburbResults && suburbResults.length && suburbResults.length > 0)
      return suburbResults[0].long_name;

    suburbResults = this.findType('sublocality', results);
    if (suburbResults && suburbResults.length && suburbResults.length > 0)
      return suburbResults[0].long_name;

    return null;
  }

   extractCity(results) {
    var suburbResults;
    suburbResults = this.findType('locality', results);
    if (suburbResults && suburbResults.length > 0)
      return suburbResults[0].long_name;

    return null;
  }

   extractProvince(results) {
    var suburbResults;
    suburbResults = this.findType('administrative_area_level_1', results);
    if (suburbResults && suburbResults.length && suburbResults.length > 0)
      return suburbResults[0].long_name;

    return null;
  }

   extractCountry(results) {
    var suburbResults;
    suburbResults = this.findType('country', results);
    if (suburbResults && suburbResults.length && suburbResults.length > 0)
      return suburbResults[0].long_name;

    return null;
  }

   findType(type, addressComponents) {
    var results = [];

    if(!addressComponents) {
      return results;
    }

    var i = 0;
    for (i = 0; i < addressComponents.length; i++) {
      var addressComponent = addressComponents[i];
      if (addressComponent != null && addressComponent.types != null) {
        var j = 0;
        for (j = 0; j < addressComponent.types.length; j++) {
          var localType = addressComponent.types[j];
          console.log("local type: " + localType + " - " + addressComponent.long_name);
          if (type == localType) {
            results.push(addressComponent);
          }
        }
      }
    }
    return results;
  }
}
