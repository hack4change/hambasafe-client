export class LandingPage 
{
  loggedIn;
  constructor( private Facebook, private ProfileService, private $location) { }
  getLoginStatus  () {
    this.Facebook.logout();
    this. Facebook.getLoginStatus(function (response) {
      console.log(response);
      if (response.status === 'connected') {

        this.$location.path('app/home');
      } else {
        this.loggedIn = false;
      }
    });
  };

  fbLogin() {
    this.Facebook.login(function (response) {
      console.log(response);
      this.ProfileService.setProfileFromFacebook(response);
      this.$location.path('app/registration');
    });
  }
}
