import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LandingPage} from "./pages/landing/LandingPage";
import {provider, NgRedux} from 'ng2-redux';
import store from './stores/store';

@Component({
  templateUrl: 'build/pages/app.html',
})
export class MyApp {

  private rootPage: any = LandingPage;

  constructor(private platform: Platform, private menu: MenuController, private ngRedux: NgRedux<any>) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.setAnonymous();
    });
  }
  NgOnInit() {
      
  }
	setLoggedIn(){
    this.menu.enable(true, 'authorised-menu');
    this.menu.enable(false, 'anonymous-menu');
  }
	setAnonymous(){
    this.menu.enable(true, 'anonymous-menu');
    this.menu.enable(false, 'authorised-menu');
  }
  goToAboutPage(){
    console.log('triggered About');
  }
  goToEmergencyPage(){
  
  }
  goToProfilePage(){
  
  }
  goToSharePage(){
  
  }
  goToTermsPage(){
  
  }
}

ionicBootstrap(MyApp, [provider(store)], {})
