import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage{
  events: Event[];
  constructor() {

  }

  

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
