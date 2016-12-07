import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit {

  public lat : number = null;
  public lng : number = null;
  public infoText : string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ngOnInit() {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.infoText = this.navParams.get('infoText');
    console.log(this.lat);
    console.log(this.lng);
    console.log(this.infoText);
  }

  ionViewDidLoad() {
    console.log('Hello MapPage Page');
  }

}
