import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Rating page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html'
})
export class RatingPage implements OnInit {

  constructor(public navCtrl: NavController) {}

  ngOnInit(){
  
  }

  ionViewDidLoad() {
    console.log('Hello Rating Page');
  }
	goBack(){
		this.navCtrl.pop();
	}

}
