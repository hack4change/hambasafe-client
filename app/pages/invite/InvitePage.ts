import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'build/pages/invite/invite.html'
})
export class InvitePage {

  constructor(private nav: NavController) {};
	
	goBack(){
		this.nav.pop();
	}
}
