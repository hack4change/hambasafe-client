import { Component, OnInit } from '@angular/core';
import {EventService} from "./EventService";
export class CreateEventComponent{
  shownGroup = null;
options = {};

constructor(private eventService:EventService) {
    

  }
   eventData

  searchEvents  () {

    this.eventService.createEvent(
      {id: 1}).then(
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
  toggleSelection = function (selected, group) {
    this.typeSelected = selected;
    this.toggleGroup(group);
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
