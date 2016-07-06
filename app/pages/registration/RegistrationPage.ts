import {
  Component,
  NgZone,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
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
  ],
  animations: [
    trigger('genderVisiState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(0)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class RegistrationPage {
  // @ViewChild('myMap') mapChild;

  validForm         :   boolean;
  firstName         :   string;
  lastName          :   string;
  birthday          :   any;
  location          :   any;
  mobileNumber      :   string;
  email             :   string;
  confirmEmail      :   string;
  identification    :   string;
  terms             :   string;
  profilePicture    :   string;
  uploadPicture     :   string;
  isSilhouette      :   boolean;
  genderSelectOpen  :   boolean = false;
  genderHeader      :   string  = "Gender";
	gender					  : 	string;
  genderOptions     :   any = [ 
    {
      'name'      : 'Male',
      'selected'  : false,
    },
    {
      'name'      : 'Female',
      'selected'  : false,
    },
    {
      'name'      : 'Other',
      'selected'  : false,
    },
  ];
  currentUser$      :   Observable<any>;

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
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	createUser() {
    var userData = {
      'Id'					  : Math.floor((Math.random() * 429496) + 1),
			'Token'				  : this.guid(),
			'FirstNames'	  : this.firstName || 'George',//this.firstName,
			'LastName'		  : this.lastName || 'Phillips',//this.lastName,
			'Gender'			  : 'Male',//this.gender,
			'DateOfBirth'   :	this.birthday || (new Date).toISOString(),//this.dateOfBirth,
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
  toggleGenderOpen() {
    this.genderSelectOpen = !this.genderSelectOpen;
  }
  isGenderOpen() {
    return this.genderSelectOpen;
  }
	selectGender(option:string) {
    this.gender = option;
    this.genderHeader = option;
    console.log(option);
		for(var i = 0 ; i < this.genderOptions.length; i++){
     console.log(this.genderOptions[i].name);
			if(this.genderOptions[i].name !== option){
				_.set(this.genderOptions[i], 'selected', false);
			} else {
        this.genderOptions[i].selected =  !this.genderOptions[i].selected;
        if(!this.genderOptions[i].selected){
          this.genderHeader = 'Gender';
        }
			}
		}
	}
}


