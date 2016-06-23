import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LandingPage} from '../home/landing/LandingPage';

@Component({
  templateUrl: 'build/pages/splash/splash.html'
})
export class SplashPage 
{
  private $location;
  constructor(private nav: NavController) {};
  goToLanding = function() {
    this.nav.setRoot(LandingPage);
  }

  goToTerms = function() {

    // $location.path("app/terms")
  }
}
