"use strict";
var CreateEventComponent = (function () {
    function CreateEventComponent(eventService) {
        this.eventService = eventService;
        this.shownGroup = null;
        this.options = {};
        this.eventType = ["Walk", "Run", "Cycle"];
        this.typeSelected = this.eventType[0];
        this.toggleGroup = function (group) {
            if (this.isGroupShown(group)) {
                this.shownGroup = null;
            }
            else {
                this.shownGroup = group;
            }
        };
        this.toggleSelection = function (selected, group) {
            this.typeSelected = selected;
            this.toggleGroup(group);
        };
        this.isGroupShown = function (type, group) {
            return this.shownGroup === group && this.typeSelected !== type;
        };
        this.isShown = function (type, group) {
            return this.shownGroup === group && this.typeSelected !== type;
        };
    }
    CreateEventComponent.prototype.searchEvents = function () {
        this.eventService.createEvent({ id: 1 }).then(function (event) {
            this.eventData = event;
        }, function (error) {
        });
    };
    CreateEventComponent.prototype.create = function () {
        console.log(this.details);
        console.log(this.result);
        this.generateLocationFromAutoComplete(this.details);
    };
    CreateEventComponent.prototype.generateLocationFromAutoComplete = function (details) {
        var location = {};
        location.Address = details.formatted_address;
        location.Suburb = this.extractSuburb(details.address_components);
        location.City = this.extractCity(details.address_components);
        location.Province = this.extractProvince(details.address_components);
        location.Country = this.extractCountry(details.address_components);
        location.Latitude = details.geometry.location.lat();
        location.Longtitude = details.geometry.location.lng();
        console.log(location);
        return location;
    };
    CreateEventComponent.prototype.extractSuburb = function (results) {
        var suburbResults;
        suburbResults = this.findType('sublocality_level_2', results);
        if (suburbResults && suburbResults.length && suburbResults.length > 0)
            return suburbResults[0].long_name;
        suburbResults = this.findType('sublocality_level_1', results);
        if (suburbResults && suburbResults.length && suburbResults.length > 0)
            return suburbResults[0].long_name;
        suburbResults = this.findType('sublocality', results);
        if (suburbResults && suburbResults.length && suburbResults.length > 0)
            return suburbResults[0].long_name;
        return null;
    };
    CreateEventComponent.prototype.extractCity = function (results) {
        var suburbResults;
        suburbResults = this.findType('locality', results);
        if (suburbResults && suburbResults.length > 0)
            return suburbResults[0].long_name;
        return null;
    };
    CreateEventComponent.prototype.extractProvince = function (results) {
        var suburbResults;
        suburbResults = this.findType('administrative_area_level_1', results);
        if (suburbResults && suburbResults.length && suburbResults.length > 0)
            return suburbResults[0].long_name;
        return null;
    };
    CreateEventComponent.prototype.extractCountry = function (results) {
        var suburbResults;
        suburbResults = this.findType('country', results);
        if (suburbResults && suburbResults.length && suburbResults.length > 0)
            return suburbResults[0].long_name;
        return null;
    };
    CreateEventComponent.prototype.findType = function (type, addressComponents) {
        var results = [];
        if (!addressComponents) {
            return results;
        }
        var i = 0;
        for (i = 0; i < addressComponents.length; i++) {
            var addressComponent = addressComponents[i];
            if (addressComponent != null && addressComponent.types != null) {
                var j = 0;
                for (j = 0; j < addressComponent.types.length; j++) {
                    var localType = addressComponent.types[j];
                    console.log("local type: " + localType + " - " + addressComponent.long_name);
                    if (type == localType) {
                        results.push(addressComponent);
                    }
                }
            }
        }
        return results;
    };
    return CreateEventComponent;
}());
exports.CreateEventComponent = CreateEventComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlRXZlbnRDb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdC9Jb25pYzJTcGlrZS9Jb25pYzJTcGlrZS9hcHAvIiwic291cmNlcyI6WyJldmVudC9DcmVhdGVFdmVudENvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUE7SUFJQSw4QkFBb0IsWUFBeUI7UUFBekIsaUJBQVksR0FBWixZQUFZLENBQWE7UUFIM0MsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNwQixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBbUJiLGNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkMsaUJBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR2pDLGdCQUFXLEdBQUcsVUFBVSxLQUFLO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLG9CQUFlLEdBQUcsVUFBVSxRQUFRLEVBQUUsS0FBSztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQztRQUVGLGlCQUFZLEdBQUcsVUFBVSxJQUFJLEVBQUUsS0FBSztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUM7UUFDakUsQ0FBQyxDQUFDO1FBRUYsWUFBTyxHQUFHLFVBQVUsSUFBSSxFQUFFLEtBQUs7WUFDN0Is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