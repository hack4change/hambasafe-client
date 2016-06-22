"use strict";
var ProfileCtrlComponent = (function () {
    function ProfileCtrlComponent(ProfileService) {
        ProfileService.get(1).then(function (response) {
            this.user = response.data;
        });
    }
    return ProfileCtrlComponent;
}());
exports.ProfileCtrlComponent = ProfileCtrlComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZmlsZUN0cmwuanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJwcm9maWxlL1Byb2ZpbGVDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUVFLDhCQUFZLGNBQWM7UUFDeEIsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxRQUFRO1lBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksNEJBQW9CLHVCQVFoQyxDQUFBIn0=