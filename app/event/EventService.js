"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Config_1 = require("../core/Config");
require('rxjs/add/operator/toPromise');
var EventService = (function () {
    function EventService(http, config) {
        this.http = http;
        this.config = config;
    }
    EventService.prototype.createEvent = function (data) {
        return this.http.post(this.config.baseServiceURL + '/v1/createevent', data)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getAllEvents = function (id) {
        return this.http.get(this.config.baseServiceURL + '/v1/events')
            .toPromise().
            then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getEvent = function (id) {
        return this.http.get(this.config.baseServiceURL + '/v1/event?id=' + id)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getEventTypes = function () {
        return this.http.get(this.config.baseServiceURL + '/v1/event-types')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getEventByUser = function (id) {
        return this.http.get(this.config.baseServiceURL + '/v1/events-by-user')
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getEventByAttendee = function (data) {
        var param = Object.keys(data);
        return this.http.get(this.config.baseServiceURL + '/v1/events-by-attendee?' + param + "=" + data.param)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getEventBySuburb = function (data) {
        var param = Object.keys(data);
        return this.http.get(this.config.baseServiceURL + '/v1/events-by-suburb?' + param + "=" + data.param)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.getEventByCoords = function (latitude, longitude, radius) {
        return this.http.get(this.config.baseServiceURL + '/v1/events-by-coordinates?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, Config_1.Config])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkM6L1Byb2plY3QvSW9uaWMyU3Bpa2UvSW9uaWMyU3Bpa2UvYXBwLyIsInNvdXJjZXMiOlsiZXZlbnQvRXZlbnRTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMscUJBQThCLGVBQWUsQ0FBQyxDQUFBO0FBQzlDLHVCQUFvQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3JDLFFBQU8sNkJBQTZCLENBQUMsQ0FBQTtBQUdyQztJQUVFLHNCQUFvQixJQUFVLEVBQ3BCLE1BQWM7UUFESixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFBSSxDQUFDO0lBRXZCLGtDQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLGlCQUFpQixFQUFFLElBQUksQ0FBQzthQUN4RSxTQUFTLEVBQUU7YUFDWCxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDO2FBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUNELG1DQUFZLEdBQVosVUFBYSxFQUFFO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQzthQUM1RCxTQUFTLEVBQUU7WUFDWixJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDO2FBQ3JDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELCtCQUFRLEdBQVIsVUFBUyxFQUFFO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLGVBQWUsR0FBRyxFQUFFLENBQUM7YUFDcEUsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBcEIsQ0FBb0IsQ0FBQzthQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCxvQ0FBYSxHQUFiO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxHQUFHLGlCQUFpQixDQUFDO2FBQ2pFLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUM7YUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QscUNBQWMsR0FBZCxVQUFlLEVBQUU7UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEdBQUcsb0JBQW9CLENBQUM7YUFDcEUsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBcEIsQ0FBb0IsQ0FBQzthQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCx5Q0FBa0IsR0FBbEIsVUFBbUIsSUFBSTtRQUNyQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyx5QkFBeUIsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDcEcsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBcEIsQ0FBb0IsQ0FBQzthQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsSUFBSTtRQUNuQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyx1QkFBdUIsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDbEcsU0FBUyxFQUFFO2FBQ1gsSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksRUFBcEIsQ0FBb0IsQ0FBQzthQUN0QyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDRCx1Q0FBZ0IsR0FBaEIsVUFBaUIsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxxQ0FBcUMsR0FBRyxRQUFRLEdBQUcsYUFBYSxHQUFHLFNBQVMsR0FBRyxVQUFVLEdBQUcsTUFBTSxDQUFDO2FBQ2xKLFNBQVMsRUFBRTthQUNYLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQXBCLENBQW9CLENBQUM7YUFDdEMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsa0NBQVcsR0FBWCxVQUFZLEtBQVU7UUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUE1RFQ7UUFBQyxpQkFBVSxFQUFFOztvQkFBQTtJQStEYixtQkFBQztBQUFELENBQUMsQUE5REQsSUE4REM7QUE5RFksb0JBQVksZUE4RHhCLENBQUEifQ==