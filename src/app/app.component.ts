import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {
  Observable,
  Subscription
} from 'rxjs';
import { NgRedux, DevToolsExtension } from 'ng2-redux';

import { applyMiddleware } from 'redux';
const createLogger = require('redux-logger');
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

/*
 * Actions
 */
import { AuthActions }      from '../actions/auth.actions';
import { UserActions }      from '../actions/user.actions';
import { InviteActions }    from '../actions/invite.actions';
import { EventDataActions } from '../actions/event-data.actions';

/*
 *  Pages
 */
import { AboutPage }        from '../pages/about/about';
import { EmergencyPage }    from '../pages/emergency/emergency';
import { FriendsPage }      from '../pages/friends/friends';
import { HomePage }         from "../pages/home/home";
import { LandingPage }      from '../pages/landing/landing';
import { ProfilePage }      from '../pages/profile/profile';
import { RegistrationPage } from '../pages/registration/registration';
import { TermsPage }        from '../pages/terms/terms';

@Component({
  templateUrl: 'app.html',
})
export class MyApp implements OnInit {
  @ViewChild('myNavRoot') navCtrl : NavController

  public authStatus$: Observable<any>;

  public authStatusSub$  : Subscription;

  public loadingPopup: any;

  public rootPage = LandingPage;

  public oldStatus : string;

  constructor(
    public platform : Platform,
    // public navCtrl : NavController,
    public menuCtrl : MenuController,
    public authActions : AuthActions,
    public userActions : UserActions,
    public inviteActions : InviteActions,
    public eventDataActions : EventDataActions,
    public ngRedux : NgRedux<any>,
    public devTools : DevToolsExtension) {
    // config as before 
    this.ngRedux.configureStore(rootReducer, {}, [
      createLogger()
    ],[
      applyMiddleware(thunk)
    ]);
    platform.ready().then(() => {
      this.authActions.initializeFacebook();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  /*
   * Init func
   */
  ngOnInit() {
    this.setMenuAnonymous();
    this.authStatus$ =  this.ngRedux.select(['currentUser', 'status']);
    this.authStatus$.subscribe( userStatus => {
      switch(userStatus){
        case 'AUTHENTICATED':
          if(this.menuCtrl.isEnabled('anonymous-menu')) {
          this.setMenuAuthenticated();
        }
        break;
        case 'CREATE_SUCCESS':
          this.ngRedux.dispatch(this.authActions.setAuthenticated());
          this.navCtrl.setRoot(HomePage);
          break;
        case 'NEW_USER':
          this.navCtrl.setRoot(RegistrationPage);
        break;
        default:
          if(this.menuCtrl.isEnabled('authorised-menu')) {
          this.setMenuAnonymous();
        }
      }
      if(this.oldStatus === 'ATTEMPTING' && userStatus === 'ANONYMOUS') {
        this.navCtrl.setRoot(LandingPage);
      } else if(this.oldStatus !== 'AUTHENTICATED' && userStatus === 'AUTHENTICATED') {
          this.ngRedux.dispatch(this.inviteActions.subscribe());
          this.ngRedux.dispatch(this.eventDataActions.subscribeAttending());
          this.ngRedux.dispatch(this.userActions.subscribeToFriends());
      }
      console.log('Root userStatus');
      console.log(userStatus);
      console.log(this.oldStatus);
      this.oldStatus = userStatus;
    })
  }
  /*
   *  Sets active menu
   */
	setMenuAuthenticated() {
    this.menuCtrl.enable(false, 'anonymous-menu');
    this.menuCtrl.enable(true, 'authorised-menu');
  }

	setMenuAnonymous() {
    this.menuCtrl.enable(false, 'authorised-menu');
    this.menuCtrl.enable(true, 'anonymous-menu');
  }

  /*
   *  Menu Navigation functions
   */
  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goToFriends() {
    this.navCtrl.setRoot(FriendsPage);
  }

  goToAbout() {
    this.navCtrl.push(AboutPage);
  }
  
  goToEmergency() {
    this.navCtrl.push(EmergencyPage);
  }
  
  goToProfile() {
    this.navCtrl.setRoot(ProfilePage);
  }
  
  goToFacebook() {
    window.location.href= "https://www.facebook.com/hambasafe/"; 
  }

  goToTwitter() {
    window.location.href= "https://twitter.com/hambasafe"; 
  }

  goToWebsite() {
    window.location.href= "https://www.facebook.com/hambasafe/"; 
  }

  goToShare() {
  
  }
  goToTerms() {
    this.menuCtrl.close();
    this.navCtrl.push(TermsPage);
  }
  logOut() {
    this.ngRedux.dispatch(this.authActions.logoutUser(this.platform.is('cordova')));
  }
}
