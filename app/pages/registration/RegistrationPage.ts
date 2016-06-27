import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'build/pages/registration/registration.html'
})
export class RegistrationPage {

  validForm       :   boolean;
  firstName       :   string;
  lastName        :   string;
  dateOfBirth     :   Date;
  location        :   any;
  phoneNumber     :   string;
  email           :   string;
  confirmEmail    :   string;
  identification  :   string;
  terms           :   string;

  constructor(private nav: NavController) {};
	
	goBack(){
		this.nav.pop();
	}
}


