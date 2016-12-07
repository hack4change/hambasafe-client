import { Component, Input, OnInit } from '@angular/core';
import { BarcodeScanner } from 'ionic-native';

import {ParseManager} from '../../providers/parse-manager';

/*
  Generated class for the Checkin component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'checkin',
  templateUrl: 'checkin.html'
})
export class CheckinComponent implements OnInit {
  @Input() activityId : string = null;

  qrCode: string = 'sdasf askfasdifasdi[0hsa[fsadfsd]]';


  constructor(
    public parseManager: ParseManager
  ) {
    console.log('Hello Checkin Component');
    // this.text = 'Hello World';
  }

  /*
   *  Lifecycle hooks
   */
  ngOnInit() {
    this.qrCode = "{\
      activityId :" + this.activityId + ",\
    }";
  }
  checkIn(){
    console.log('checkIn');
    BarcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
      console.log(barcodeData);
      console.log(JSON.parse(barcodeData.text));
      var reqJson =JSON.parse(barcodeData.text);
      this.parseManager.checkIn(reqJson.userId, reqJson.activityId);
    }, (err) => {
      // An error occurred
    });
  }
}
