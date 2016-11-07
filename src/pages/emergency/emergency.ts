import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Emergency page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-emergency',
  templateUrl: 'emergency.html'
})
export class EmergencyPage implements OnInit {

  constructor(public navCtrl: NavController) {}

  ngOnInit(){
  
  }

  ionViewDidLoad() {
    console.log('Hello Emergency Page');
  }

	goBack() {
		this.navCtrl.pop();
	}
}
