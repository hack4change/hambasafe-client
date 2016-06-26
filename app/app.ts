import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Facebook} from 'ionic-native';
import {provider, NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';
import store from './stores/store';

/*
 *  Pages
 */
import {CreatePage} from "./pages/create/CreatePage";
import {HomePage} from "./pages/home/HomePage";

@Component({
  templateUrl: 'build/pages/app.html',
})
export class MyApp {

  private rootPage: any = HomePage;
  private authStatus$ : Observable<any>;

  constructor(private platform: Platform, private menu: MenuController, private ngRedux: NgRedux<any>) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.setAnonymous();
      this.authStatus$ = this.ngRedux.select(state=>state.getIn(['currentUser', 'status']));
      this.authStatus$.subscribe(userStatus => {
        console.log(userStatus);
      })
      // if(cordova && cordova.plugins && cordova.plugins.Facebook){
      //   Facebook.getLoginStatus().then((result) => {
      //     console.log(result)
      //   })
      // }
    });
  }
  NgOnInit() {
      
  }
	setLoggedIn() {
    this.menu.enable(true, 'authorised-menu');
    this.menu.enable(false, 'anonymous-menu');
  }
	setAnonymous() {
    this.menu.enable(true, 'anonymous-menu');
    this.menu.enable(false, 'authorised-menu');
  }
  goToAboutPage() {
    console.log('triggered About');
  }
  goToEmergencyPage() {
  
  }
  goToProfilePage(){
  
  }
  goToSharePage() {
  
  }
  goToTermsPage() {
  
  }
}

ionicBootstrap(MyApp, [provider(store)], {})
