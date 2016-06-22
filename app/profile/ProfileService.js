"use strict";
var ProfileService = (function () {
    function ProfileService($http, config, localStorageService, $q, Facebook) {
        this.$http = $http;
        this.config = config;
        this.localStorageService = localStorageService;
        this.$q = $q;
        this.Facebook = Facebook;
        this.base = config.baseServiceURL + "/v1/";
    }
    ProfileService.prototype.setProfileFromFacebook = function (profile) {
        this.localStorageService.set(ProfileService.profileKey, profile);
    };
    ProfileService.prototype.getAll = function (id) {
        return this.$http.get(this.base + 'users', this.config);
    };
    ProfileService.prototype.getById = function (id) {
        var val = id || localStorage.getItem(ProfileService.profileKey);
        return this.$http.get(this.base + 'users?username=' + val, this.config);
    };
    ProfileService.prototype.getByUsername = function (id) {
        var val = id || localStorage.getItem(ProfileService.profileKey);
        return this.$http.get(this.base + 'users?username=' + val, this.config);
    };
    ProfileService.prototype.get = function (id) {
        var val = id || localStorage.getItem(ProfileService.profileKey);
        return this.$http.get(this.base + 'user?id=' + val, this.config);
    };
    ProfileService.prototype.getProfileId = function () {
    };
    ProfileService.prototype.getFaceBookProfile = function () {
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
    };
    ProfileService.profileKey = "profileKey";
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZVNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJwcm9maWxlL1Byb2ZpbGVTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQTtJQUdFLHdCQUFvQixLQUFLLEVBQVUsTUFBTSxFQUFVLG1CQUFtQixFQUFVLEVBQUUsRUFBVSxRQUFRO1FBQWhGLFVBQUssR0FBTCxLQUFLLENBQUE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFBO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFBO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBQTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQUE7UUFDbEcsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztJQUc3QyxDQUFDO0lBRUQsK0NBQXNCLEdBQXRCLFVBQXdCLE9BQU87UUFDN0IsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFDRCwrQkFBTSxHQUFOLFVBQU8sRUFBRTtRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELGdDQUFPLEdBQVAsVUFBUyxFQUFFO1FBQ1QsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFMUUsQ0FBQztJQUNELHNDQUFhLEdBQWIsVUFBZSxFQUFFO1FBQ2YsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNELDRCQUFHLEdBQUgsVUFBSyxFQUFFO1FBQ0wsSUFBSSxHQUFHLEdBQUcsRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRW5FLENBQUM7SUFDRCxxQ0FBWSxHQUFaO0lBRUEsQ0FBQztJQUNELDJDQUFrQixHQUFsQjtRQUNFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RCLElBQUksSUFBSSxHQUFHO2dCQUNULFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVTtnQkFDL0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUFTO2dCQUM1QixNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07YUFDeEIsQ0FBQztZQUNGLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUV2QixDQUFDO0lBaERNLHlCQUFVLEdBQUcsWUFBWSxDQUFDO0lBaURuQyxxQkFBQztBQUFELENBQUMsQUFsREQsSUFrREM7QUFsRFksc0JBQWMsaUJBa0QxQixDQUFBIn0=