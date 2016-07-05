import {forwardRef, Component, ViewChild, OnInit, Input} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController, NavParams} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/*
 *  Components
 */
import {ActivityItemComponent} from '../../components/activity-item/activity-item.component.ts';

@Component({
  templateUrl: 'build/pages/activity-detail/activity-detail.html',
  directives : [
    forwardRef(() => ActivityItemComponent),
  ],
})
export class ActivityDetailPage {
  activityId: any;
  activity$: Observable<any>;
  description: string;
  
  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>) {
    console.log("Heydy");
    this.activityId = this.params.data['activityId'];
  };

  ngOnInit() {
    console.log(this.activityId);
    this.activity$ = this.ngRedux.select(
      state => 
        state.getIn(['eventData', 'items'])
        .find(item =>  
          item.get('Id') === this.activityId
        ).toJS()
    );
    this.activity$.subscribe(x => {
      this.description = x.Description;
    })
  }
  goBack(){
    console.log('GoBack')
    this.nav.pop();
  }
}
