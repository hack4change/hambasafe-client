declare var google;
export class MapComponent {
  sliderDistance = 10;
  loading;
  $watch;
  gCoords;
  constructor(EventService, $state, $compile, private $ionicLoading, private $location) {



    this.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });
  }
  searchByLocation() {
    console.log("Hey");
    if (!!this.gCoords && !!this.sliderDistance) {
      console.log(this.sliderDistance);
      console.log(this.gCoords.lat() + " " + this.gCoords.lng());
      this.$location.path('app/search?lat=' + this.gCoords.lat() + "&lng" + this.gCoords.lng() + "&dist=" + this.sliderDistance);
    }
  }
  init() {
    var mapOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log(pos);
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      let gCoords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let marker = new google.maps.Marker({ position: gCoords, map, title: 'You!' });
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
        console.log(this.map)
        if (this.map && this.locationCircle) {
          this.locationCircle.setOptions({
            radius: this.sliderDistance * 1000
          });
        }

    });
  }
}

