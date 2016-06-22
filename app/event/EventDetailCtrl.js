"use strict";
var EventDetailCtrl = (function () {
    function EventDetailCtrl($location, eventService) {
        this.eventService = eventService;
        this.eventData = {};
        // $scope.eventData = {
        //     attending: false,
        //     location: "CAPE TOWN, RONDEBOSH",
        //     title: "Cycling in numbers",
        //     type: "CYCLE",
        //     distance: "5KM",
        //     level: "NOVICE",
        //     date: "20 November 2015",
        //     summary: "This is a 'Facebook' styled Card. The header is created from a Thumbnail List item,        the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.",
        //     numberOfAttendees: "4"
        // }
    }
    EventDetailCtrl.prototype.ngOnInit = function () {
        this.eventService.getEvent({ id: 3 })
            , function (event) {
                this.eventData = event;
                console.log(event);
            };
        this.attendingDescription = "JOIN";
        if (this.eventData.attending) {
            this.attendingDescription = "CANCEL";
        }
    };
    EventDetailCtrl.prototype.doAttend = function () {
        this.eventData.attending = !this.eventData.attending;
        this.attendingDescription = "JOIN";
        if (this.eventData.attending) {
            this.attendingDescription = "CANCEL";
        }
    };
    return EventDetailCtrl;
}());
exports.EventDetailCtrl = EventDetailCtrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnREZXRhaWxDdHJsLmpzIiwic291cmNlUm9vdCI6IkM6L2hhY2s0Y2hhbmdlL2hhbWJhc2FmZS1jbGllbnQvYXBwLyIsInNvdXJjZXMiOlsiZXZlbnQvRXZlbnREZXRhaWxDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTtJQUdFLHlCQUFZLFNBQVMsRUFBVSxZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUZ6RCxjQUFTLEdBQVEsRUFBRSxDQUFDO1FBSWxCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsd0NBQXdDO1FBQ3hDLG1DQUFtQztRQUNuQyxxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2QixnQ0FBZ0M7UUFDaEMsaVFBQWlRO1FBQ2pRLDZCQUE2QjtRQUM3QixJQUFJO0lBQ04sQ0FBQztJQUNELGtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztjQUNqQyxVQUFVLEtBQUs7Z0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDO1FBRUosSUFBSSxDQUFDLG9CQUFvQixHQUFHLE1BQU0sQ0FBQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFFBQVEsQ0FBQTtRQUN0QyxDQUFDO0lBQ0gsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ3JELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxRQUFRLENBQUE7UUFDdEMsQ0FBQztJQUNILENBQUM7SUFFSCxzQkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7QUF0Q1ksdUJBQWUsa0JBc0MzQixDQUFBIn0=