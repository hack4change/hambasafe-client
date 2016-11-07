import { Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';

/**
 *  Pages
 */
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';

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
