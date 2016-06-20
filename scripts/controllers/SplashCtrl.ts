app.controller('SplashCtrl', function ($scope, $location, EventService) {
  (function(){
  })()

  $scope.goToLanding = function() {

    $location.path("app/landing")
  }

  $scope.goToTerms = function() {

    $location.path("app/terms")
  }
});
