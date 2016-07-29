import {Component, ViewChild, enableProdMode} from '@angular/core';
import {Platform, ionicBootstrap, MenuController, NavController} from 'ionic-angular';


/**
 *  Native Plugins
 */
import {StatusBar} from 'ionic-native';
import {Facebook} from 'ionic-native';

/**
 *  Redux
 */
import {provider, NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';
import store from './stores/store';

/*
 * Actions
 */
import {authActions} from './actions/authActions';
import {inviteActions} from './actions/inviteActions';
import {eventDataActions} from './actions/eventDataActions';


/*
 *  Pages
 */
import {CreatePage} from "./pages/create/CreatePage";
import {HomePage} from "./pages/home/HomePage";
import {SplashPage} from "./pages/splash/SplashPage";
import {SearchPage} from "./pages/search/SearchPage";
import {EmergencyPage} from './pages/emergency/EmergencyPage';
import {TermsPage} from './pages/terms/TermsPage';
import {AboutPage} from './pages/about/AboutPage';
import {LandingPage} from './pages/landing/LandingPage';
import {LatestPage} from './pages/latest/LatestPage';
import {ProfilePage} from './pages/profile/ProfilePage';
import {RatingPage} from './pages/rating/RatingPage';
import {RegistrationPage} from './pages/registration/RegistrationPage';

import {ParseManager} from './models/parseManager';

/*
 * TODO: Alternative method to defining parseManager Globally
 */

@Component({
  templateUrl: 'build/pages/app.html',
})
export class MyApp {
  @ViewChild('myNavRoot') nav: NavController;

  private rootPage: any = LandingPage;
  private authStatus$ : Observable<any>;
  oldStatus: string;

  constructor(public platform: Platform, private menu: MenuController, private ngRedux: NgRedux<any>) {
    window.parseManager = new ParseManager();

    platform.ready().then(() => {
      //Sets status bar to default style;
      StatusBar.styleDefault();
      /*
       *  Fetch and subscribe to auth status from redux store;
       */
      // TODO: Facebook Native plugin doesn't work in browser.
      // if(cordova && cordova.plugins && cordova.plugins.Facebook) {
      // }
      
    });
  }

  /*
   * Init func
   */
  ngOnInit() {
    this.setMenuAnonymous();
    this.authStatus$ =  this.ngRedux.select(state=>state.getIn(['currentUser', 'status']))
    this.authStatus$.subscribe( userStatus => {
      switch(userStatus){
        case 'AUTHENTICATED':
          if(this.menu.isEnabled('anonymous-menu')) {
          this.setMenuAuthenticated();
        }
        break;
        case 'CREATE_SUCCESS':
          this.ngRedux.dispatch(authActions.setAuthenticated());
          this.nav.setRoot(HomePage);
          break;
        case 'NEW_USER':
          this.nav.setRoot(RegistrationPage);
        break;
        default:
          if(this.menu.isEnabled('authorised-menu')) {
          this.setMenuAnonymous();
        }
      }
      if (this.oldStatus !== 'AUTHENTICATED' && userStatus === 'AUTHENTICATED'){
          this.ngRedux.dispatch(inviteActions.subscribe());
          this.ngRedux.dispatch(eventDataActions.subscribeAttending());
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
    this.menu.enable(true, 'authorised-menu');
    this.menu.enable(false, 'anonymous-menu');
  }

	setMenuAnonymous() {
    this.menu.enable(true, 'anonymous-menu');
    this.menu.enable(false, 'authorised-menu');
  }

  /*
   *  Menu Navigation functions
   */
  goToHome() {
    this.nav.setRoot(HomePage);
  }

  goToAbout() {
    this.nav.push(AboutPage);
  }
  
  goToEmergency() {
    this.nav.push(EmergencyPage);
  }
  
  goToProfile() {
    this.nav.setRoot(ProfilePage);
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
    this.menu.close();
    this.nav.push(TermsPage);
  }
  logOut() {
    this.ngRedux.dispatch(authActions.logoutUser(this.platform.is('cordova')));
  }
}

window.fbAsyncInit = function() {
  // Executed when the SDK is loaded

  // console.log(FB);
  // enableProdMode();
  ionicBootstrap(MyApp, [provider(store), ParseManager], {
    backButtonText : '',
  })
};


(function(d){
  // load the Facebook javascript SDK

  var js,
  id = 'facebook-jssdk',
    ref = d.getElementsByTagName('script')[0];

  if (d.getElementById(id)) {
    return;
  }

  js = d.createElement('script');
  js.id = id;
  js.async = true;
  js.src = "http://connect.facebook.net/en_US/sdk.js";

  ref.parentNode.insertBefore(js, ref);
}(document));
