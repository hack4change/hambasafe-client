import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage{
  constructor() { }
  

  navigateTo(event) {
  }
}
export interface Event {
  
}
 // private $location
 //    if (event.EventDateTimeEnd < new Date()) {
 //      this.$location.path("app/rating");
 //    } else {
 //      this.$location.path("app/event-detail");
 //    }
    // this.refreshEvents();
  // refreshEvents(){
  // }
//private EventService,
    // this.EventService.getAllEvents().then((response)=> {
    //   console.log(response);
    //   this.events = response.data;
    // }, function(err){
    //   console.log(err);
    // });
