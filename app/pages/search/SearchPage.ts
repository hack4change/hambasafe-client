import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/**
 *  Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

/*
 * Pages
 */
import {HomePage} from '../home/HomePage';

/*
 * Components
 */
import {MapComponent} from '../../components/map/map.component.ts';

@Component({
  templateUrl: 'build/pages/search/search.html',
  directives : [
    MapComponent,
  ]
})
export class SearchPage {
  @ViewChild('myMap') mapChild;
  eventType             : any;
  typeSelected          : any;
  selectedSearch        : any;
  eventsToList          : any;
  shownGroup            : any;
  searchDistance        : number = 4;
  activeType            : string = 'TIME';
  mapSearched           : boolean = false;
  coordinates           : any;
  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};

  goBack(){
    this.nav.pop();
  }
  goHome(){
    this.nav.setRoot(HomePage);
  }
  isActive(callingType) {
    return callingType === this.activeType;
  }
  toggleView(clickedType){
    this.activeType = clickedType ;
  }
  searchRadius() {
    // this.activeType = 'SEARCH';
    console.log('searchRadius');
    var lat = this.mapChild.latLng.lat();
    var lng = this.mapChild.latLng.lng();
    if(!!lat && !!lng){
      this.ngRedux.dispatch(eventDataActions.fetchEvents(this.searchDistance, lat, lng));
    }
  }
}
