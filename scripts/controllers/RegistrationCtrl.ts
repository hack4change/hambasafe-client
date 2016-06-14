app.controller('RegistrationCtrl', function ($rootScope, $scope, $window, $stateParams, ProfileService) {
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
