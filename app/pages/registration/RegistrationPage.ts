import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/**
 *  Actions
 */
import {usersActions} from '../../actions/usersActions';

@Component({
  templateUrl: 'build/pages/registration/registration.html'
})
export class RegistrationPage {

  validForm       :   boolean;
  firstName       :   string;
  lastName        :   string;
  dateOfBirth     :   Date;
  location        :   any;
  mobileNumber    :   string;
  emailAddress    :   string;
  confirmEmail    :   string;
  identification  :   string;
  terms           :   string;
	gender					: 	string = 'male';

  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};
	
	goBack() {
		this.nav.pop();
	}


	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}
	createUser() {
    var userData = {
      'Id'					  : Math.floor((Math.random() * 429496) + 1),
			'Token'				  : this.guid(),
			'FirstNames'	  : 'George',//this.firstName,
			'LastName'		  : 'Phillips',//this.lastName,
			'Gender'			  : 'Male',//this.gender,
			'DateOfBirth'   :	(new Date).toISOString(),//this.dateOfBirth,
      'MobileNumber'  : '0827643743',//this.mobileNumber,
      'EmailAddress'  : 'George@sum.such',//this.emailAddress,
    }
    this.ngRedux.dispatch(usersActions.createUser(userData));
  }
}


