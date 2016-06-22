"use strict";
var SearchCtrl = (function () {
    function SearchCtrl($stateParams, EventService, $location) {
        this.$stateParams = $stateParams;
        this.EventService = EventService;
        this.$location = $location;
        this.toggleGroup = function (group) {
            if (this.isGroupShown(group)) {
                this.shownGroup = null;
            }
            else {
                this.shownGroup = group;
            }
        };
        this.goMap = function () {
            this.$location.path('app/map');
        };
        this.eventType = ["Event Type"];
        this.typeSelected = this.eventType[0];
        this.selectedSearch = 0;
        if ($stateParams.lat && $stateParams.lng && $stateParams.dist) {
            this.selectedSearch = 1;
        }
        this.eventsToList = [];
        this.searchEvents();
        this.getTypes();
    }
    SearchCtrl.prototype.getTypes = function () {
        this.EventService.getEventTypes().then(function (response) {
            this.eventTypes = [];
            for (var i = 0; i < response.data.length; i++) {
                this.eventTypes.push(response.data[i].Name);
            }
            console.log(this.eventTypes);
        }, function (response) {
            console.log("error");
            console.log(response);
        });
    };
    SearchCtrl.prototype.toggleSelection = function (selected, group) {
        this.typeSelected = selected;
        this.toggleGroup(group);
    };
    SearchCtrl.prototype.isGroupShown = function (type, group) {
        return this.shownGroup === group && this.typeSelected !== type;
    };
    SearchCtrl.prototype.isShown = function (type, group) {
        return this.shownGroup === group && this.typeSelected !== type;
    };
    SearchCtrl.prototype.setActiveSearch = function (selection) {
        this.selectedSearch = selection;
    };
    SearchCtrl.prototype.activeSearch = function (selection) {
        return this.selectedSearch === selection;
    };
    SearchCtrl.prototype.filterResults = function (eventObject) {
        if (this.typeSelected == "Event Type") {
            return true;
        }
        else {
            if (this.typeSelected == eventObject.EventType.Name) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    SearchCtrl.prototype.searchEvents = function () {
        var searchBy = this.selectedSearch;
        this.EventService.getAllEvents().then(function (response) {
            this.eventsToList = response.data;
            console.log(response);
        }, function (response) {
        });
    };
    return SearchCtrl;
}());
exports.SearchCtrl = SearchCtrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQ3RybC5qcyIsInNvdXJjZVJvb3QiOiJDOi9oYWNrNGNoYW5nZS9oYW1iYXNhZmUtY2xpZW50L2FwcC8iLCJzb3VyY2VzIjpbInNlYXJjaC9TZWFyY2hDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQU1FLG9CQUFvQixZQUFZLEVBQVUsWUFBWSxFQUFVLFNBQVM7UUFBckQsaUJBQVksR0FBWixZQUFZLENBQUE7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBQTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQUE7UUE2QnZFLGdCQUFXLEdBQUcsVUFBVSxLQUFLO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUMsQ0FBQTtRQStCSCxVQUFLLEdBQUc7WUFDUCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUE7UUFsRUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFBO1FBRXRCLElBQUks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