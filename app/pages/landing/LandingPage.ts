import {Component, OnInit} from '@angular/core';
import {Platform, NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {Observable} from 'rxjs';
import {NgRedux} from 'ng2-redux';

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
export class LandingPage 
{
  authStatus$: Observable<any>;
  created$: Observable<any>;

  constructor(private platform: Platform, private nav: NavController, private ngRedux: NgRedux<any>) {};

  ngOnInit(){
    this.authStatus$ =  this.ngRedux.select(state=>state.getIn(['currentUser', 'status']))
    this.authStatus$.subscribe((userStatus) => {
      switch(userStatus) {
        case 'AUTHENTICATED':
          this.nav.setRoot(ProfilePage);
          // this.nav.setRoot(HomePage);
        break;
        case 'ATTEMPTING':
          break;
        case 'ERROR':
          break;
        default:
          console.log('Unhandled authentication status');
      }
    })
    if(this.platform.is('cordova')) {
      this.ngRedux.dispatch(authActions.authDevice());
    } else {
      this.ngRedux.dispatch(authActions.authUser());
    }
  }

  fbLogin() {
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
