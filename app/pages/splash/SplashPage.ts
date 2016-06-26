import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/*
 *  Pages
 */
import {LandingPage} from '../landing/LandingPage';
import {TermsPage} from '../terms/TermsPage';

@Component({
  templateUrl: 'build/pages/splash/splash.html'
})
export class SplashPage 
{
  constructor(private nav: NavController) {};

  goToLanding() {
    this.nav.setRoot(LandingPage);
  }

  goToTerms() {
    this.nav.push(TermsPage);
  }
}
