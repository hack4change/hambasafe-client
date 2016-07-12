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
// import {authActions} from '../../actions/authActions';

/*
 * Pages
 */
import {TermsPage} from '../terms/TermsPage';

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
    trigger('genderCollapseState', [
      state('inactive', style({
        // backgroundColor: '#eee',
         height: '0',
        // transform: 'scale(0)'
      })),
      state('active',   style({
        // backgroundColor: '#cfd8dc',
        // transform: 'scale(1)'
        height: '*',
      })),
      transition('inactive => active', animate('250ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class RegistrationPage {
  // @ViewChild('myMap') mapChild;

  currentUser$      :   Observable<any>;
  validForm         :   boolean;
  aniState          :   string  = 'inactive';
  profilePicture    :   string;
  firstName         :   string;
  lastName          :   string;
  address           :   any;
  dateOfBirth       :   any;
  mobileNumber      :   string;
  email             :   string;
  confirmEmail      :   string;
  identification    :   string;
  termsAccepted     :   boolean = false;
  uploadPicture     :   string;
  isSilhouette      :   boolean;
  accessToken       :   string;

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

  constructor(private nav: NavController, private viewCtrl: ViewController, private ngRedux: NgRedux<any>, private zone: NgZone) { }

  ngOnInit() {
    // this.ngRedux.dispatch(authActions.authUser());
    this.currentUser$ = this.ngRedux.select((state)=> {
      return state.get('currentUser').toJS()
    })
    this.currentUser$.subscribe((userData)=> {
      this.zone.run(() => {
        if(!!userData) {
          this.firstName          = userData.firstName;
          this.lastName           = userData.lastName;
          if(!!userData.dateOfBirth) {
            this.dateOfBirth         = (new Date(userData.dateOfBirth)).toISOString();
          }
          this.email              = userData.email;
          this.gender             = userData.gender;
          if(this.gender) {
            var genderIndex = _.findIndex(this.genderOptions, {'name' : _.capitalize(this.gender)});
            if(genderIndex != -1) {
              this.genderOptions[genderIndex].selected = true;
            } else {
              this.genderOptions[this.genderOptions.length -1 ].selected = true;
            }
          }
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
      'profilePicture'  :   this.profilePicture,
			'firstName'	      :   this.firstName || 'George',//this.firstName,
			'lastName'		    :   this.lastName || 'Phillips',//this.lastName,
			'gender'			    :   _.find(this.gender, {'selected': true}) ? _.find(this.gender, {'selected': true}).name : 'Male',
      'address'         :   this.address || 'temp',
			'dateOfBirth'     :	  this.dateOfBirth || (new Date).toISOString(),//this.dateOfBirth,
      'mobileNumber'    :   this.mobileNumber || '0827643743',
      'email'           :   this.email || 'George@sum.such',
    }
    console.log(userData);
    //TODO: Validation
    this.ngRedux.dispatch(usersActions.createUser(userData));
  }
  // onInputFocus(e) {
  //   var selected = e.target.parentNode.parentNode.parentNode.parentNode;
  //   console.log(docselected);
  // }
  openLocation() {
    console.log('openy');
  }
  toggleGenderOpen() {
    this.genderSelectOpen = !this.genderSelectOpen;
    this.aniState = this.aniState == 'active' ? 'inactive' : 'active';
  }
  isGenderOpen() {
    return this.genderSelectOpen;
  }
	selectGender(option:string) {
    this.gender = option;
    this.genderHeader = option;
		for(var i = 0 ; i < this.genderOptions.length; i++){
			if(this.genderOptions[i].name !== option){
				_.set(this.genderOptions[i], 'selected', false);
			} else {
        this.genderOptions[i].selected =  !this.genderOptions[i].selected;
        if(!this.genderOptions[i].selected){
          this.genderHeader = 'Gender';
        } else {
          // this.genderSelectOpen = false;
        }
			}
		}
	}
  genderSelected() {
    return this.genderHeader === 'Gender';
  }
  openTerms() {
    this.termsAccepted = true;
    this.nav.push(TermsPage);
  }
}


