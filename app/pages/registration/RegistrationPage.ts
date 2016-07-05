import {Component, NgZone} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {Modal, NavController, ViewController} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/**
 *  Actions
 */
import {usersActions} from '../../actions/usersActions';
import {authActions} from '../../actions/authActions';

/*
 * Components
 */
import {MapComponent} from '../../components/map/map.component.ts';

@Component({
  templateUrl: 'build/pages/registration/registration.html',
  directives : [
    MapComponent,
  ]
})
export class RegistrationPage {
  // @ViewChild('myMap') mapChild;

  validForm       :   boolean;
  firstName       :   string;
  lastName        :   string;
  birthday        :   any;
  location        :   any;
  mobileNumber    :   string;
  email           :   string;
  confirmEmail    :   string;
  identification  :   string;
  terms           :   string;
  profilePicture  :   string;
  uploadPicture   :   string;
  isSilhouette    :   boolean;
	gender					: 	string = 'Gender';
  currentUser$    :   Observable<any>;

  constructor(private nav: NavController, private viewCtrl: ViewController, private ngRedux: NgRedux<any>, private zone: NgZone) { }

  ngOnInit() {
    this.ngRedux.dispatch(authActions.authUser());
    this.currentUser$ = this.ngRedux.select((state)=> {
      return state.get('currentUser').toJS()
    })
    this.currentUser$.subscribe((userData)=> {
      this.zone.run(() => {
        if(!!userData) {
          this.firstName          = userData.firstName;
          this.lastName           = userData.lastName;
          if(userData.birthday !== '') {
            this.birthday         = (new Date(userData.birthday)).toISOString();
          }
          this.email              = userData.email;
          this.gender             = userData.gender;
          this.profilePicture     = userData.picture;
          this.isSilhouette       = userData.isSilhouette;
        }
      })

    })
  }
	
	goBack() {
		this.nav.pop();
	}


	guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}
	createUser() {
    var userData = {
      'Id'					  : Math.floor((Math.random() * 429496) + 1),
			'Token'				  : this.guid(),
			'FirstNames'	  : 'George',//this.firstName,
			'LastName'		  : 'Phillips',//this.lastName,
			'Gender'			  : 'Male',//this.gender,
			'DateOfBirth'   :	(new Date).toISOString(),//this.dateOfBirth,
      'MobileNumber'  : '0827643743',//this.mobileNumber,
      'EmailAddress'  : 'George@sum.such',//this.emailAddress,
    }
    this.ngRedux.dispatch(usersActions.createUser(userData));
  }
  // onInputFocus(e){
  //   var selected = e.target.parentNode.parentNode.parentNode.parentNode;
  //   console.log(docselected);
  // }
  openLocation(){
    console.log('openy');
  }
  
}


