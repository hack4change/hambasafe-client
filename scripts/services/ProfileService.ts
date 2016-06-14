app.service('ProfileService', function ($http, $q, $rootScope, config, localStorageService) {
	var base = config.baseServiceURL + "/v1/";
	var profileKey = "profileKey";

	return {
		setProfileFromFacebook: function (profile) {
      console.log(profile);
			localStorageService.set(profileKey, profile);
		},
		getAll: function (id) {
			return $http.get(base + 'users', config);
		},
		getById: function (id) {
			var val = id || localStorage.getItem(profileKey);
			return $http.get(base + 'users?username=' + val, config);

		},
		getByUsername: function (id) {
			var val = id || localStorage.getItem(profileKey);
			return $http.get(base + 'users?username=' + val, config);
		},
		get: function (id) {
			var val = id || localStorage.getItem(profileKey);
			return $http.get(base + 'user?id=' + val, config);
		},
		getProfileId: function() {

		},
		doFBLogin: function() {
			var defer = $q.defer();
      FB.getLoginStatus(function(response:any) {
        if(response.status !== 'connected') {
          FB.login(function(response: any) {
            if(response.status === 'connected') {
              this.setProfileFromFacebook(response.authResponse);
              $rootScope.loggedIn = true;
            }
            defer.resolve(response.status);
          });
        } else {
          this.setProfileFromFacebook(response.authResponse);
          $rootScope.loggedIn = true;
          defer.resolve('connected');
        }
      }.bind(this));
			return defer.promise;
		},
		getRegistrationData: function() {
			var defer = $q.defer();
			FB.api('/me', 'get', {
        'fields': [
          'first_name',
          'last_name',
          'birthday',
          'gender',
          'email',
        ]
      }, function (response) {
				console.log(response);
        var profile = {
          firstName     : response['first_name'],
          lastName      : response['last_name'],
          dateOfBirth   : response['birthday'],
          gender        : response['gender'],
          email         : response['email'],
        }
        $rootScope.currentUser = response['id'];
				defer.resolve(profile);
			});
			return defer.promise;
		},
    logout(){
      this.setProfileFromFacebook('');
    }
	};
});
