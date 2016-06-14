app.controller('LandingCtrl', function ($scope, $stateParams, $location, $window, $ionicLoading, ProfileService) {
  (function(){
    console.log(angular.element($window));
    angular.element($window).on('load', function() {
      FB.getLoginStatus(function(response:any) {
        if(response.status === "connected") {
          $location.path('app/registration');
        }
      })
    })
  })()
  $scope.fbLogin = function () {
		console.log('fbLogin');
		ProfileService.doFBLogin().then(function(response){
			console.log(response);
      if(response === "connected") {
        $location.path('app/registration');
      } else {
        $ionicLoading.show({
          template : 'Failed, please try again.',
          duration: 1000
        })
      }
		})
  };
});
