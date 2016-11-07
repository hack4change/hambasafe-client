import {
  Component,
  OnInit,
} from '@angular/core';
import {
  NavController
} from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnInit {

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(){
  
  }
	
	goBack(){
		this.navCtrl.pop();
	}

}
