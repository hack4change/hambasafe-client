import {
  forwardRef,
  Component,
  ViewChild,
  OnInit,
  Input,
  NgZone,
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController, NavParams} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';


@Component({
  templateUrl: 'build/pages/activity-invite/activity-invite.html',
})
export class ActivityInvitePage {
  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {}
  ngOnInit() {
    // this.eve
  }
}
