app.controller('RegistrationCtrl', function ($rootScope, $scope, $window, $stateParams, ProfileService, ionicDatePicker) {
  (function(){
		$scope.genders = [
			'male',
			'female',
			'other',
		]
    $scope.genderOpen = false;
  })()
	angular.element(document).ready(function(){
    ProfileService.getRegistrationData().then(function (profile) {
      $scope.user = profile;
      console.log(profile);
    })
	})


	var pickDateObj = {
		callback: function (val) {  //Mandatory
			$scope.user.dateOfBirth = new Date(val);
		},
		disabledDates: [            //Optional
			new Date(2016, 2, 16),
			new Date(2015, 3, 16),
			new Date(2015, 4, 16),
			new Date(2015, 5, 16),
			new Date('Wednesday, August 12, 2015'),
			new Date("08-16-2016"),
			new Date(1439676000000)
		],
		from: new Date(2012, 1, 1), //Optional
		to: new Date(2016, 10, 30), //Optional
		inputDate: new Date(),      //Optional
		mondayFirst: true,          //Optional
		disableWeekdays: [0],       //Optional
		closeOnSelect: false,       //Optional
		templateType: 'popup'       //Optional
	};

	$scope.openDatePicker = function(){
		ionicDatePicker.openDatePicker(pickDateObj);
	};




  $scope.isGenderOpen = function() {
    return $scope.genderOpen;
  }
  $scope.toggleGenderOpen = function() {
    $scope.genderOpen = !$scope.genderOpen;  
  }





  /*
   *  DoB
   *  Email
   *  Profile Picture
   */
  $scope.doRegister = function (valid) {
    $scope.submitted = true;
    $scope.updatePasswordError();

    if (valid) {
      //LoadingSvc.show();
      //Users.signup({}, $scope.loginData
      //  , function (user) {
      //    LocalStorage.user = user;
      //    $scope.authentication.user = user;
      //    $location.path('valuations');
      //    LoadingSvc.hide();
      //  }
      //  , function (errorResponse) {
      //    console.log('error signing user up');
      //    $scope.error = errorResponse.data.message;
      //    LoadingSvc.hide();
      //  });
    } else {
      $scope.error = 'Please fill in all required fields';
    }
  }
});
