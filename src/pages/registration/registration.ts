declare var uploadcare;

import {
  Component,
  NgZone,
  OnInit,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import {
  NavController,
  NavParams,
  ViewController,
  LoadingController
} from 'ionic-angular';
import {
  FormBuilder, 
  FormGroup, 
  Validators
} from '@angular/forms';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {
  Observable,
  Subscription
} from 'rxjs';
import {
  Map
} from 'immutable';

/**
 *  Actions
 */
import {UserActions} from '../../actions/user.actions';

/*
 * Pages
 */
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
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
export class RegistrationPage implements OnInit {
  // @ViewChild('myMap') mapChild;

  currentUser$      :   Observable<any>;

  currentUserSub$   :   Subscription;

  registrationForm  : FormGroup;

  createModal       :   any;
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
  isInit            :   boolean = true;
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

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private params: NavParams, 
    private viewCtrl: ViewController,
    private ngRedux: NgRedux<any>,
    private zone: NgZone,
    private userActions : UserActions,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.isEdit = this.params.data.edit? this.params.data.edit : false;
    if(!!this.isEdit) {
      this.termsAccepted = true;
    }
    this.currentUser$ = this.ngRedux.select('currentUser')
    .map((currentUser: Map<string, any>) => {
      return currentUser.toJS();
    });
    this.registrationForm = this.formBuilder.group({
      // profilePicture: [
      //   "",
      //   Validators.compose([
      //     Validators.required
      //   ]),
      // ],
      firstName: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      gender: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      mobileNumber: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      dateOfBirth: [
        "",
        Validators.compose([
          Validators.required
        ]),
      ],
      email: [
        "",
        Validators.compose([
          Validators.minLength(40),
          Validators.maxLength(400),
          Validators.required
        ]),
      ],
      confirmEmail: [
        "",
        Validators.compose([
          // DistanceValidator.isValid,
          Validators.required
        ]),
      ],
    });
    this.currentUserSub$ = this.currentUser$.subscribe((userData) => {
      this.zone.run(() => {
        if(!!userData && this.isInit) {
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
              this.genderOptions[this.genderOptions.length - 1].selected = true;
            }
          }
          this.profilePicture     = userData.profilePicture;
          this.isSilhouette       = userData.isSilhouette;
          this.mobileNumber       = userData.mobileNumber;
          this.isInit = false;
        }
        switch(userData.status){
          case 'CREATING':
            break;
          case 'CREATE_SUCCESS':
            break;
          case 'CREATE_ERROR':
            // this.createModal = this.loadingCtrl.create({
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

  ngOnDestroy() {
    console.log('Destroying Registration Subscription');
    if(!!this.currentUserSub$){ 
      this.currentUserSub$.unsubscribe();
    }
  }
	
  goBack() {
    console.log('GoBack')
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    } else {
      // this.navCtrl.setRoot(HomePage);
    }
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
			'lastName'		    :   this.lastName,
			'gender'			    :   this.gender,
			'dateOfBirth'     :	  this.dateOfBirth,
      'mobileNumber'    :   this.mobileNumber,
      'email'           :   this.email,
    }
    // if(!this.profilePicture){
    //   this.loadingCtrl.create({
    //     content: 'Please add a profile picture on facebook',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(!this.firstName) {
    //   this.loadingCtrl.create({
    //     content: 'Firstname... please!',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(!this.lastName) {
    //   this.loadingCtrl.create({
    //     content: 'Surname... please!',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(!this.genderHeader || !(this.genderHeader == 'Male' || this.genderHeader == 'Female' || this.genderHeader == 'Other')) {
    //   this.loadingCtrl.create({
    //     content: 'Gender... please!',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(!this.dateOfBirth || !(new Date(this.dateOfBirth))) {
    //   this.loadingCtrl.create({
    //     content: 'Date Of Birth... please!',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(!this.mobileNumber) {
    //   this.loadingCtrl.create({
    //     content: 'mobile number... please!',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(!this.email) {
    //   this.loadingCtrl.create({
    //     content: 'email... please!',
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // } else if(this.confirmEmail !== this.email) {
    //   this.loadingCtrl.create({
    //     content: "The email fields don't match! O.o",
    //     spinner: 'hide',
    //     dismissOnPageChange : true,
    //     duration: 1000,
    //   }).present();
    //   return;
    // }
    console.log(userData);
    //TODO: Validation
    this.ngRedux.dispatch(this.userActions.createUser(userData));
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
    this.navCtrl.push(TermsPage);
  }
  getProfilePicture(){
    uploadcare.openDialog(null, {
      crop: "1:1",
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


