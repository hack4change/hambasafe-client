import {Component, OnInit} from '@angular/core';
import {Platform, NavController, LoadingController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

// /*
//  *  Actions
//  */
import {AuthActions} from '../../actions/auth.actions';

// /*
//  *  Pages
//  */
import {HomePage} from '../home/home';
import {TermsPage} from '../terms/terms';

// //TODO: REMOVE
// import {SearchPage} from '../search/SearchPage';
// import {RegistrationPage} from '../registration/RegistrationPage';
// import {ProfilePage} from '../profile/ProfilePage';


/*
  Generated class for the Landing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html'
})
export class LandingPage implements OnInit {
  authStatus$: Observable<any>;

  authStatusSub$  : Subscription;

  loadingPopup: any;

  constructor(private platform: Platform, private nav: NavController, private loadingCtrl:  LoadingController, private ngRedux: NgRedux<any>, private authActions: AuthActions) {};

  ngOnInit() {
    this.authStatus$ =  this.ngRedux.select(['currentUser', 'status'])
    this.authStatusSub$ = this.authStatus$.subscribe((userStatus) => {
      console.log('User Status');
      console.log(userStatus);
      switch(userStatus) {
        case 'AUTHENTICATED':
          console.log('AUTHENTICATED');
          if(!!this.loadingPopup){
          this.loadingPopup.dismiss();
        }
        // this.nav.setRoot(ProfilePage);
          this.nav.setRoot(HomePage);
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
    })
    this.loadingPopup.present();
    if(this.platform.is('cordova')) {
      this.ngRedux.dispatch(this.authActions.authDevice());
    } else {
      this.ngRedux.dispatch(this.authActions.authUser());
    }
  }
  goToTerms() {
    this.nav.push(TermsPage);
  }
}
