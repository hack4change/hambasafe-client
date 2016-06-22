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
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var LandingPage_1 = require("./home/LandingPage");
var MyApp = (function () {
    function MyApp(platform) {
        this.platform = platform;
        this.rootPage = LandingPage_1.LandingPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            ionic_native_1.StatusBar.styleDefault();
        });
    }
    MyApp = __decorate([
        core_1.Component({
            template: '<ion-nav [root]="rootPage"></ion-nav>'
        }), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], MyApp);
    return MyApp;
}());
exports.MyApp = MyApp;
ionic_angular_1.ionicBootstrap(MyApp);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IkM6L2hhY2s0Y2hhbmdlL2hhbWJhc2FmZS1jbGllbnQvYXBwLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsOEJBQXVDLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZELDZCQUF3QixjQUFjLENBQUMsQ0FBQTtBQUN2Qyw0QkFBMEIsb0JBQW9CLENBQUMsQ0FBQTtBQU0vQztJQUlFLGVBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDcEMsSUFBSSxDQUFDLFFBQVEsR0FBRyx5QkFBVyxDQUFDO1FBRTVCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDcEIsZ0VBQWdFO1lBQ2hFLGlFQUFpRTtZQUNqRSx3QkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWZIO1FBQUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSx1Q0FBdUM7U0FDbEQsQ0FBQzs7YUFBQTtJQWNGLFlBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLGFBQUssUUFhakIsQ0FBQTtBQUVELDhCQUFjLENBQUMsS0FBSyxDQUFDLENBQUEifQ==