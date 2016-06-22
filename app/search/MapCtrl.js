"use strict";
var MapComponent = (function () {
    function MapComponent(EventService, $state, $compile, $ionicLoading, $location) {
        this.$ionicLoading = $ionicLoading;
        this.$location = $location;
        this.sliderDistance = 10;
        this.loading = $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });
    }
    MapComponent.prototype.searchByLocation = function () {
        console.log("Hey");
        if (!!this.gCoords && !!this.sliderDistance) {
            console.log(this.sliderDistance);
            console.log(this.gCoords.lat() + " " + this.gCoords.lng());
            this.$location.path('app/search?lat=' + this.gCoords.lat() + "&lng" + this.gCoords.lng() + "&dist=" + this.sliderDistance);
        }
    };
    MapComponent.prototype.init = function () {
        var mapOptions = {
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        navigator.geolocation.getCurrentPosition(function (pos) {
            console.log(pos);
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var gCoords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            var marker = new google.maps.Marker({ position: gCoords, map: map, title: 'You!' });
            this.locationCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: this.map,
                center: this.gCoords,
                radius: this.sliderDistance * 1000
            });
            this.$ionicLoading.hide();
        }, function (error) {
            alert('Unable to get location: ' + error.message);
        });
        this.$watch('sliderDistance', function (newValue, oldValue) {
            console.log(this.map);
            if (this.map && this.locationCircle) {
                this.locationCircle.setOptions({
                    radius: this.sliderDistance * 1000
                });
            }
        });
    };
    return MapComponent;
}());
exports.MapComponent = MapComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwQ3RybC5qcyIsInNvdXJjZVJvb3QiOiJDOi9oYWNrNGNoYW5nZS9oYW1iYXNhZmUtY2xpZW50L2FwcC8iLCJzb3VyY2VzIjpbInNlYXJjaC9NYXBDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUtFLHNCQUFZLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFVLGFBQWEsRUFBVSxTQUFTO1FBQWhDLGtCQUFhLEdBQWIsYUFBYSxDQUFBO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUpwRixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQVFsQixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDaEMsT0FBTyxFQUFFLDZCQUE2QjtZQUN0QyxZQUFZLEVBQUUsS0FBSztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsdUNBQWdCLEdBQWhCO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdILENBQUM7SUFDSCxDQUFDO0lBQ0QsMkJBQUksR0FBSjtRQUNFLElBQUksVUFBVSxHQUFHO1lBQ2YsSUFBSSxFQUFFLEVBQUU7WUFDUixTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztTQUN6QyxDQUFDO1FBQ0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUMxRCxVQUFVLENBQUMsQ0FBQztRQUNkLFNBQVMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxHQUFHO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqRixJQUFJLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEYsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBQSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUMzQyxXQUFXLEVBQUUsU0FBUztnQkFDdEIsYUFBYSxFQUFFLEdBQUc7Z0JBQ2xCLFlBQVksRUFBRSxDQUFDO2dCQUNmLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixXQUFXLEVBQUUsSUFBSTtnQkFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDcEIsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSTthQUNuQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLENBQUMsRUFBRSxVQUFVLEtBQUs7WUFDaEIsS0FBSyxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxRQUFRLEVBQUUsUUFBUTtZQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQztvQkFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSTtpQkFDbkMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztRQUVMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG1CQUFDO0FBQUQsQ0FBQyxBQTNERCxJQTJEQztBQTNEWSxvQkFBWSxlQTJEeEIsQ0FBQSJ9