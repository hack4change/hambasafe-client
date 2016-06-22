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
var ionic_angular_1 = require('ionic-angular');
var HomePage = (function () {
    function HomePage(EventService, $location) {
        this.EventService = EventService;
        this.$location = $location;
        this.refreshEvents();
    }
    HomePage.prototype.refreshEvents = function () {
        var _this = this;
        this.EventService.getAllEvents().then(function (response) {
            console.log(response);
            _this.events = response.data;
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.click = function (event) {
        if (event.EventDateTimeEnd < new Date()) {
            this.$location.path("app/rating");
        }
        else {
            this.$location.path("app/event-detail");
        }
    };
    HomePage = __decorate([
        ionic_angular_1.Page({
            templateUrl: 'build/pages/page3/page3.html'
        }), 
        __metadata('design:paramtypes', [Object, Object])
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSG9tZUN0cmwuanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJob21lL0hvbWVDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw4QkFBbUIsZUFBZSxDQUFDLENBQUE7QUFLbkM7SUFFRSxrQkFBb0IsWUFBWSxFQUFVLFNBQVM7UUFBL0IsaUJBQVksR0FBWixZQUFZLENBQUE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFBO1FBRWpELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsZ0NBQWEsR0FBYjtRQUFBLGlCQU9DO1FBTkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFRO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLENBQUMsRUFBRSxVQUFTLEdBQUc7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUlELHdCQUFLLEdBQUwsVUFBTyxLQUFLO1FBQ1YsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUExQkg7UUFBQyxvQkFBSSxDQUFDO1lBQ0osV0FBVyxFQUFFLDhCQUE4QjtTQUM1QyxDQUFDOztnQkFBQTtJQXlCRixlQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSxnQkFBUSxXQXdCcEIsQ0FBQSJ9