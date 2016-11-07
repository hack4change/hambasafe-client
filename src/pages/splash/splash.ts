import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
// import {NgRedux} from 'ng2-redux';
// import {Observable} from 'rxjs';

/*
 *  Pages
 */
import {LandingPage} from '../landing/landing';
import {TermsPage} from '../terms/terms';

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  constructor(public navCtrl: NavController) {}

  ngOnInit(){
  
  }

  ionViewDidLoad() {
    console.log('Hello Splash Page');
  }

  goToLanding() {
    this.navCtrl.setRoot(LandingPage);
  }

  goToTerms() {
    this.navCtrl.push(TermsPage);
  }
}

