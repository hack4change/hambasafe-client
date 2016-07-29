declare var uploadcare;

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
import {Modal, NavController, NavParams, ViewController, Loading} from 'ionic-angular';
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
 * Pipes
 */
import {capitalize} from '../../utils/capitalize';

/*
 * Components
 */
import {MapComponent} from '../../components/map/map.component.ts';

@Component({
  templateUrl: 'build/pages/registration/registration.html',
  directives : [
    MapComponent,
  ],
  pipes : [
    capitalize 
  ],
  animations: [
    trigger('genderCollapseState', [
      state('inactive', style({
        // backgroundColor: '#eee',
         height: '0',
        // transform: 'scale(0)'
      })),
      state('active', style({
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

  createModal       :   any;
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
  isEdit            :   boolean = false;
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

  constructor(private nav: NavController, private params: NavParams, private viewCtrl: ViewController, private ngRedux: NgRedux<any>, private zone: NgZone) { }

  ngOnInit() {
    this.isEdit = this.params.data.edit? this.params.data.edit : false;
    if(!!this.isEdit) {
      this.termsAccepted = true;
    }
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
            console.log(userData.dateOfBirth);
            if(typeof(userData.dateOfBirth) === 'object'){
              this.dateOfBirth         = (new Date(userData.dateOfBirth.iso)).toISOString();
            } else {
              this.dateOfBirth         = (new Date(userData.dateOfBirth)).toISOString();
            }
          }
          this.email              = userData.email;
          this.gender             = userData.gender;
          if(this.gender) {
            var genderIndex = _.findIndex(this.genderOptions, {'name' : _.capitalize(this.gender)});
            if(genderIndex != -1) {
              this.genderOptions[genderIndex].selected = true;
              this.genderHeader = this.genderOptions[genderIndex].name;
              this.gender = _.capitalize(this.gender);
            } else {
              this.genderOptions[this.genderOptions.length -1 ].selected = true;
            }
          }
          this.profilePicture     = userData.profilePicture;
          this.isSilhouette       = userData.isSilhouette;
          this.mobileNumber       = userData.mobileNumber;
        }
        switch(userData.status){
          case 'CREATING':
            break;
          case 'CREATE_SUCCESS':
            break;
          case 'CREATE_ERROR':
            // this.createModal = Loading.create({
            // content: userData.message,
            // // spinner: 'crescent',
            // dismissOnPageChange : true,
            // duration: 2000,
          // })

            break;
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
			'firstName'	      :   this.firstName,
			'lastName'		    :   this.lastName,//this.lastName,
			'gender'			    :   this.gender,
      // 'address'         :   this.address,
			'dateOfBirth'     :	  this.dateOfBirth,//this.dateOfBirth,
      'mobileNumber'    :   this.mobileNumber,
      'email'           :   this.email,
    }
    if(!this.profilePicture){
        this.nav.present( Loading.create({
        content: 'Please add a profile picture on facebook',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }));
      return;
    } else if(!this.firstName) {
      this.nav.present(Loading.create({
        content: 'Firstname... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    } else if(!this.lastName) {
      this.nav.present(Loading.create({
        content: 'Surname... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    } else if(!this.genderHeader || !(this.genderHeader == 'Male' || this.genderHeader == 'Female' || this.genderHeader == 'Other')) {
      this.nav.present(Loading.create({
        content: 'Gender... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    } else if(!this.dateOfBirth || !(new Date(this.dateOfBirth))) {
      this.nav.present(Loading.create({
        content: 'Date Of Birth... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    } else if(!this.mobileNumber) {
      this.nav.present(Loading.create({
        content: 'mobile number... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    } else if(!this.email) {
      this.nav.present(Loading.create({
        content: 'email... please!',
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
    } else if(this.confirmEmail !== this.email) {
      this.nav.present(Loading.create({
        content: "The email fields don't match! O.o",
        spinner: 'hide',
        dismissOnPageChange : true,
        duration: 1000,
      }))
      return;
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
        this.genderOptions[i].selected = !this.genderOptions[i].selected;
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
  getProfilePicture(){
    uploadcare.openDialog(null, {
      // crop: "disabled",
      previewStep: true,
      imagesOnly: true
    }).done((file)=>{
      file.promise().done((fileInfo)=>{
        // console.log(fileInfo.cdnUrl);
        console.log(fileInfo);
        this.profilePicture = fileInfo.cdnUrl;
      });
    });
  }
  getIdentificationDocument(){
    uploadcare.openDialog(null, {
      // crop: "disabled",
      previewStep: true,
      imagesOnly: true
    }).done((file)=>{
      file.promise().done((fileInfo)=>{
        // console.log(fileInfo.cdnUrl);
        console.log(fileInfo);
        this.profilePicture = fileInfo.cdnUrl;
      });
    });
  }
}


