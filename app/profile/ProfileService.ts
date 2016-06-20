
export class ProfileService {
  static profileKey = "profileKey";
  base: string;
  constructor(private $http, private config, private localStorageService, private $q, private Facebook) {
    this.base = config.baseServiceURL + "/v1/";
   

  }

  setProfileFromFacebook (profile) {
    this.localStorageService.set(ProfileService.profileKey, profile);
  }
  getAll(id) {
    return this.$http.get(this.base + 'users', this.config);
  }
  getById (id) {
    var val = id || localStorage.getItem(ProfileService.profileKey);

    return this.$http.get(this.base + 'users?username=' + val, this.config);

  }
  getByUsername (id) {
    var val = id || localStorage.getItem(ProfileService.profileKey);

    return this.$http.get(this.base + 'users?username=' + val, this.config);
  }
  get (id) {
    var val = id || localStorage.getItem(ProfileService.profileKey);

    return this.$http.get(this.base + 'user?id=' + val, this.config);

  }
  getProfileId () {

  }
  getFaceBookProfile () {
    var defer = this.$q.defer();

    this.Facebook.api('/me', function (response) {
      console.log(response);
      var prof = {
        FirstNames: response.first_name,
        LastName: response.last_name,
        Gender: response.gender
      };
      defer.resolve(prof);
    });
    return defer.promise;

  }
}
