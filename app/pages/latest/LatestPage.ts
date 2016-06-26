import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'build/pages/latest/latest.html'
})
export class LatestPage{
  constructor(private nav: NavController) {};

  goCreateAnEvent = function () {
    this.$location.path('app/registration');
  }

  goHambaSafe = function () {
    this.$location.path('app/eventdetail/TEMP');
  }
}
