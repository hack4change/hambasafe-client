"use strict";
var RegistrationCtrl = (function () {
    function RegistrationCtrl($scope, $stateParams, ProfileService) {
        ProfileService.getFaceBookProfile().then(function (profile) {
            $scope.user = profile;
        });
    }
    return RegistrationCtrl;
}());
exports.RegistrationCtrl = RegistrationCtrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVnaXN0cmF0aW9uQ3RybC5qcyIsInNvdXJjZVJvb3QiOiJDOi9Qcm9qZWN0L0lvbmljMlNwaWtlL0lvbmljMlNwaWtlL2FwcC8iLCJzb3VyY2VzIjpbImhvbWUvUmVnaXN0cmF0aW9uQ3RybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFDRSwwQkFBWSxNQUFNLEVBQUUsWUFBWSxFQUFFLGNBQWM7UUFDOUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsT0FBTztZQUN4RCxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSCx1QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksd0JBQWdCLG1CQU81QixDQUFBIn0=