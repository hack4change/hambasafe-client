import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';

// import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';

/*
 * Actions
 */
import { AuthActions }     from '../actions/auth.actions';
import { UserActions }      from '../actions/user.actions';
import { InviteActions }    from '../actions/invite.actions';
import { EventDataActions } from '../actions/event-data.actions';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {

  public rootPage = LandingPage;
  private authStatus$ : Observable<any>;

  constructor(platform: Platform, authActions : AuthActions, userActions : UserActions, inviteActions: InviteActions, eventDataActions : EventDataActions) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
  // /*
  //  *  Sets active menu
  //  */
	// setMenuAuthenticated() {
  //   this.menu.enable(false, 'anonymous-menu');
  //   this.menu.enable(true, 'authorised-menu');
  // }

	// setMenuAnonymous() {
  //   this.menu.enable(false, 'authorised-menu');
  //   this.menu.enable(true, 'anonymous-menu');
  // }

  // /*
  //  *  Menu Navigation functions
  //  */
  // goToHome() {
  //   this.nav.setRoot(HomePage);
  // }

  // goToFriends() {
  //   this.nav.setRoot(FriendsPage);
  // }

  // goToAbout() {
  //   this.nav.push(AboutPage);
  // }
  
  // goToEmergency() {
  //   this.nav.push(EmergencyPage);
  // }
  
  // goToProfile() {
  //   this.nav.setRoot(ProfilePage);
  // }
  
  // goToFacebook() {
  //   window.location.href= "https://www.facebook.com/hambasafe/"; 
  // }

  // goToTwitter() {
  //   window.location.href= "https://twitter.com/hambasafe"; 
  // }

  // goToWebsite() {
  //   window.location.href= "https://www.facebook.com/hambasafe/"; 
  // }

  // goToShare() {
  
  // }
  // goToTerms() {
  //   this.menu.close();
  //   this.nav.push(TermsPage);
  // }
  // logOut() {
  //   this.ngRedux.dispatch(authActions.logoutUser(this.platform.is('cordova')));
  // }
}
