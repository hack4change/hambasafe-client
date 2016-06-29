import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

declare var google;

@Component({
  templateUrl: 'build/components/event-detail/event-detail.html',
  selector: 'event-detail',
})
export class MapComponent {

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};

  ngOnInit() {

  }

}
