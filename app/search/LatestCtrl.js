"use strict";
var LatestComponent = (function () {
    function LatestComponent($location) {
        this.$location = $location;
        this.goCreateAnEvent = function () {
            this.$location.path('app/registration');
        };
        this.goHambaSafe = function () {
            this.$location.path('app/eventdetail/TEMP');
        };
    }
    return LatestComponent;
}());
exports.LatestComponent = LatestComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF0ZXN0Q3RybC5qcyIsInNvdXJjZVJvb3QiOiJDOi9oYWNrNGNoYW5nZS9oYW1iYXNhZmUtY2xpZW50L2FwcC8iLCJzb3VyY2VzIjpbInNlYXJjaC9MYXRlc3RDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtJQUNFLHlCQUFvQixTQUFTO1FBQVQsY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUk3QixvQkFBZSxHQUFHO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFBO1FBRUQsZ0JBQVcsR0FBRztZQUNaLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFBO0lBUkQsQ0FBQztJQVNILHNCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSx1QkFBZSxrQkFZM0IsQ0FBQSJ9