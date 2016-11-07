import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Terms page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html'
})
export class TermsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Terms Page');
  }
	goBack(){
		this.navCtrl.pop();
	}

}
