"use strict";
var LandingPage = (function () {
    function LandingPage(Facebook, ProfileService, $location) {
        this.Facebook = Facebook;
        this.ProfileService = ProfileService;
        this.$location = $location;
    }
    LandingPage.prototype.getLoginStatus = function () {
        this.Facebook.logout();
        this.Facebook.getLoginStatus(function (response) {
            console.log(response);
            if (response.status === 'connected') {
                this.$location.path('app/home');
            }
            else {
                this.loggedIn = false;
            }
        });
    };
    ;
    LandingPage.prototype.fbLogin = function () {
        this.Facebook.login(function (response) {
            console.log(response);
            this.ProfileService.setProfileFromFacebook(response);
            this.$location.path('app/registration');
        });
    };
    return LandingPage;
}());
exports.LandingPage = LandingPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZGluZ1BhZ2UuanMiLCJzb3VyY2VSb290IjoiQzovUHJvamVjdC9Jb25pYzJTcGlrZS9Jb25pYzJTcGlrZS9hcHAvIiwic291cmNlcyI6WyJob21lL0xhbmRpbmdQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUdFLHFCQUFxQixRQUFRLEVBQVUsY0FBYyxFQUFVLFNBQVM7UUFBbkQsYUFBUSxHQUFSLFFBQVEsQ0FBQTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUFBO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBQTtJQUFJLENBQUM7SUFDN0Usb0NBQWMsR0FBZDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsVUFBVSxRQUFRO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUVwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7SUFFRCw2QkFBTyxHQUFQO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxRQUFRO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQXhCWSxtQkFBVyxjQXdCdkIsQ0FBQSJ9