import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Latest page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-latest',
  templateUrl: 'latest.html'
})
export class LatestPage implements OnInit {

  constructor(public navCtrl: NavController) {}

  ngOnInit(){
  
  }

  ionViewDidLoad() {
    console.log('Hello Latest Page');
  }

  goCreateAnEvent = function () {
  }

  goHambaSafe = function () {
  }
}

