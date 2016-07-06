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


/*
 *  Pages
 */
import {CreatePage} from "./pages/create/CreatePage";
import {HomePage} from "./pages/home/HomePage";
import {SplashPage} from "./pages/splash/SplashPage";
import {EmergencyPage} from './pages/emergency/EmergencyPage';
import {TermsPage} from './pages/terms/TermsPage';
import {AboutPage} from './pages/about/AboutPage';
// import {EventDetailPage} from './pages/event-detail/EventDetailPage';
// import {EventRatingPage} from './pages/event-detail/EventRatingPage';
import {InvitePage} from './pages/invite/InvitePage';
import {LandingPage} from './pages/landing/LandingPage';
import {LatestPage} from './pages/latest/LatestPage';
import {ProfilePage} from './pages/profile/ProfilePage';
import {RatingPage} from './pages/rating/RatingPage';
import {RegistrationPage} from './pages/registration/RegistrationPage';
// import {SearchPage} from './pages/search/SearchPage';

@Component({
  templateUrl: 'build/pages/app.html',
})
export class MyApp {
  @ViewChild('myNavRoot') nav: NavController;

  private rootPage: any = LandingPage;
  private authStatus$ : Observable<any>;
  oldStatus: string;

  constructor(private platform: Platform, private menu: MenuController, private ngRedux: NgRedux<any>) {

    platform.ready().then(() => {
      //Sets status bar to default style;
      StatusBar.styleDefault();
      /*
       *  Fetch and subscribe to auth status from redux store;
       */
      // TODO: Facebook Native plugin doesn't work in browser.
      // if(cordova && cordova.plugins && cordova.plugins.Facebook) {
      //   Facebook.getLoginStatus().then((result) => {
      //     console.log(result)
      //   })
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
      console.log('Root userStatus');
      switch(userStatus){
        case 'AUTHENTICATED':
          this.setMenuAuthenticated();
        break;
        case 'CREATE_SUCCESS':
          this.nav.setRoot(HomePage);
        setTimeout(()=> {
          this.ngRedux.dispatch(authActions.setAuthenticated());
        }, 0)
        case 'NEW_USER':
          this.nav.setRoot(RegistrationPage);
        break;
        default:
          if(this.menu.isEnabled('authorised-menu')){
          this.setMenuAnonymous();
        }
      }
      if(this.oldStatus === 'AUTHENTICATED' && userStatus !== 'AUTHENTICATED') {
        this.nav.push(LandingPage);
      }
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

  goToWebsite(){
    window.location.href= "https://www.facebook.com/hambasafe/"; 
  }

  goToShare() {
  
  }
  goToTerms() {
    this.menu.close();
    this.nav.push(TermsPage);
  }
  logOut(){
    this.ngRedux.dispatch(authActions.logoutUser());
  }
}

window.fbAsyncInit = function() {
  // Executed when the SDK is loaded

  FB.init({

    /*
       The app id of the web app;
       To register a new app visit Facebook App Dashboard
       ( https://developers.facebook.com/apps/ )
     */
    appId: '1824765444411364',//'289482390688',

    /*
       Adding a Channel File improves the performance
       of the javascript SDK, by addressing issues
       with cross-domain communication in certain browsers.
     */

    // channelUrl: 'app/channel.html',

    /*
       Set if you want to check the authentication status
       at the start up of the app
     */
    status: true,

    /*
       Enable cookies to allow the server to access
       the session
     */
    cookie: true,

    /* Parse XFBML */
    xfbml: true,

    version    : 'v2.6',
  });
  // enableProdMode();
  ionicBootstrap(MyApp, [provider(store)], {
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
