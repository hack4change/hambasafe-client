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
  templateUrl: 'build/pages/landing/landing.html'
})
export class LandingPage 
{
  loggedIn;
  private Facebook;
  private ProfileService;
  private $location;

  constructor(private nav: NavController) {};

  getLoginStatus  () {
    this.Facebook.logout();
    this. Facebook.getLoginStatus(function (response) {
      console.log(response);
      if (response.status === 'connected') {
        this.$location.path('app/home');
      } else {
        this.loggedIn = false;
      }
    });
  };

  fbLogin() {
    // this.Facebook.login(function (response) {
    //   console.log(response);
    //   this.ProfileService.setProfileFromFacebook(response);
    //   this.$location.path('app/registration');
    // });
  }
  goToTerms(){
    this.nav.push(TermsPage);
  }
}
