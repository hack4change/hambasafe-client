import { Component, ViewChild, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/**
 *  Pages
 */
import { ActivityDetailPage } from '../../pages/activity-detail/ActivityDetailPage';

@Component({
  templateUrl: 'build/components/activity-item/activity-item.html',
  selector: 'activity-item',
})
export class ActivityItemComponent {

  @Input() activity: any;
  @Input() detailed: boolean = false;
  @Input() mustRate: boolean = false;

  startFormatted : any;
  actionType : string = '';// Math.floor(Math.random()*2) ? 'RATE' : 'VIEW';

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};

  ngOnInit() {
    //TODO: Remove
    // this.actionType = ;
    this.startFormatted = new Date(this.activity.startDate.iso);
    console.log(this.startFormatted);
    this.startFormatted = this.startFormatted.getUTCDate() + "-"+(this.startFormatted.getUTCMonth()+1) + "-" + this.startFormatted.getUTCFullYear();
  }
  getActivityType(){
    return !! this.activity.eventType ? this.activity.eventType : '';
  }
  viewActivity(){
    console.log(this.activity['objectId']);
    if(!this.detailed) {
      this.nav.push(ActivityDetailPage, {
        'activityId' : this.activity['objectId'],
        'mustRate'     : this.mustRate,
      }) 
    }
  }
  getClasses(){
    var classes = {
    }
    if( this.mustRate ) {
      classes['must-rate'] = true;
    } 
    return classes;
  }
}
