import {Component, OnInit} from '@angular/core';
import {Platform, NavController, LoadingController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 *  Actions
 */
import {authActions} from '../../actions/authActions';

/*
 *  Pages
 */
import {HomePage} from '../home/HomePage';
import {TermsPage} from '../terms/TermsPage';

//TODO: REMOVE
import {SearchPage} from '../search/SearchPage';
import {RegistrationPage} from '../registration/RegistrationPage';
import {ProfilePage} from '../profile/ProfilePage';



@Component({
  templateUrl: 'build/pages/landing/landing.html'
  
})
export class LandingPage {
  authStatus$: Observable<any>;

  authStatusSub$  : Subscription;

  loadingPopup: any;

  constructor(private platform: Platform, private nav: NavController, private loadingCtrl:  LoadingController, private ngRedux: NgRedux<any>) {};

  ngOnInit() {
    this.authStatus$ =  this.ngRedux.select(state=>state.getIn(['currentUser', 'status']))
    this.authStatusSub$ = this.authStatus$.subscribe((userStatus) => {
      switch(userStatus) {
        case 'AUTHENTICATED':
          if(!!this.loadingPopup){
          this.loadingPopup.dismiss();
        }
        this.nav.setRoot(ProfilePage);
          // this.nav.setRoot(HomePage);
        break;
        case 'ATTEMPTING':
          break;
        case 'ERROR':
          if(!!this.loadingPopup){
          this.loadingPopup.dismiss();
        }
          break;
        default:
          console.log('Unhandled authentication status');
      }
    })
  }
  ngOnDestroy() {
    if(!!this.authStatusSub$) {
      this.authStatusSub$.unsubscribe();
    }
  }

  fbLogin() {
    this.loadingPopup = this.loadingCtrl.create({
      content: 'Logging in...',
      dismissOnPageChange : true,
      duration: 1000,
    })
   this.loadingPopup.present();
    if(this.platform.is('cordova')) {
      this.ngRedux.dispatch(authActions.authDevice());
    } else {
      this.ngRedux.dispatch(authActions.authUser());
    }
  }
  goToTerms() {
    this.nav.push(TermsPage);
  }
}
