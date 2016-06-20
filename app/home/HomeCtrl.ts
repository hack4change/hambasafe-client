import {Page} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/page3/page3.html'
})
export class HomePage{
  events: Event[];
  constructor(private EventService, private $location) {

    this.refreshEvents();
  }
  refreshEvents(){
    this.EventService.getAllEvents().then((response)=> {
      console.log(response);
      this.events = response.data;
    }, function(err){
      console.log(err);
    });
  }

  

  click (event) {
    if (event.EventDateTimeEnd < new Date()) {
      this.$location.path("app/rating");
    } else {
      this.$location.path("app/event-detail");
    }
  }
}
export interface Event {
  
}