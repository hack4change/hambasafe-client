import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
// import {AsyncPipe} from '@angular/common';
import {NavController} from 'ionic-angular';
import distanceCalculator from '../../utils/distanceCalculator';

const _ = require('lodash');

/*
 * Actions
 */
import {EventDataActions} from '../../actions/event-data.actions';
import {UserActions} from '../../actions/user.actions';

/**
 *  Redux
 */
import {
  NgRedux
} from 'ng2-redux';
import {
  Observable, 
  Subscription
} from 'rxjs';
import {
  Map
} from 'immutable';

/*
 *  Pages
 */
// import { TermsPage } from '../terms/terms';
import { CreatePage } from '../create/create';
import { SearchPage } from '../search/search';

/*
 *  Components
 */
// import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  activities$                  : Observable<any>;
  activitiesToRate$            : Observable<any>;
  location$                    : Observable<any>;

  activitiesSub$               : Subscription;
  activitiesToRateSub$         : Subscription;
  locationSub$                 : Subscription;

  isFiltered: string = 'public';
  isEmpty: any = 'true';
  searchDistance: number = 2;
  greatestDistance: number = 2;
  coordinates: any;

  constructor(private navCtrl: NavController, private ngRedux: NgRedux<any>, private zone: NgZone, private userActions: UserActions, private eventDataActions: EventDataActions) {}
   
  ngOnInit() {
    this.ngRedux.dispatch(this.userActions.getLocation());
    this.locationConnector();
    this.activityConnector();
  }

  ngOnDestroy() {
    console.log('Destroying Subscriptions')
    if(!!this.locationSub$) {
      this.locationSub$.unsubscribe();
    }
    if(!!this.activitiesSub$){
      this.activitiesSub$.unsubscribe();
    }
    if(!!this.activitiesToRateSub$) {
      this.activitiesToRateSub$.unsubscribe();
    }
  }

  locationConnector() {
    this.location$ = this.ngRedux.select(['currentUser', 'location'])
    .map((pos: Map<string, any>)=> {
      return {
        longitude : pos.get('longitude'),
        latitude : pos.get('latitude')
      } 
    })
    this.locationSub$ = this.location$.subscribe((pos) => {
      if(!pos.longitude && pos.longitude !== 0 || !pos.latitude && pos.latitude !== 0) {
        this.ngRedux.dispatch(this.userActions.getLocation());
      } else {
        if(!_.isEqual(pos, this.coordinates)) {
          this.coordinates = pos;
          console.log('location update');
          if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
            if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180 ) {
              console.log('activity update')
              this.ngRedux.dispatch(this.eventDataActions.fetchEventsByCoordinates(this.searchDistance, this.coordinates.latitude, this.coordinates.longitude));
            }
          }
        }
      }
    });
  }

  activityConnector() {
    this.activities$ = this.ngRedux.select(['eventData', 'items'])
    .map((item: any) => {
      console.log(item.filter((immutableItem: any)=>{

        if((new Date(immutableItem.get('startDate').get('iso'))).getTime() <= Date.now()){
          return false
        };
        console.log(immutableItem);
        if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
          if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180) {
            console.log(distanceCalculator(
              this.coordinates.latitude,
              this.coordinates.longitude,
              immutableItem.get('startLocation').get('coordinates').get('latitude'),
              immutableItem.get('startLocation').get('coordinates').get('longitude')
            ));
            console.log(this.searchDistance);
            return distanceCalculator(
              this.coordinates.latitude,
              this.coordinates.longitude,
              immutableItem.get('startLocation').get('coordinates').get('latitude'),
              immutableItem.get('startLocation').get('coordinates').get('longitude')
            ) <= this.searchDistance;
          }
        }
        return false;

      }))
      return item.filter((immutableItem: any)=>{

        if((new Date(immutableItem.get('startDate').get('iso'))).getTime() <= Date.now()){
          return false
        };
        console.log(immutableItem);
        if(!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
          if(Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180) {
            console.log(distanceCalculator(
              this.coordinates.latitude,
              this.coordinates.longitude,
              immutableItem.get('startLocation').get('coordinates').get('latitude'),
              immutableItem.get('startLocation').get('coordinates').get('longitude')
            ));
            console.log(this.searchDistance);
            return distanceCalculator(
              this.coordinates.latitude,
              this.coordinates.longitude,
              immutableItem.get('startLocation').get('coordinates').get('latitude'),
              immutableItem.get('startLocation').get('coordinates').get('longitude')
            ) <= this.searchDistance;
          }
        }
        return false;

      })
      .toList()
      .toJS()
      .sort(function(a, b) {
        return a.startDate.iso > b.startDate.iso;
      })
    })
    this.activitiesToRate$ =  this.ngRedux.select(['eventData', 'items'])
    .map((item: Map<string, any>) => {
      return item
      .filter((item) => {
        if((new Date(item.get('startDate').get('iso'))).getTime() > Date.now()){
          return false
        };
        return !!item.get('isAttending') && !!item.get('mustRate');
      })
      .toList()
      .toJS()
      .sort(function(a, b) {
        return a.startDate.iso > b.startDate.iso;
      })
    })
    this.activitiesSub$ = this.activities$.subscribe((x) => {
      console.log(x);
      this.zone.run(() => {
        console.log('isEmpty');
        console.log(x.length == 0);
        this.isEmpty = (x.length == 0).toString();
      })
    });
    this.activitiesToRateSub$ = this.activitiesToRate$.subscribe((activity)=> {
      console.log(activity);
    });
  }

  isActive(filterBy) {
    return this.isFiltered === filterBy;
  }

  toggleView(newFilter) {
    this.isFiltered = newFilter;
  }

  sliderChange() {
    console.log('sliderUpdate');
    // if(this.searchDistance > this.greatestDistance && this.coordinates) {
      if (!!this.coordinates && !!this.coordinates.latitude && !!this.coordinates.longitude) {
        if (Math.abs(this.coordinates.latitude) <= 90 && Math.abs(this.coordinates.longitude) <= 180) {
          this.ngRedux.dispatch(this.eventDataActions.fetchEventsByCoordinates(this.searchDistance, this.coordinates.latitude, this.coordinates.longitude));
          this.greatestDistance = this.searchDistance;
        }
      }
    // }
  }

  checkEmpty() {
    return this.isEmpty.toString();
  }

  goToCreate() {
    this.navCtrl.push(CreatePage);
  }

  loadSearch() {
    console.log('goSearch');
    this.navCtrl.setRoot(SearchPage);
  }
}
