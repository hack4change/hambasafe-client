// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397705
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
var Hambasafe;
(function (Hambasafe) {
    var Client;
    (function (Client) {
        "use strict";
        var Application;
        (function (Application) {
            function initialize() {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            Application.initialize = initialize;
            function onDeviceReady() {
                // Handle the Cordova pause and resume events
                document.addEventListener('pause', onPause, false);
                document.addEventListener('resume', onResume, false);
                // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
                var element = document.getElementById("deviceready");
                element.innerHTML = 'Device Ready';
                element.className += ' ready';
            }
            function onPause() {
                // TODO: This application has been suspended. Save application state here.
            }
            function onResume() {
                // TODO: This application has been reactivated. Restore application state here.
            }
        })(Application = Client.Application || (Client.Application = {}));
        window.onload = function () {
            Application.initialize();
        };
    })(Client = Hambasafe.Client || (Hambasafe.Client = {}));
})(Hambasafe || (Hambasafe = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiQzovaGFjazRjaGFuZ2UvaGFtYmFzYWZlLWNsaWVudC9hcHAvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQyw4RUFBOEU7QUFDL0UsZ0RBQWdEO0FBQ2hELDJHQUEyRztBQUMzRyxxRUFBcUU7QUFDckUsSUFBTyxTQUFTLENBZ0NmO0FBaENELFdBQU8sU0FBUztJQUFDLElBQUEsTUFBTSxDQWdDdEI7SUFoQ2dCLFdBQUEsTUFBTSxFQUFDLENBQUM7UUFDckIsWUFBWSxDQUFDO1FBRWIsSUFBYyxXQUFXLENBd0J4QjtRQXhCRCxXQUFjLFdBQVcsRUFBQyxDQUFDO1lBQ3ZCO2dCQUNJLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25FLENBQUM7WUFGZSxzQkFBVSxhQUV6QixDQUFBO1lBRUQ7Z0JBQ0ksNkNBQTZDO2dCQUM3QyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDbkQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBRXJELHdGQUF3RjtnQkFDeEYsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDckQsT0FBTyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO1lBQ2xDLENBQUM7WUFFRDtnQkFDSSwwRUFBMEU7WUFDOUUsQ0FBQztZQUVEO2dCQUNJLCtFQUErRTtZQUNuRixDQUFDO1FBRUwsQ0FBQyxFQXhCYSxXQUFXLEdBQVgsa0JBQVcsS0FBWCxrQkFBVyxRQXdCeEI7UUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHO1lBQ1osV0FBVyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQTtJQUNMLENBQUMsRUFoQ2dCLE1BQU0sR0FBTixnQkFBTSxLQUFOLGdCQUFNLFFBZ0N0QjtBQUFELENBQUMsRUFoQ00sU0FBUyxLQUFULFNBQVMsUUFnQ2YifQ==