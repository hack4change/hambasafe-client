import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {

  constructor(private nav: NavController) {};
	
	goBack(){
		this.nav.pop();
	}
}
