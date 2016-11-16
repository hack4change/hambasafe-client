import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from 'ionic-native';

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
  public phoneNumberList = [
    {
      phoneNumber : '2037234729',
    }
  ];

  constructor(public navCtrl: NavController) {}

  ngOnInit(){
  
  }

  ionViewDidLoad() {
    console.log('Hello Emergency Page');
  }

	goBack() {
		this.navCtrl.pop();
	}
  callNumber(phoneNumber) : void {
    CallNumber.callNumber(phoneNumber, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }
}
