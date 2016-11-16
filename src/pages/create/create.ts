declare var google;
declare var uploadcare;

import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import {
  NavController,
  NavParams, 
  LoadingController
} from 'ionic-angular';
import {
  FormBuilder, 
  FormGroup, 
  Validators
} from '@angular/forms';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {EventDataActions} from '../../actions/event-data.actions';

/*
 *  Validators
 */
// import {DistanceValidator} from  '../../validators/distance';
// import {WaitTimeValidator} from  '../../validators/waitTime';


/*
 *  Pages
 */
// import { HomePage } from '../home/home';
import { ActivityDetailPage } from '../activity-detail/activity-detail';

/*
 * Components
 */
// import { MapComponent } from '../../components/map/map.component.ts';


@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage implements OnInit {
  @ViewChild('startMap') startMap;
  @ViewChild('endMap') endMap;

  created$    : Observable<any>;
  activity$   : Observable<any>;
  userId$     : Observable<any>;

  createdSub$ :  Subscription;
  activitySub$:  Subscription;
  userIdSub$  :   Subscription;

  isChange    : boolean = false;
  activityId  : string = '';

  public createForm: FormGroup;
  activeType: string = '';
  currentUserId: number;
  createModal = null; 
  isPublic : boolean = true;
  eventType;
  name;
  description
  distance
  startTime;
  startDate;
  startLocation;
  endTime;
  endDate;
  endLocation;
  intensity;
  waitTime;
  geoCoder: any;
  minDate: string;
  maxDate: string;

  constructor(
    private loadingCtrl : LoadingController,
    private nav: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private formBuilder: FormBuilder,
    private eventDataActions : EventDataActions
  ) {
    this.createForm = this.formBuilder.group({
      isPublic: [
        true,
        Validators.compose([
          // Validators.required
        ]),
      ],
      eventType: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      intensity: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      name: [
        "",
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(40),
          Validators.required
        ]),
      ],
      description: [
        "",
        Validators.compose([
          Validators.minLength(40),
          Validators.maxLength(400),
          Validators.required
        ]),
      ],
      distance: [
        "",
        Validators.compose([
          // DistanceValidator.isValid,
          Validators.required
        ]),
      ],
      startTime: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      startDate: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      waitTime: [
        "",
        Validators.compose([
          Validators.required
          // WaitTimeValidator.isValid,
        ]),
      ],
      latitude: [
        "",
        Validators.compose([
          Validators.required
          // WaitTimeValidator.isValid,
        ]),
      ],
      longitude: [
        "",
        Validators.compose([
          Validators.required
          // WaitTimeValidator.isValid,
        ]),
      ],
    });
  }

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder;
    if(this.params && this.params.data && this.params.data.isChange){
      if( this.params.data.activityId){
        this.isChange   = this.params.data.isChange;
        this.activityId = this.params.data.activityId;
      } else {
        this.goBack();
      }
    }
    var tmpDate = new Date();
    this.minDate    = tmpDate.toISOString().split("T")[0];
    this.maxDate    = (new Date(new Date().setFullYear(new Date().getFullYear() + 1))).toISOString().split("T")[0];
    this.startDate  = this.minDate;
    this.created$ = this.ngRedux.select((state) => {
      return {
        status: state['eventData'].get('status'),
        message: state['eventData'].get('message')
      }
    });
    if(this.isChange && this.activityId){
      this.activity$ = this.ngRedux.select(state=>{
          return state['eventData'].getIn(['items', this.activityId]).toJS();
      });
      this.activitySub$ = this.activity$.subscribe((activity) => {
        console.log(activity);
        if(!!activity) {
          var d = new Date(activity.startDate.iso);
          this.isPublic = activity.isPublic;
          this.eventType = activity.eventType;
          this.name = activity.name;
          this.description = activity.description;
          this.distance = activity.distance;
          this.startTime = d.toLocaleTimeString();
          this.startDate = d.toISOString().split("T")[0];//d.getFullYear() + "-" + d.getMonth() + "-"+ d.getDate();
          this.startLocation = activity.startLocation.coordinates;
          this.intensity = activity.intensity;
          this.waitTime = activity.waitTime;

          this.createForm.value.isPublic = activity.isPublic;
          this.createForm.value.eventType = activity.eventType;
          this.createForm.value.name = activity.name;
          this.createForm.value.description = activity.description;
          this.createForm.value.distance = activity.distance;
          this.createForm.value.startTime = d.toLocaleTimeString();
          this.createForm.value.startDate = d.toISOString().split("T")[0];//d.getFullYear() + "-" + d.getMonth() + "-"+ d.getDate();
          this.createForm.value.startLocation = activity.startLocation.coordinates;
          this.createForm.value.intensity = activity.intensity;
          this.createForm.value.waitTime = activity.waitTime;

          console.log(this.waitTime);
        }
      });

    }
    this.userId$ = this.ngRedux.select(state=>state['currentUser'].get('id'));

    this.createdSub$ = this.created$.subscribe(eventStatus => {

      console.log('created refresh');
      switch (eventStatus.status) {
        case 'CREATED': 
          if(this.createModal) {
          this.createModal.dismiss()
        }
        console.log(eventStatus.status);
        console.log(eventStatus.message);
        // this.nav.setRoot(HomePage);
        // this.ngRedux.dispatch(eventDataActions.joinActivity(eventStatus.message))
        this.nav.setRoot(ActivityDetailPage, {
          'activityId' : eventStatus.message
        })
        this.ngRedux.dispatch(this.eventDataActions.setIdle());
        break;
        case 'CREATING': 
          this.createModal = this.loadingCtrl.create({
          content: !!this.isChange ?  "Saving...": "Creating...",
          dismissOnPageChange : true,
        })

        this.createModal.present();
        break;
        case 'CREATE_ERROR': 
          if(this.createModal) {
          this.createModal.dismiss()
        }
      }
    });
    this.userIdSub$ = this.userId$.subscribe(userId => {
      this.currentUserId = userId;
    })
  }

  ngOnDestroy() {
    if(!!this.createdSub$){
      this.createdSub$.unsubscribe();
    }
    if(!!this.userIdSub$){
      this.userIdSub$.unsubscribe();
    }
  }
    

	createActivity() {
    console.log(this.startTime);
    console.log(this.eventType);
    console.log(this.createForm);
    console.log(this.createForm.value);
    console.log(this.createForm.value.startDate);
    console.log(this.createForm.value.startTime);
    var convertedDate = new Date(this.createForm.value.startDate  + " " + this.createForm.value.startTime);
    var data = {
      'name'          : this.createForm.value.name.trim(),
      'description'   : this.createForm.value.description.trim(),
      'distance'      : Number(this.createForm.value.distance),
      'intensity'     : this.createForm.value.intensity,
      'eventType'     : this.createForm.value.eventType,
      'startDate'     : convertedDate,
      // 'endDate'       : momethis.createForm.value.value.nt(this.endDate  + " " + this.endTime),
      'waitTime'      : Number(this.createForm.value.waitTime),
      'isPublic'      : this.createForm.value.isPublic,
      'startLocation' : {
        longitude: this.createForm.value.longitude,
        latitude: this.createForm.value.latitude,
      },
      // 'endLocation' : {
      //   longitude: this.endLocation.lng(),
      //   latitude: this.endLocation.lat(),
      // },
    }
    if(this.isChange){
      this.ngRedux.dispatch(this.eventDataActions.updateActivity(this.activityId, data));
    } else {
      this.ngRedux.dispatch(this.eventDataActions.createActivity(data));
    }
	}
  openMap(type: string) {
    this.activeType = type;
  }
  closeMap(type: string) {
    if(type=='START_LOCATION') { 
      this.startLocation = {
        'latitude' : this.startMap.latLng.lat(),
        'longitude' : this.startMap.latLng.lng(),
      }
    } else if(type=='END_LOCATION') {
      this.endLocation = this.endMap.latLng;
    }
      this.activeType = '';
  }
  onCreation() {
  }
  goBack(){
    this.nav.pop();
  }
}

