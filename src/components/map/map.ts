import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { /*CameraPosition,*/ GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarker, GoogleMapsMarkerOptions, GoogleMapsAnimation} from 'ionic-native';
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
  @Input() lat : number = null;
  @Input() lng : number = null;

  location$               : Observable<any>;
  locationSub$            : Subscription;
  coordinates             : any;
  
  private isDevice        : boolean =  false;
  //Holds map reference.
  private deviceMap            : any;
  //Holds marker reference.
  private deviceMarker  : GoogleMapsMarker;
  private deviceMarkerOptions  : GoogleMapsMarkerOptions;
  //Holds all coordinate data, from navigator.
  private deviceCoords         : any = {};
  private deviceCircle         : any ;
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

  constructor(public platform: Platform, private nav: NavController, private ngRedux: NgRedux<any>, private userActions : UserActions, private eventDataActions : EventDataActions) {};

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

  ngOnDestroy(){
    if(!!this.deviceMap) {
      this.deviceMap.remove();
    }
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
              setTimeout(()=>{
                this.createMapAtCoords(this.coordinates);
              }, 1000);
            }
          }
        }
      }
    });
  }

  createMapAtCoords(pos : any){
    console.log(pos);
    if(this.platform.is('cordova') && !this.platform.is('browser')){
      this.isDevice = true;
      this.createDeviceMap(pos);
    } else {
      this.createBrowserMap(pos);
    }
  }

  createDeviceMap(pos) {
    console.log('creating device map');
    console.log(pos);
    this.deviceCoords = new GoogleMapsLatLng(pos.latitude,pos.longitude);
    this.deviceMap = new GoogleMap('map-component', {
      // 'backgroundColor': '#ffffffff',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true,
        // 'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'latLng': this.deviceCoords,
        'tilt': 30,
        'zoom': 15,
        'bearing': 50
      }
    });
    // this.deviceMap.setDebuggable(true);
    // this.deviceMap.setClickable(true);
    this.deviceMap.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      if(!this.deviceMarker){
        this.deviceMarkerOptions = {
          'title'       : 'Start',
          'draggable'   : true,
          'position'    : this.deviceCoords,
          'animation'   : GoogleMapsAnimation.DROP,
        }
        this.deviceMap.addCircle({
          center        : this.deviceCoords,
          radius        : this.radius * 1000,
          strokeColor   : '#FF0000AA',
          strokeWeight  : 1,
          fillColor     : '#FF000060',
        }).then((circle) => {
          console.log(circle);
          this.deviceCircle = circle;
          this.deviceCircle.addEventListener(GoogleMapsEvent.OVERLAY_CLICK).subscribe((ev) => {
            console.log('OVERLAY_CLICK');
            console.log(ev);
          })
          console.log(this.deviceCircle);
          return this.deviceMap.addMarker(this.deviceMarkerOptions)
        })
        .then((marker: GoogleMapsMarker) => {
          this.deviceMarker = marker;
          console.log(this.deviceMarker);
          marker.showInfoWindow();
          console.log(this.deviceCircle);
          this.deviceMarker.addEventListener(GoogleMapsEvent.MARKER_DRAG).subscribe((ev)=>{
            console.log('DRAG_END')
            console.log(ev);
            this.deviceMarker.getPosition().then((pos) => {
              console.log('HEEEEEEEEEERE')
              console.log(pos);
              console.log(this.deviceCircle);
              // console.log('DEViceu')
              if(!!this.deviceCircle){
                console.log(this.deviceCircle.getCenter())
                this.deviceCircle.setCenter(pos);
                console.log(this.deviceCircle.getCenter())
              }
              return Promise.resolve();
            })
          })
          this.deviceMarker.addEventListener(GoogleMapsEvent.MARKER_DRAG_END).subscribe((ev)=>{
            console.log('DRAG_END')
            console.log(ev);
            this.deviceMarker.getPosition().then((pos) => {
              console.log('HEEEEEEEEEERE')
              console.log(pos);
              console.log(this.deviceCircle);
              // console.log('DEViceu')
              if(!!this.deviceCircle){
                console.log(this.deviceCircle.getCenter())
                this.deviceCircle.setCenter(pos);
                console.log(this.deviceCircle.getCenter())
              }
              return Promise.resolve();
            })
          })
        });
        this.deviceMap.on(GoogleMapsEvent.MAP_CLICK, (ev) => {
          console.log('MAP_CLICK');
          console.log(ev);
        })
        this.deviceMap.getMyLocation().then((res)=>{
          console.log('LOCATION ON MAP')
          console.log(res) 
        })

      }
    });
  }

  createBrowserMap(pos) {
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
      strokeColor   : '#FF0000',
      strokeOpacity : 0.8,
      strokeWeight  : 2,
      fillColor     : '#FF0000',
      fillOpacity   : 0.35,
      map           : this.gMap,
      center        : this.latLng,
      radius        : this.radius * 1000
    });
    this.gMap.addListener('click', this.mapClick);
    this.locationCircle.addListener('click', this.mapClick);
  }

  ngOnChanges(changes) {
    if(!!this.locationCircle) {
      this.locationCircle.setRadius(this.radius * 1000);
    }
    if(!!this.deviceCircle){
      console.log('updating device circle');
      this.deviceCircle.setRadius(this.radius * 1000);
      console.log(this.radius);
    }
  }

	mapClick = (event, a) => {
		this.latLng = event.latLng
    this.gMap.setCenter(this.latLng);
		this.gMarker.setPosition(this.latLng);
		this.locationCircle.setCenter(this.latLng);
	}
  getLatitude() : Promise<number> {
    return new Promise((resolve, reject)=>{
      if(this.isDevice) {
        console.log('Position of Marker');
        console.log(this.deviceMarker);
        return this.deviceMarker.getPosition().then((pos) => {
          console.log('HEEEEEEEEEERE')
          return resolve(pos.lat);
        })
      } else {
        return resolve(this.latLng.lat());
      }
    })
  }
  getLongitude() : Promise<number> {
    return new Promise((resolve, reject) => {
      if(this.isDevice) {
        console.log(this.deviceMarker);
        return this.deviceMarker.getPosition().then((pos) => {
          console.log('Position of Marker');
          console.log(pos);
          return resolve(pos.lng);
        })
      } else {
        return resolve(this.latLng.lng());
      }
    })
  }
}
