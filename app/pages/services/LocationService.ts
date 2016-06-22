export class LocationService {
  constructor(private $http, private config) {

  }
  createEvent(data) {
    return this.$http.get(this.config.baseServiceURL + '/v1/createevent');
  }
  getAllEvents(id) {
    return this.$http.get(this.config.baseServiceURL + '/v1/events');
  }
  getEvent(id) {
    return this.$http.get(this.config.baseServiceURL + '/v1/event?id=' + id );
  }
  getEventByUser(id) {
    return this.$http.get(this.config.baseServiceURL + '/v1/eventsbyuser');
  }
  getEventByAttendee(data) {
    var param = Object.keys(data);
    return this.$http.get(this.config.baseServiceURL + '/v1/eventsbyattendee?' + param + "=" + data.param);
  }
  getEventBySuburb(data) {
    var param = Object.keys(data);
    return this.$http.get(this.config.baseServiceURL + '/v1/eventsbysuburb?' + param + "=" + data.param);
  }
  getEventByCoords(latitude, longitude, radius) {
    return this.$http.get(this.config.baseServiceURL + '/v1/eventsbycoordinates?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius);
  }
}
