import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
// import {Geolocation} from 'ionic-native';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/**
 *  Actions
 */
import {EventDataActions} from '../../actions/event-data.actions';
import {UserActions} from '../../actions/user.actions';

declare var google;
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class Map implements OnInit {
  @ViewChild('mapComponent') mapNode;

  @Input() radius;

  location$               : Observable<any>;
  locationSub$            : Subscription;
  coordinates             : any;
  
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

  constructor(private platform: Platform, private nav: NavController, private ngRedux: NgRedux<any>, private userActions : UserActions, private eventDataActions : EventDataActions) {};

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
  }
  ngAfterContentInit() {
    // var options = {
    //   timeout: 10000,
    //   enableHighAccuracy: true
    // };
    console.log(this.mapNode.nativeElement.valueOf());
    // if(this.platform.is('cordova')) {
    //   Geolocation.getCurrentPosition().then((res) => {
    //     console.log(res);
    //     this.createMapAtCoords(res)
    //   });
    // } else {
    this.locationConnector();
    // }
  }
  locationConnector() {
    this.location$ = this.ngRedux.select(['currentUser', 'location'])
    .map((pos:any)=>{
      return {
        longitude : !!pos ? pos.get('longitude') : 0,
        latitude : !!pos ? pos.get('latitude') : 0
      }
    })
    this.locationSub$ = this.location$.subscribe((pos) => {
      if(pos.longitude === null || pos.latitude === null || Math.abs(pos.latitude) > 90 && Math.abs(pos.longitude) > 180) {
        this.ngRedux.dispatch(this.userActions.getLocation());
      } else {
        if(!_.isEqual(pos, this.coordinates)) {
          this.coordinates = pos;
          console.log('location update');
          if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
            if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
              console.log('create Map')
              this.createMapAtCoords(this.coordinates);
            }
          }
        }
      }
    });
  }

  createMapAtCoords(pos : any){
    console.log(pos);
    _.merge(this.gCoords, pos);
    if(!!this.gCoords && !!this.gCoords.latitude && !!this.gCoords.longitude) {
      if(Math.abs(this.gCoords.latitude) <= 90 && Math.abs(this.gCoords.longitude) <= 180 ) {
        this.latLng = new google.maps.LatLng(this.gCoords.latitude, this.gCoords.longitude) 
      } else {
        this.gCoords.latitude = 0;
        this.gCoords.longitude = 0;
        this.latLng = new google.maps.LatLng(0, 0) 
      }
    } else {
      this.gCoords.latitude = 0;
      this.gCoords.longitude = 0;
      this.latLng = new google.maps.LatLng(0, 0) 
    }
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
