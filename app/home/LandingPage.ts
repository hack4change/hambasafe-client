import {Component} from '@angular/core';
@Component({
  templateUrl: 'build/home/landing.html'
})
export class LandingPage 
{
  loggedIn; private Facebook; private ProfileService; private $location;
  constructor( ) { }
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
    this.Facebook.login(function (response) {
      console.log(response);
      this.ProfileService.setProfileFromFacebook(response);
      this.$location.path('app/registration');
    });
  }
}
