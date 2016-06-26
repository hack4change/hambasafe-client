import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

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
export class HomePage{
  constructor(private nav: NavController) {};
  

  navigateTo(event) {
  }
}
export interface Event {
  
}
