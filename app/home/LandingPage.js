"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var LandingPage = (function () {
    function LandingPage() {
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
    LandingPage = __decorate([
        core_1.Component({
            templateUrl: 'build/home/landing.html'
        }), 
        __metadata('design:paramtypes', [])
    ], LandingPage);
    return LandingPage;
}());
exports.LandingPage = LandingPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFuZGluZ1BhZ2UuanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJob21lL0xhbmRpbmdQYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFJeEM7SUFHRTtJQUFpQixDQUFDO0lBQ2xCLG9DQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFVBQVUsUUFBUTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFFcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDbEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O0lBRUQsNkJBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsUUFBUTtZQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUExQkg7UUFBQyxnQkFBUyxDQUFDO1lBQ1QsV0FBVyxFQUFFLHlCQUF5QjtTQUN2QyxDQUFDOzttQkFBQTtJQXlCRixrQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksbUJBQVcsY0F3QnZCLENBQUEifQ==