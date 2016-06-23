import {Component} from '@angular/core';
import {Platform, ionicBootstrap, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LandingPage} from "./pages/landing/LandingPage";

@Component({
  templateUrl: 'build/pages/app.html',
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private menu: MenuController) {
    this.setAnonymous();
    this.rootPage = LandingPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
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

ionicBootstrap(MyApp)
