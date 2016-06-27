import {Component, ViewChild} from '@angular/core';
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

  private rootPage: any = HomePage;
  private authStatus$ : Observable<any>;

  constructor(private platform: Platform, private menu: MenuController, private ngRedux: NgRedux<any>) {

    platform.ready().then(() => {
      //Sets status bar to default style;
      StatusBar.styleDefault();
      /*
       *  Fetch and subscribe to auth status from redux store;
       */
      // TODO: Facebook Native plugin doesn't work in browser.
      // if(cordova && cordova.plugins && cordova.plugins.Facebook){
      //   Facebook.getLoginStatus().then((result) => {
      //     console.log(result)
      //   })
      // }
    });
  }

  NgOnInit() {
      this.setMenuAnonymous();
      this.authStatus$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'status']));
      this.authStatus$.subscribe(userStatus => {
        this.setMenuLoggedIn();
        console.log(userStatus);
      })
  }

  /*
   *  Sets active menu
   */
	setMenuLoggedIn() {
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
  
  goToAbout() {
    this.menu.close();
    this.nav.push(AboutPage);
  }
  
  goToEmergency() {
    this.menu.close();
    this.nav.push(EmergencyPage);
  }
  
  goToProfile() {

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
}

ionicBootstrap(MyApp, [provider(store)], {})
