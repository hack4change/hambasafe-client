import {Component, OnInit} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController} from 'ionic-angular';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';

/**
 *  Redux
 */
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';

/*
 *  Pages
 */
import {TermsPage} from '../terms/TermsPage';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  isFiltered: string = 'public';
  events$: Observable<any>;
  isEmpty: any;
  sliderDistance: number;
  greatestDistance: number;
  coordinates: any;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) { }
   
  NgOnInit(){
    this.sliderDistance = 4;
    this.greatestDistance = 4;
    this.isEmpty = true;
    this.events$ = this.ngRedux.select(state=>state.getIn(['eventData', 'items']));
    this.events$.subscribe(x=>{console.log('subscribed'); console.log(x)});
    navigator.geolocation.getCurrentPosition((pos)=> {
      console.log(pos);
      this.coordinates = pos.coords;
      this.ngRedux.dispatch(eventDataActions.fetchEvents(this.sliderDistance, this.coordinates.latitude, this.coordinates.longitude));
    })
  }

  isActive(filterBy) {
    return this.isFiltered === filterBy;
  }

  toggleView(newFilter){
    this.isFiltered = newFilter;
  }
  sliderChange(){
    if(this.sliderDistance > this.greatestDistance && this.coordinates) {
      this.ngRedux.dispatch(eventDataActions.fetchEvents(this.sliderDistance, this.coordinates.latitude, this.coordinates.longitude));
      this.greatestDistance = this.sliderDistance;
    }
  }
  selectEvent(selected){
  
  }
}
