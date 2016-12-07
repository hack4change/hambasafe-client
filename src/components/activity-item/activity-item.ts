import { Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';


/*
 * 
 */
import * as moment from 'moment';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';

/**
 *  Pages
 */
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';
// import { ActivePage } from '../../pages/active/active';//TODO: Remove Comments

/*
  Generated class for the ActivityItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'activity-item',
  templateUrl: 'activity-item.html'
})
export class ActivityItem implements OnInit {
  @Input() activity: any;
  @Input() detailed: boolean = false;
  @Input() mustRate: boolean = false;

  startDate : any;
  actionType : string = '';// Math.floor(Math.random()*2) ? 'RATE' : 'VIEW';

  constructor(
    private nav: NavController,
    private ngRedux: NgRedux<any>
  ) {};

  ngOnInit() {
    //TODO: Remove
    // this.actionType = ;
    this.startDate = moment(this.activity.startDate.iso);
    console.log(this.startDate);
    // this.startFormatted = this.startFormatted.getUTCDate() + "-"+(this.startFormatted.getUTCMonth()+1) + "-" + this.startFormatted.getUTCFullYear();
  }
  getStartDate() {
    return this.startDate.format('DD-MM-YYYY');
  }

  getStartDateLong() {
    return this.startDate.format("dddd, MMMM Do YYYY, h:mm:ss a");
  }

  getActivityType(){
    return !!this.activity.eventType ? this.activity.eventType : '';
  }

  viewActivity(){
    console.log(this.activity['objectId']);
    //TODO: Add back in.
    // if(this.startDate.isBetween(moment(), moment().add(1, 'month'), 'minute')){
    //   this.nav.push(ActivePage, {
    //     'activityId' : this.activity['objectId'],
    //   }) 
    // } else if(!this.detailed) {
      this.nav.push(ActivityDetailPage, {
        'activityId' : this.activity['objectId'],
        'mustRate'     : this.mustRate,
      }) 
    // }
  }

  getClasses() {
    var classes = {
    }
    if(this.mustRate) {
      classes['must-rate'] = true;
    } else if(this.startDate.isBetween(moment(), moment().add(1, 'month'), 'minute')) {
      classes['must-checkin'] = true;
    }
    return classes;
  }
}
