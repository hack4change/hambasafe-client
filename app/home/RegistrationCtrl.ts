export class RegistrationCtrl{
  constructor($scope, $stateParams, ProfileService) {
    ProfileService.getFaceBookProfile().then(function (profile) {
      $scope.user = profile;
    });
  }
 
}
