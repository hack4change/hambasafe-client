import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';

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


@Component({
  templateUrl: 'build/pages/landing/landing.html'
})
export class LandingPage 
{
  authStatus$: Observable<any>;
  created$: Observable<any>;

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};

  ngOnInit(){
    this.authStatus$ =  this.ngRedux.select(state=>state.getIn(['currentUser', 'status']))
    this.authStatus$.subscribe( userStatus => {
      switch(userStatus){
        case 'AUTHENTICATED':
          // this.nav.setRoot(HomePage);
					this.nav.setRoot(SearchPage);
          break;
        case 'ATTEMPTING':
          break;
        case 'ERROR':
          break;
        default:
          console.log('Unhandled authentication status');
      }
    })
    this.ngRedux.dispatch(authActions.authUser());
  }

  fbLogin() {
    this.ngRedux.dispatch(authActions.authUser());
  }
  goToTerms() {
    this.nav.push(TermsPage);
  }
}
