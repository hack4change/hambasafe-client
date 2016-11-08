import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  NavController,
  NavParams,
  // Loading
} from 'ionic-angular';

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
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';


/*
  Generated class for the ActivityList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity-list',
  templateUrl: 'activity-list.html'
})
export class ActivityListPage implements OnInit {


  activities$     : Observable<any>;

  activitiesSub$  : Subscription;

  listHeader      : string;
  coordinates     : Object = {};
  shouldInclude   : any;

  constructor(
    private nav: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.listHeader     = this.params.data['header'];
    this.shouldInclude  = this.params.data['filter'];

    navigator.geolocation.getCurrentPosition((pos) => {
      this.coordinates = pos.coords;
      this.zone.run(() => {
        this.activityConnector();
      })
    })
  }

  activityConnector() {
    this.activities$ = this.ngRedux.select(['eventData', 'items'])
    .map((activity:Map<string, any>) => {
      return activity.filter((activity:Map<string, any>) => {
        return this.shouldInclude(activity);
      })
      .toList()
      .toJS()
    })

    this.activitiesSub$ = this.activities$.subscribe(x => {
      this.zone.run(() => {
        console.log('Search Update');
      })
    });

  }
	
  ngOnDestroy(){
    if(!!this.activitiesSub$){
      this.activitiesSub$.unsubscribe();
    }
  }
	goHome() {
    this.nav.setRoot(HomePage);
	}
	goSearch() {
    this.nav.setRoot(SearchPage);
	}
	goBack() {
		this.nav.pop();
	}

}

