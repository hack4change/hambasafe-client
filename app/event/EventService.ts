import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import {Config}from "../core/Config";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EventService {
    
  constructor(private http: Http,
    private config: Config) { }

        createEvent(data) {
          return this.http.post(this.config.baseServiceURL + '/v1/createevent', data)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
           
        }
        getAllEvents(id) {
          return this.http.get(this.config.baseServiceURL + '/v1/events')
            .toPromise().
            then(response => response.json().data)
            .catch(this.handleError);
        }
        getEvent(id) {
          return this.http.get(this.config.baseServiceURL + '/v1/event?id=' + id)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        }
        getEventTypes() {
          return this.http.get(this.config.baseServiceURL + '/v1/event-types')
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        }
        getEventByUser(id) {
          return this.http.get(this.config.baseServiceURL + '/v1/events-by-user')
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        }
        getEventByAttendee(data){
          var param = Object.keys(data);
          return this.http.get(this.config.baseServiceURL + '/v1/events-by-attendee?' + param + "=" + data.param)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        }
        getEventBySuburb(data){
          var param = Object.keys(data);  
          return this.http.get(this.config.baseServiceURL + '/v1/events-by-suburb?' + param + "=" + data.param)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        }
        getEventByCoords(latitude, longitude, radius){
          return this.http.get(this.config.baseServiceURL + '/v1/events-by-coordinates?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        }
        handleError(error: any) {
          console.error('An error occurred', error);
          return Promise.reject(error.message || error);
        }

 
}
