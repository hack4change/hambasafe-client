app.factory("LocalStorage", ['$window',
  function ($window) {
    var _facebookAuth = null
    var _profileId = 1;
    return {



      set facebookAuth(value) {
        _facebookAuth = value;
      },
      get facebookAuth() {
        return _facebookAuth;
      },


    };
  }]);
