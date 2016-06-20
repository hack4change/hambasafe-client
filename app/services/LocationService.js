"use strict";
var LocationService = (function () {
    function LocationService($http, config) {
        this.$http = $http;
        this.config = config;
    }
    LocationService.prototype.createEvent = function (data) {
        return this.$http.get(this.config.baseServiceURL + '/v1/createevent');
    };
    LocationService.prototype.getAllEvents = function (id) {
        return this.$http.get(this.config.baseServiceURL + '/v1/events');
    };
    LocationService.prototype.getEvent = function (id) {
        return this.$http.get(this.config.baseServiceURL + '/v1/event?id=' + id);
    };
    LocationService.prototype.getEventByUser = function (id) {
        return this.$http.get(this.config.baseServiceURL + '/v1/eventsbyuser');
    };
    LocationService.prototype.getEventByAttendee = function (data) {
        var param = Object.keys(data);
        return this.$http.get(this.config.baseServiceURL + '/v1/eventsbyattendee?' + param + "=" + data.param);
    };
    LocationService.prototype.getEventBySuburb = function (data) {
        var param = Object.keys(data);
        return this.$http.get(this.config.baseServiceURL + '/v1/eventsbysuburb?' + param + "=" + data.param);
    };
    LocationService.prototype.getEventByCoords = function (latitude, longitude, radius) {
        return this.$http.get(this.config.baseServiceURL + '/v1/eventsbycoordinates?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius);
    };
    return LocationService;
}());
exports.LocationService = LocationService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb25TZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3QvSW9uaWMyU3Bpa2UvSW9uaWMyU3Bpa2UvYXBwLyIsInNvdXJjZXMiOlsic2VydmljZXMvTG9jYXRpb25TZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUNFLHlCQUFvQixLQUFLLEVBQVUsTUFBTTtRQUFyQixVQUFLLEdBQUwsS0FBSyxDQUFBO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBQTtJQUV6QyxDQUFDO0lBQ0QscUNBQVcsR0FBWCxVQUFZLElBQUk7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ0Qsc0NBQVksR0FBWixVQUFhLEVBQUU7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNELGtDQUFRLEdBQVIsVUFBUyxFQUFFO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUUsQ0FBQztJQUM1RSxDQUFDO0lBQ0Qsd0NBQWMsR0FBZCxVQUFlLEVBQUU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBQ0QsNENBQWtCLEdBQWxCLFVBQW1CLElBQUk7UUFDckIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsdUJBQXVCLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUNELDBDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ25CLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLHFCQUFxQixHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZHLENBQUM7SUFDRCwwQ0FBZ0IsR0FBaEIsVUFBaUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxtQ0FBbUMsR0FBRyxRQUFRLEdBQUcsYUFBYSxHQUFHLFNBQVMsR0FBRyxVQUFVLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDdkosQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCWSx1QkFBZSxrQkEyQjNCLENBQUEifQ==