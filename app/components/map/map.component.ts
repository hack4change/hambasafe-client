import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

declare var google;

@Component({
  templateUrl: 'build/components/map/map.html',
  selector: 'map-component',
})
export class MapComponent {
  @ViewChild('mapComponent') mapNode;

  @Input() radius;
  //Holds map reference.
  private gMap            : any;
  //Holds marker reference.
  private gMarker         : any;
  //Holds all coordinate data, from navigator.
  private gCoords         : any = {};
  //Hold lat and lng of clicks and initial position. (google.maps.LatLng)
  private latLng          : any;
  //Holds the reference to the google maps circle
  private locationCircle  : any;
  private geoCoder        : any;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
  }
  ngAfterContentInit() {
    console.log(this.mapNode.nativeElement.valueOf());
    navigator.geolocation.getCurrentPosition((pos) => {
       _.merge(this.gCoords, pos.coords);
      this.latLng = new google.maps.LatLng(this.gCoords.latitude, this.gCoords.longitude) 
      this.gMap = new google.maps.Map(this.mapNode.nativeElement.valueOf(), {
        center: this.latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      // this.gMap.setCenter(new google.maps.LatLng(this.gCoords.latitude, this.gCoords.longitude));

      // this.gMap.setCenter(new google.maps.LatLng(this.gCoords.latitude, this.gCoords.longitude));
      this.gMarker = new google.maps.Marker({ 
        position: this.latLng,
        map: this.gMap,
        animation: google.maps.Animation.BOUNCE,
      });

      this.locationCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: this.gMap,
        center: this.latLng,
        radius: this.radius * 1000
      });
			this.gMap.addListener('click', this.mapClick);
			this.locationCircle.addListener('click', this.mapClick);
    })
  }

  ngOnChanges(changes) {
    if(!!this.locationCircle) {
      this.locationCircle.setRadius(this.radius * 1000);
    }
  }

	mapClick = (event, a) => {
		this.latLng = event.latLng
    this.gMap.setCenter(this.latLng);
		this.gMarker.setPosition(this.latLng);
		this.locationCircle.setCenter(this.latLng);
	}
}
