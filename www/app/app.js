///<reference path="../typings/tsd.d.ts"/>
///<reference path="ref.ts"/>
System.register("app", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var app;
    return {
        setters:[],
        execute: function() {
            exports_1("app", app = angular.module('starter', ['ui.router', 'ionic', "LocalStorageModule", 'facebook', 'ngResource'])
                .controller('AboutUsCtrl', function () { })
                .controller('AccountCtrl', function () { })
                .controller('DashCtrl', function () { })
                .controller('EventRatingCtrl', function () { })
                .controller('TellaFriendCtrl', function () { })
                .controller('TermsCtrl', function () { })
                .constant('config', {
                baseServiceURL: "http://hsdevapi1.azurewebsites.net"
            })
                .run(function ($ionicPlatform) {
                $ionicPlatform.ready(function () {
                    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                    // for form inputs)
                    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(true);
                    }
                    if (window.StatusBar) {
                        // org.apache.cordova.statusbar required
                        window.StatusBar.styleDefault();
                    }
                    //$facebookProvider.setAppId(289482390688)
                });
            })
                .config(function ($stateProvider, $urlRouterProvider, FacebookProvider, $httpProvider) {
                $httpProvider.defaults.useXDomain = true;
                FacebookProvider.init('289482390688');
                // Ionic uses AngularUI Router which uses the concept of states
                // Learn more here: https://github.com/angular-ui/ui-router
                // Set up the various states which the app can be in.
                // Each state's controller can be found in controllers.js
                $stateProvider
                    .state('app.landing', {
                    url: '/landing',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/landing.html',
                            controller: 'LandingCtrl'
                        }
                    }
                })
                    .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "templates/menu.html",
                })
                    .state('app.emergency', {
                    url: "/emergency",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/emergency.html",
                        }
                    }
                })
                    .state('app.registration', {
                    url: '/registration',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/registration.html',
                            controller: 'RegistrationCtrl'
                        }
                    }
                })
                    .state('app.home', {
                    url: '/home',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/home.html',
                            controller: 'HomeCtrl'
                        }
                    }
                })
                    .state('app.terms', {
                    url: '/terms',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/terms.html',
                            controller: 'TermsCtrl'
                        }
                    }
                })
                    .state('app.about-us', {
                    url: '/about-us',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/about-us.html',
                            controller: 'AboutUsCtrl'
                        }
                    }
                })
                    .state('app.tell-a-friend', {
                    url: '/tell-a-friend',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/about-us.html',
                            controller: 'TellaFriendCtrl'
                        }
                    }
                })
                    .state('tab', {
                    url: '/tab',
                    abstract: true,
                    templateUrl: 'templates/tabs.html'
                })
                    .state('latest', {
                    url: '/latest',
                    templateUrl: 'templates/latest.html',
                    controller: 'LatestCtrl'
                })
                    .state('app.event-detail', {
                    url: '/event-detail/:id',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/event-detail.html',
                            controller: 'EventDetailCtrl'
                        }
                    }
                })
                    .state('app.create', {
                    url: '/create',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/create.html',
                            controller: 'CreateCtrl'
                        }
                    }
                })
                    .state('app.map', {
                    url: '/map',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/map.html',
                            controller: 'MapCtrl'
                        }
                    }
                })
                    .state('app.rating', {
                    url: '/rating',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/rating.html',
                            controller: 'RatingCtrl'
                        }
                    }
                })
                    .state('app.search', {
                    url: '/search?lng&lat&dist',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/search.html',
                            controller: 'SearchCtrl'
                        }
                    }
                })
                    .state('app.profile', {
                    url: '/profile',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/profile.html',
                            controller: 'ProfileCtrl'
                        }
                    }
                })
                    .state('tab.dash', {
                    url: '/dash',
                    views: {
                        'tab-dash': {
                            templateUrl: 'templates/tab-dash.html',
                            controller: 'DashCtrl'
                        }
                    }
                })
                    .state('tab.chats', {
                    url: '/chats',
                    views: {
                        'tab-chats': {
                            templateUrl: 'templates/tab-chats.html',
                            controller: 'ChatsCtrl'
                        }
                    }
                })
                    .state('tab.chat-detail', {
                    url: '/chats/:chatId',
                    views: {
                        'tab-chats': {
                            templateUrl: 'templates/chat-detail.html',
                            controller: 'ChatDetailCtrl'
                        }
                    }
                })
                    .state('tab.account', {
                    url: '/account',
                    views: {
                        'tab-account': {
                            templateUrl: 'templates/tab-account.html',
                            controller: 'AccountCtrl'
                        }
                    }
                })
                    .state('app.userInvite', {
                    url: '/user-invite',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/user-invite.html',
                            controller: ''
                        }
                    }
                });
                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/app/landing');
            }));
        }
    }
});
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
System.register("controllers/ChatCtrl", ["app"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var app_1;
    return {
        setters:[
            function (app_1_1) {
                app_1 = app_1_1;
            }],
        execute: function() {
            app_1.app.controller('ChatsCtrl', function ($scope, Chats) {
                // With the new view caching in Ionic, Controllers are only called
                // when they are recreated or on app start, instead of every page change.
                // To listen for when this page is active (for example, to refresh data),
                // listen for the $ionicView.enter event:
                //
                //$scope.$on('$ionicView.enter', function(e) {
                //});
                $scope.chats = Chats.all();
                $scope.remove = function (chat) {
                    Chats.remove(chat);
                };
            });
        }
    }
});
System.register("controllers/ChatDetailCtrl", ["app"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var app_2;
    return {
        setters:[
            function (app_2_1) {
                app_2 = app_2_1;
            }],
        execute: function() {
            app_2.app.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
                $scope.chat = Chats.get($stateParams.chatId);
            });
        }
    }
});
System.register("controllers/CreateCtrl", ["app"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var app_3;
    return {
        setters:[
            function (app_3_1) {
                app_3 = app_3_1;
            }],
        execute: function() {
            app_3.app.controller('CreateCtrl', function ($scope, EventFactory) {
                //init
                (function () {
                    $scope.shownGroup = null;
                    $scope.options = {};
                })();
                $scope.searchEvents = function () {
                    EventFactory.create({ id: 1 }, function (event) {
                        $scope.eventData = event;
                    }, function (error) {
                    });
                };
                $scope.eventType = ["Walk", "Run", "Cycle"]; //convert to array of objects
                $scope.typeSelected = $scope.eventType[0];
                $scope.create = function () {
                };
                $scope.toggleGroup = function (group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    }
                    else {
                        $scope.shownGroup = group;
                    }
                };
                $scope.toggleSelection = function (selected, group) {
                    $scope.typeSelected = selected;
                    $scope.toggleGroup(group);
                };
                $scope.isGroupShown = function (type, group) {
                    return $scope.shownGroup === group && $scope.typeSelected !== type;
                };
                $scope.isShown = function (type, group) {
                    return $scope.shownGroup === group && $scope.typeSelected !== type;
                };
                $scope.create = function () {
                    console.log(this.details);
                    console.log(this.result);
                    generateLocationFromAutoComplete(this.details);
                };
                function generateLocationFromAutoComplete(details) {
                    var location = {};
                    location.Address = details.formatted_address;
                    location.Suburb = extractSuburb(details.address_components);
                    location.City = extractCity(details.address_components);
                    location.Province = extractProvince(details.address_components);
                    location.Country = extractCountry(details.address_components);
                    location.Latitude = details.geometry.location.lat();
                    location.Longtitude = details.geometry.location.lng();
                    console.log(location);
                    return location;
                }
                function extractSuburb(results) {
                    var suburbResults;
                    suburbResults = findType('sublocality_level_2', results);
                    if (suburbResults && suburbResults.length && suburbResults.length > 0)
                        return suburbResults[0].long_name;
                    suburbResults = findType('sublocality_level_1', results);
                    if (suburbResults && suburbResults.length && suburbResults.length > 0)
                        return suburbResults[0].long_name;
                    suburbResults = findType('sublocality', results);
                    if (suburbResults && suburbResults.length && suburbResults.length > 0)
                        return suburbResults[0].long_name;
                    return null;
                }
                function extractCity(results) {
                    var suburbResults;
                    suburbResults = findType('locality', results);
                    if (suburbResults && suburbResults.length > 0)
                        return suburbResults[0].long_name;
                    return null;
                }
                function extractProvince(results) {
                    var suburbResults;
                    suburbResults = findType('administrative_area_level_1', results);
                    if (suburbResults && suburbResults.length && suburbResults.length > 0)
                        return suburbResults[0].long_name;
                    return null;
                }
                function extractCountry(results) {
                    var suburbResults;
                    suburbResults = findType('country', results);
                    if (suburbResults && suburbResults.length && suburbResults.length > 0)
                        return suburbResults[0].long_name;
                    return null;
                }
                function findType(type, addressComponents) {
                    var results = [];
                    if (!addressComponents) {
                        return results;
                    }
                    var i = 0;
                    for (i = 0; i < addressComponents.length; i++) {
                        var addressComponent = addressComponents[i];
                        if (addressComponent != null && addressComponent.types != null) {
                            var j = 0;
                            for (j = 0; j < addressComponent.types.length; j++) {
                                var localType = addressComponent.types[j];
                                console.log("local type: " + localType + " - " + addressComponent.long_name);
                                if (type == localType) {
                                    results.push(addressComponent);
                                }
                            }
                        }
                    }
                    return results;
                }
            });
        }
    }
});
System.register("controllers/EventDetailCtrl", ["app"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var app_4;
    return {
        setters:[
            function (app_4_1) {
                app_4 = app_4_1;
            }],
        execute: function() {
            app_4.app.controller('EventDetailCtrl', function ($scope, $location, EventFactory) {
                // $scope.eventData = {
                //     attending: false,
                //     location: "CAPE TOWN, RONDEBOSH",
                //     title: "Cycling in numbers",
                //     type: "CYCLE",
                //     distance: "5KM",
                //     level: "NOVICE",
                //     date: "20 November 2015",
                //     summary: "This is a 'Facebook' styled Card. The header is created from a Thumbnail List item,        the content is from a card-body consisting of an image and paragraph text. The footer consists of tabs, icons aligned left, within the card-footer.",
                //     numberOfAttendees: "4"
                // }
                $scope.eventData = {};
                $scope.init = function () {
                    EventFactory.getEvent({ id: 3 }, function (event) {
                        $scope.eventData = event;
                        console.log(event);
                    }, function (error) {
                    });
                    $scope.attendingDescription = "JOIN";
                    if ($scope.eventData.attending) {
                        $scope.attendingDescription = "CANCEL";
                    }
                };
                $scope.doAttend = function () {
                    $scope.eventData.attending = !$scope.eventData.attending;
                    $scope.attendingDescription = "JOIN";
                    if ($scope.eventData.attending) {
                        $scope.attendingDescription = "CANCEL";
                    }
                };
            });
        }
    }
});
System.register("controllers/HomeCtrl", ["app"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var app_5;
    return {
        setters:[
            function (app_5_1) {
                app_5 = app_5_1;
            }],
        execute: function() {
            app_5.app.controller('HomeCtrl', function ($scope, $location, EventService) {
                (function () {
                    $scope.events = [];
                })();
                $scope.refreshEvents = function () {
                    EventService.getAllEvents().then(function (response) {
                        console.log(response);
                        $scope.events = response.data;
                    }, function (err) {
                        console.log(err);
                    });
                };
                $scope.refreshEvents();
                $scope.click = function (event) {
                    if (event.EventDateTimeEnd < new Date()) {
                        $location.path("app/rating");
                    }
                    else {
                        $location.path("app/event-detail");
                    }
                };
            });
        }
    }
});
System.register("controllers/LandingCtrl", ["app"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var app_6;
    return {
        setters:[
            function (app_6_1) {
                app_6 = app_6_1;
            }],
        execute: function() {
            app_6.app.controller('LandingCtrl', function ($scope, $stateParams, Facebook, ProfileService, $location) {
                $scope.getLoginStatus = function () {
                    Facebook.logout();
                    Facebook.getLoginStatus(function (response) {
                        console.log(response);
                        if (response.status === 'connected') {
                            $location.path('app/home');
                        }
                        else {
                            $scope.loggedIn = false;
                        }
                    });
                };
                $scope.fbLogin = function () {
                    Facebook.login(function (response) {
                        console.log(response);
                        ProfileService.setProfileFromFacebook(response);
                        $location.path('app/registration');
                    });
                };
            });
        }
    }
});
System.register("controllers/LatestCtrl", ["app"], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var app_7;
    return {
        setters:[
            function (app_7_1) {
                app_7 = app_7_1;
            }],
        execute: function() {
            app_7.app.controller('LatestCtrl', function ($scope, $location) {
                $scope.goCreateAnEvent = function () {
                    $location.path('app/registration');
                };
                $scope.goHambaSafe = function () {
                    $location.path('app/eventdetail/TEMP');
                };
            });
        }
    }
});
System.register("controllers/MapCtrl", ["app"], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var app_8;
    return {
        setters:[
            function (app_8_1) {
                app_8 = app_8_1;
            }],
        execute: function() {
            app_8.app.controller('MapCtrl', function ($scope, EventService, $state, $compile, $ionicLoading, $location) {
                (function () {
                    $scope.sliderDistance = 10;
                })();
                $scope.loading = $ionicLoading.show({
                    content: 'Getting current location...',
                    showBackdrop: false
                });
                $scope.searchByLocation = function () {
                    console.log("Hey");
                    if (!!$scope.gCoords && !!$scope.sliderDistance) {
                        console.log($scope.sliderDistance);
                        console.log($scope.gCoords.lat() + " " + $scope.gCoords.lng());
                        $location.path('app/search?lat=' + $scope.gCoords.lat() + "&lng" + $scope.gCoords.lng() + "&dist=" + $scope.sliderDistance);
                    }
                };
                $scope.init = function () {
                    var mapOptions = {
                        zoom: 10,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    //Marker + infowindow + angularjs compiled ng-click
                    // var contentString = "<div><a ng-click='clickTest()'>Click me!</a>a></div>div>";
                    // var compiled = $compile(contentString)($scope);
                    // var infowindow = new google.maps.InfoWindow({
                    //   content: compiled[0]
                    // });
                    $scope.map = map;
                    navigator.geolocation.getCurrentPosition(function (pos) {
                        console.log(pos);
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        $scope.gCoords = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        $scope.marker = new google.maps.Marker({
                            position: $scope.gCoords,
                            map: $scope.map,
                            title: 'You!'
                        });
                        $scope.locationCircle = new google.maps.Circle({
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            map: $scope.map,
                            center: $scope.gCoords,
                            radius: $scope.sliderDistance * 1000
                        });
                        $ionicLoading.hide();
                    }, function (error) {
                        alert('Unable to get location: ' + error.message);
                    });
                };
                $scope.$watch('sliderDistance', function (newValue, oldValue) {
                    console.log($scope.map);
                    if ($scope.map && $scope.locationCircle) {
                        $scope.locationCircle.setOptions({
                            radius: $scope.sliderDistance * 1000
                        });
                    }
                    //do something
                });
            });
        }
    }
});
System.register("controllers/ProfileCtrl", ["app"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var app_9;
    return {
        setters:[
            function (app_9_1) {
                app_9 = app_9_1;
            }],
        execute: function() {
            app_9.app.controller('ProfileCtrl', function ($scope, ProfileService) {
                ProfileService.get(1).then(function (response) {
                    $scope.user = response.data;
                });
            });
        }
    }
});
System.register("controllers/RatingCtrl", ["app"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var app_10;
    return {
        setters:[
            function (app_10_1) {
                app_10 = app_10_1;
            }],
        execute: function() {
            app_10.app.controller('RatingCtrl', function ($scope) {
                $scope.event = { Name: "Event Name", Description: "Description" };
                $scope.Rate = 3;
                $scope.setRate = function (val) {
                    $scope.Rate = val;
                };
                console.log('Here');
            });
        }
    }
});
System.register("controllers/RegistrationCtrl", ["app"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var app_11;
    return {
        setters:[
            function (app_11_1) {
                app_11 = app_11_1;
            }],
        execute: function() {
            app_11.app.controller('RegistrationCtrl', function ($scope, $stateParams, ProfileService) {
                ProfileService.getFaceBookProfile().then(function (profile) {
                    $scope.user = profile;
                });
                /*
                 *  DoB
                 *  Email
                 *  Profile Picture
                 */
                $scope.doRegister = function (valid) {
                    $scope.submitted = true;
                    $scope.updatePasswordError();
                    if (valid) {
                    }
                    else {
                        $scope.error = 'Please fill in all required fields';
                    }
                };
            });
        }
    }
});
System.register("controllers/SearchCtrl", ["app"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var app_12;
    return {
        setters:[
            function (app_12_1) {
                app_12 = app_12_1;
            }],
        execute: function() {
            app_12.app.controller('SearchCtrl', function ($scope, $stateParams, EventService, $location) {
                //init
                (function () {
                    console.log($stateParams.lat);
                    console.log($stateParams.lng);
                    console.log($stateParams.dist);
                })();
                $scope.eventType = ["Event Type"];
                $scope.typeSelected = $scope.eventType[0];
                $scope.selectedSearch = 0;
                if ($stateParams.lat && $stateParams.lng && $stateParams.dist) {
                    $scope.selectedSearch = 1;
                }
                $scope.eventsToList = [];
                $scope.searchEvents = function () {
                    var searchBy = $scope.selectedSearch;
                    EventService.getAllEvents().then(function (response) {
                        $scope.eventsToList = response.data;
                        console.log(response);
                    }, function (response) {
                    });
                };
                $scope.searchEvents();
                $scope.getTypes = function () {
                    EventService.getEventTypes().then(function (response) {
                        $scope.eventTypes = [];
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.eventTypes.push(response.data[i].Name);
                        }
                        console.log($scope.eventTypes);
                    }, function (response) {
                        console.log("error");
                        console.log(response);
                    });
                };
                $scope.getTypes();
                $scope.toggleGroup = function (group) {
                    if ($scope.isGroupShown(group)) {
                        $scope.shownGroup = null;
                    }
                    else {
                        $scope.shownGroup = group;
                    }
                };
                $scope.toggleSelection = function (selected, group) {
                    $scope.typeSelected = selected;
                    $scope.toggleGroup(group);
                };
                $scope.isGroupShown = function (type, group) {
                    return $scope.shownGroup === group && $scope.typeSelected !== type;
                };
                $scope.isShown = function (type, group) {
                    return $scope.shownGroup === group && $scope.typeSelected !== type;
                };
                $scope.setActiveSearch = function (selection) {
                    $scope.selectedSearch = selection;
                };
                $scope.activeSearch = function (selection) {
                    return $scope.selectedSearch === selection;
                };
                $scope.filterResults = function (eventObject) {
                    if ($scope.typeSelected == "Event Type") {
                        return true;
                    }
                    else {
                        if ($scope.typeSelected == eventObject.EventType.Name) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                };
                $scope.goMap = function () {
                    $location.path('app/map');
                };
            });
        }
    }
});
System.register("services/Chats", ["app"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var app_13;
    return {
        setters:[
            function (app_13_1) {
                app_13 = app_13_1;
            }],
        execute: function() {
            app_13.app.factory('Chats', function () {
                // Might use a resource here that returns a JSON array
                // Some fake testing data
                var chats = [{
                        id: 0,
                        name: 'Ben Sparrow',
                        lastText: 'You on your way?',
                        face: 'img/ben.png'
                    }, {
                        id: 1,
                        name: 'Max Lynx',
                        lastText: 'Hey, it\'s me',
                        face: 'img/max.png'
                    }, {
                        id: 2,
                        name: 'Adam Bradleyson',
                        lastText: 'I should buy a boat',
                        face: 'img/adam.jpg'
                    }, {
                        id: 3,
                        name: 'Perry Governor',
                        lastText: 'Look at my mukluks!',
                        face: 'img/perry.png'
                    }, {
                        id: 4,
                        name: 'Mike Harrington',
                        lastText: 'This is wicked good ice cream.',
                        face: 'img/mike.png'
                    }];
                return {
                    all: function () {
                        return chats;
                    },
                    remove: function (chat) {
                        chats.splice(chats.indexOf(chat), 1);
                    },
                    get: function (chatId) {
                        for (var i = 0; i < chats.length; i++) {
                            if (chats[i].id === parseInt(chatId)) {
                                return chats[i];
                            }
                        }
                        return null;
                    }
                };
            });
        }
    }
});
System.register("services/EventFactory", ["app"], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var app_14;
    return {
        setters:[
            function (app_14_1) {
                app_14 = app_14_1;
            }],
        execute: function() {
            app_14.app.service('EventFactory', ['$http', 'config',
                function ($http, config) {
                    return {
                        getAllEvents: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/events', config);
                        },
                        getEvent: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/event?id=' + id, config)
                                .then(function success(result) {
                            }, function error(err) {
                            });
                        },
                        createEvent: function (event) {
                            return $http.post('v1/createevent', event, config);
                        }
                    };
                }
            ]);
        }
    }
});
System.register("services/EventService", ["app"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var app_15;
    return {
        setters:[
            function (app_15_1) {
                app_15 = app_15_1;
            }],
        execute: function() {
            app_15.app.service('EventService', ['$http', 'config',
                function ($http, config) {
                    return {
                        createEvent: function (data) {
                            return $http.get(config.baseServiceURL + '/v1/createevent', data, config);
                        },
                        getAllEvents: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/events', config);
                        },
                        getEvent: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/event?id=' + id, config);
                        },
                        getEventTypes: function () {
                            return $http.get(config.baseServiceURL + '/v1/event-types', config);
                        },
                        getEventByUser: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/events-by-user', config);
                        },
                        getEventByAttendee: function (data) {
                            var param = Object.keys(data);
                            return $http.get(config.baseServiceURL + '/v1/events-by-attendee?' + param + "=" + data.param, config);
                        },
                        getEventBySuburb: function (data) {
                            var param = Object.keys(data);
                            return $http.get(config.baseServiceURL + '/v1/events-by-suburb?' + param + "=" + data.param, config);
                        },
                        getEventByCoords: function (latitude, longitude, radius) {
                            return $http.get(config.baseServiceURL + '/v1/events-by-coordinates?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius, config);
                        }
                    };
                }
            ]);
        }
    }
});
System.register("services/LocalStorage", ["app"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var app_16;
    return {
        setters:[
            function (app_16_1) {
                app_16 = app_16_1;
            }],
        execute: function() {
            app_16.app.factory("LocalStorage", ['$window',
                function ($window) {
                    var _facebookAuth = null;
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
        }
    }
});
System.register("services/LocationService", ["app"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var app_17;
    return {
        setters:[
            function (app_17_1) {
                app_17 = app_17_1;
            }],
        execute: function() {
            app_17.app.service('LocationService', ['$http', 'config',
                function ($http, config) {
                    return {
                        createEvent: function (data) {
                            return $http.get(config.baseServiceURL + '/v1/createevent', data, config);
                        },
                        getAllEvents: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/events', config);
                        },
                        getEvent: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/event?id=' + id, config);
                        },
                        getEventByUser: function (id) {
                            return $http.get(config.baseServiceURL + '/v1/eventsbyuser', config);
                        },
                        getEventByAttendee: function (data) {
                            var param = Object.keys(data);
                            return $http.get(config.baseServiceURL + '/v1/eventsbyattendee?' + param + "=" + data.param, config);
                        },
                        getEventBySuburb: function (data) {
                            var param = Object.keys(data);
                            return $http.get(config.baseServiceURL + '/v1/eventsbysuburb?' + param + "=" + data.param, config);
                        },
                        getEventByCoords: function (latitude, longitude, radius) {
                            return $http.get(config.baseServiceURL + '/v1/eventsbycoordinates?latitude=' + latitude + '&longitude=' + longitude + '&radius=' + radius, config);
                        }
                    };
                }
            ]);
        }
    }
});
System.register("services/ProfileService", ["app"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var app_18;
    return {
        setters:[
            function (app_18_1) {
                app_18 = app_18_1;
            }],
        execute: function() {
            app_18.app.service('ProfileService', function ($http, config, localStorageService, $q, Facebook) {
                var base = config.baseServiceURL + "/v1/";
                var profileKey = "profileKey";
                return {
                    setProfileFromFacebook: function (profile) {
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
                    getProfileId: function () {
                    },
                    getFaceBookProfile: function () {
                        var defer = $q.defer();
                        Facebook.api('/me', function (response) {
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
                };
            });
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZi50cyIsImFwcC50cyIsImluZGV4LnRzIiwiY29udHJvbGxlcnMvQ2hhdEN0cmwudHMiLCJjb250cm9sbGVycy9DaGF0RGV0YWlsQ3RybC50cyIsImNvbnRyb2xsZXJzL0NyZWF0ZUN0cmwudHMiLCJjb250cm9sbGVycy9FdmVudERldGFpbEN0cmwudHMiLCJjb250cm9sbGVycy9Ib21lQ3RybC50cyIsImNvbnRyb2xsZXJzL0xhbmRpbmdDdHJsLnRzIiwiY29udHJvbGxlcnMvTGF0ZXN0Q3RybC50cyIsImNvbnRyb2xsZXJzL01hcEN0cmwudHMiLCJjb250cm9sbGVycy9Qcm9maWxlQ3RybC50cyIsImNvbnRyb2xsZXJzL1JhdGluZ0N0cmwudHMiLCJjb250cm9sbGVycy9SZWdpc3RyYXRpb25DdHJsLnRzIiwiY29udHJvbGxlcnMvU2VhcmNoQ3RybC50cyIsInNlcnZpY2VzL0NoYXRzLnRzIiwic2VydmljZXMvRXZlbnRGYWN0b3J5LnRzIiwic2VydmljZXMvRXZlbnRTZXJ2aWNlLnRzIiwic2VydmljZXMvTG9jYWxTdG9yYWdlLnRzIiwic2VydmljZXMvTG9jYXRpb25TZXJ2aWNlLnRzIiwic2VydmljZXMvUHJvZmlsZVNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMENBQTBDO0FDQTFDLDZCQUE2Qjs7OztRQUVsQixHQUFHOzs7O1lBQUgsaUJBQUEsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7aUJBQy9HLFVBQVUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQzFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQzFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7aUJBQ3ZDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLENB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ZCxDQUFDO29CQUNELGtCQUFrQixFQUFFO3dCQUNsQixJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBRXZCLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFVBQVUsUUFBUTs0QkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs0QkFDdEIsSUFBSSxJQUFJLEdBQUc7Z0NBQ1QsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO2dDQUMvQixRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQVM7Z0NBQzVCLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTs2QkFDeEIsQ0FBQzs0QkFDRixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN0QixDQUFDLENBQUMsQ0FBQzt3QkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFFdkIsQ0FBQztpQkFDRixDQUFDO1lBQ0osQ0FBQyxDQUNBLENBQUMiLCJmaWxlIjoid3d3L2FwcC9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy88cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL3RzZC5kLnRzXCIvPlxuIiwiLy8vPHJlZmVyZW5jZSBwYXRoPVwicmVmLnRzXCIvPlxyXG5cclxuZXhwb3J0IHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnc3RhcnRlcicsIFsndWkucm91dGVyJywgJ2lvbmljJywgXCJMb2NhbFN0b3JhZ2VNb2R1bGVcIiwgJ2ZhY2Vib29rJywgJ25nUmVzb3VyY2UnXSlcclxuICAuY29udHJvbGxlcignQWJvdXRVc0N0cmwnLCBmdW5jdGlvbiAoKSB7IH0pXHJcbiAgLmNvbnRyb2xsZXIoJ0FjY291bnRDdHJsJywgZnVuY3Rpb24gKCkgeyB9KVxyXG4gIC5jb250cm9sbGVyKCdEYXNoQ3RybCcsIGZ1bmN0aW9uICgpIHsgfSlcclxuICAuY29udHJvbGxlcignRXZlbnRSYXRpbmdDdHJsJywgZnVuY3Rpb24gKCkgeyB9KVxyXG4gIC5jb250cm9sbGVyKCdUZWxsYUZyaWVuZEN0cmwnLCBmdW5jdGlvbiAoKSB7IH0pXHJcbiAgLmNvbnRyb2xsZXIoJ1Rlcm1zQ3RybCcsIGZ1bmN0aW9uICgpIHsgfSlcclxuICAuY29uc3RhbnQoJ2NvbmZpZycsIHtcclxuICAgIGJhc2VTZXJ2aWNlVVJMOiBcImh0dHA6Ly9oc2RldmFwaTEuYXp1cmV3ZWJzaXRlcy5uZXRcIlxyXG4gICAgLy9iYXNlU2VydmljZVVSTDogXCJodHRwOi8vYXBpLmVtZ3VpZGFuY2UuY29tL29wZW5tZWQvYXBpXCJcclxuICB9KVxyXG5cclxuICAucnVuKGZ1bmN0aW9uICgkaW9uaWNQbGF0Zm9ybSkge1xyXG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXHJcbiAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcclxuICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmICg8YW55PndpbmRvdy5jb3Jkb3ZhKS5wbHVnaW5zICYmICg8YW55PndpbmRvdy5jb3Jkb3ZhKS5wbHVnaW5zLktleWJvYXJkKSB7XHJcbiAgICAgICAgKDxhbnk+Y29yZG92YSkucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XHJcbiAgICAgICAgKDxhbnk+Y29yZG92YSkucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xyXG5cclxuICAgICAgfVxyXG4gICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xyXG4gICAgICAgIC8vIG9yZy5hcGFjaGUuY29yZG92YS5zdGF0dXNiYXIgcmVxdWlyZWRcclxuICAgICAgICAoPGFueT53aW5kb3cpLlN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8kZmFjZWJvb2tQcm92aWRlci5zZXRBcHBJZCgyODk0ODIzOTA2ODgpXHJcblxyXG5cclxuICAgIH0pO1xyXG4gIH0pXHJcblxyXG4gIC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsIEZhY2Vib29rUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpIHtcclxuXHJcbiAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnVzZVhEb21haW4gPSB0cnVlO1xyXG4gICAgRmFjZWJvb2tQcm92aWRlci5pbml0KCcyODk0ODIzOTA2ODgnKTtcclxuXHJcbiAgICAvLyBJb25pYyB1c2VzIEFuZ3VsYXJVSSBSb3V0ZXIgd2hpY2ggdXNlcyB0aGUgY29uY2VwdCBvZiBzdGF0ZXNcclxuICAgIC8vIExlYXJuIG1vcmUgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXItdWkvdWktcm91dGVyXHJcbiAgICAvLyBTZXQgdXAgdGhlIHZhcmlvdXMgc3RhdGVzIHdoaWNoIHRoZSBhcHAgY2FuIGJlIGluLlxyXG4gICAgLy8gRWFjaCBzdGF0ZSdzIGNvbnRyb2xsZXIgY2FuIGJlIGZvdW5kIGluIGNvbnRyb2xsZXJzLmpzXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG5cclxuICAgICAgLy8gc2V0dXAgYW4gYWJzdHJhY3Qgc3RhdGUgZm9yIHRoZSB0YWJzIGRpcmVjdGl2ZVxyXG4gICAgICAuc3RhdGUoJ2FwcC5sYW5kaW5nJywge1xyXG4gICAgICAgIHVybDogJy9sYW5kaW5nJyxcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9sYW5kaW5nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTGFuZGluZ0N0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdhcHAnLCB7XHJcbiAgICAgICAgdXJsOiBcIi9hcHBcIixcclxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvbWVudS5odG1sXCIsXHJcbiAgICAgICAgLy8gY29udHJvbGxlcjogJ0FwcEN0cmwnXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAuc3RhdGUoJ2FwcC5lbWVyZ2VuY3knLCB7XHJcbiAgICAgICAgdXJsOiBcIi9lbWVyZ2VuY3lcIixcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJ0ZW1wbGF0ZXMvZW1lcmdlbmN5Lmh0bWxcIixcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGF0ZSgnYXBwLnJlZ2lzdHJhdGlvbicsIHtcclxuICAgICAgICB1cmw6ICcvcmVnaXN0cmF0aW9uJyxcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9yZWdpc3RyYXRpb24uaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZWdpc3RyYXRpb25DdHJsJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC5zdGF0ZSgnYXBwLmhvbWUnLCB7XHJcbiAgICAgICAgdXJsOiAnL2hvbWUnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2hvbWUuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAuc3RhdGUoJ2FwcC50ZXJtcycsIHtcclxuICAgICAgICB1cmw6ICcvdGVybXMnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3Rlcm1zLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVGVybXNDdHJsJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC5zdGF0ZSgnYXBwLmFib3V0LXVzJywge1xyXG4gICAgICAgIHVybDogJy9hYm91dC11cycsXHJcbiAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICdtZW51Q29udGVudCc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvYWJvdXQtdXMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBYm91dFVzQ3RybCdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5zdGF0ZSgnYXBwLnRlbGwtYS1mcmllbmQnLCB7XHJcbiAgICAgICAgdXJsOiAnL3RlbGwtYS1mcmllbmQnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2Fib3V0LXVzLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVGVsbGFGcmllbmRDdHJsJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLnN0YXRlKCd0YWInLCB7XHJcbiAgICAgICAgdXJsOiAnL3RhYicsXHJcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFicy5odG1sJ1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdsYXRlc3QnLCB7XHJcbiAgICAgICAgdXJsOiAnL2xhdGVzdCcsXHJcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvbGF0ZXN0Lmh0bWwnLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMYXRlc3RDdHJsJ1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdhcHAuZXZlbnQtZGV0YWlsJywge1xyXG4gICAgICAgIHVybDogJy9ldmVudC1kZXRhaWwvOmlkJyxcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9ldmVudC1kZXRhaWwuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFdmVudERldGFpbEN0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdhcHAuY3JlYXRlJywge1xyXG4gICAgICAgIHVybDogJy9jcmVhdGUnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NyZWF0ZS5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NyZWF0ZUN0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdhcHAubWFwJywge1xyXG4gICAgICAgIHVybDogJy9tYXAnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL21hcC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ01hcEN0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhdGUoJ2FwcC5yYXRpbmcnLCB7XHJcbiAgICAgICAgdXJsOiAnL3JhdGluZycsXHJcbiAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICdtZW51Q29udGVudCc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvcmF0aW5nLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUmF0aW5nQ3RybCdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAuc3RhdGUoJ2FwcC5zZWFyY2gnLCB7XHJcbiAgICAgICAgdXJsOiAnL3NlYXJjaD9sbmcmbGF0JmRpc3QnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3NlYXJjaC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1NlYXJjaEN0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuc3RhdGUoJ2FwcC5wcm9maWxlJywge1xyXG4gICAgICAgIHVybDogJy9wcm9maWxlJyxcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9wcm9maWxlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUN0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCd0YWIuZGFzaCcsIHtcclxuICAgICAgICB1cmw6ICcvZGFzaCcsXHJcbiAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICd0YWItZGFzaCc6IHtcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdGFiLWRhc2guaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYXNoQ3RybCdcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAuc3RhdGUoJ3RhYi5jaGF0cycsIHtcclxuICAgICAgICB1cmw6ICcvY2hhdHMnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAndGFiLWNoYXRzJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy90YWItY2hhdHMuaHRtbCcsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDaGF0c0N0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCd0YWIuY2hhdC1kZXRhaWwnLCB7XHJcbiAgICAgICAgdXJsOiAnL2NoYXRzLzpjaGF0SWQnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAndGFiLWNoYXRzJzoge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy9jaGF0LWRldGFpbC5odG1sJyxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0NoYXREZXRhaWxDdHJsJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICAgIC5zdGF0ZSgndGFiLmFjY291bnQnLCB7XHJcbiAgICAgICAgdXJsOiAnL2FjY291bnQnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAndGFiLWFjY291bnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3RhYi1hY2NvdW50Lmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnQWNjb3VudEN0cmwnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgLnN0YXRlKCdhcHAudXNlckludml0ZScsIHtcclxuICAgICAgICB1cmw6ICcvdXNlci1pbnZpdGUnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAnbWVudUNvbnRlbnQnOiB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL3VzZXItaW52aXRlLmh0bWwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnJ1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIC8vIGlmIG5vbmUgb2YgdGhlIGFib3ZlIHN0YXRlcyBhcmUgbWF0Y2hlZCwgdXNlIHRoaXMgYXMgdGhlIGZhbGxiYWNrXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYXBwL2xhbmRpbmcnKTtcclxuICB9KTtcclxuIiwiLy8gRm9yIGFuIGludHJvZHVjdGlvbiB0byB0aGUgQmxhbmsgdGVtcGxhdGUsIHNlZSB0aGUgZm9sbG93aW5nIGRvY3VtZW50YXRpb246XHJcbi8vIGh0dHA6Ly9nby5taWNyb3NvZnQuY29tL2Z3bGluay8/TGlua0lEPTM5NzcwNVxyXG4vLyBUbyBkZWJ1ZyBjb2RlIG9uIHBhZ2UgbG9hZCBpbiBSaXBwbGUgb3Igb24gQW5kcm9pZCBkZXZpY2VzL2VtdWxhdG9yczogbGF1bmNoIHlvdXIgYXBwLCBzZXQgYnJlYWtwb2ludHMsIFxyXG4vLyBhbmQgdGhlbiBydW4gXCJ3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcIiBpbiB0aGUgSmF2YVNjcmlwdCBDb25zb2xlLlxyXG5tb2R1bGUgSGFtYmFzYWZlLkNsaWVudCB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBleHBvcnQgbW9kdWxlIEFwcGxpY2F0aW9uIHtcclxuICAgICAgICBleHBvcnQgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCBvbkRldmljZVJlYWR5LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkRldmljZVJlYWR5KCkge1xyXG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIENvcmRvdmEgcGF1c2UgYW5kIHJlc3VtZSBldmVudHNcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBvblBhdXNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc3VtZScsIG9uUmVzdW1lLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBDb3Jkb3ZhIGhhcyBiZWVuIGxvYWRlZC4gUGVyZm9ybSBhbnkgaW5pdGlhbGl6YXRpb24gdGhhdCByZXF1aXJlcyBDb3Jkb3ZhIGhlcmUuXHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXZpY2VyZWFkeVwiKTtcclxuICAgICAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSAnRGV2aWNlIFJlYWR5JztcclxuICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyByZWFkeSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblBhdXNlKCkge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBUaGlzIGFwcGxpY2F0aW9uIGhhcyBiZWVuIHN1c3BlbmRlZC4gU2F2ZSBhcHBsaWNhdGlvbiBzdGF0ZSBoZXJlLlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gb25SZXN1bWUoKSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFRoaXMgYXBwbGljYXRpb24gaGFzIGJlZW4gcmVhY3RpdmF0ZWQuIFJlc3RvcmUgYXBwbGljYXRpb24gc3RhdGUgaGVyZS5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgQXBwbGljYXRpb24uaW5pdGlhbGl6ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5cbmFwcC5jb250cm9sbGVyKCdDaGF0c0N0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBDaGF0cykge1xyXG4gIC8vIFdpdGggdGhlIG5ldyB2aWV3IGNhY2hpbmcgaW4gSW9uaWMsIENvbnRyb2xsZXJzIGFyZSBvbmx5IGNhbGxlZFxyXG4gIC8vIHdoZW4gdGhleSBhcmUgcmVjcmVhdGVkIG9yIG9uIGFwcCBzdGFydCwgaW5zdGVhZCBvZiBldmVyeSBwYWdlIGNoYW5nZS5cclxuICAvLyBUbyBsaXN0ZW4gZm9yIHdoZW4gdGhpcyBwYWdlIGlzIGFjdGl2ZSAoZm9yIGV4YW1wbGUsIHRvIHJlZnJlc2ggZGF0YSksXHJcbiAgLy8gbGlzdGVuIGZvciB0aGUgJGlvbmljVmlldy5lbnRlciBldmVudDpcclxuICAvL1xyXG4gIC8vJHNjb3BlLiRvbignJGlvbmljVmlldy5lbnRlcicsIGZ1bmN0aW9uKGUpIHtcclxuICAvL30pO1xyXG5cclxuICAkc2NvcGUuY2hhdHMgPSBDaGF0cy5hbGwoKTtcclxuICAkc2NvcGUucmVtb3ZlID0gZnVuY3Rpb24gKGNoYXQpIHtcclxuICAgIENoYXRzLnJlbW92ZShjaGF0KTtcclxuICB9O1xyXG59KTtcclxuIiwiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHBcIjtcbmFwcC5jb250cm9sbGVyKCdDaGF0RGV0YWlsQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZVBhcmFtcywgQ2hhdHMpIHtcclxuICAkc2NvcGUuY2hhdCA9IENoYXRzLmdldCgkc3RhdGVQYXJhbXMuY2hhdElkKTtcclxufSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuY29udHJvbGxlcignQ3JlYXRlQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsIEV2ZW50RmFjdG9yeSkge1xyXG4gIC8vaW5pdFxyXG4gIChmdW5jdGlvbiAoKSB7XHJcbiAgICAkc2NvcGUuc2hvd25Hcm91cCA9IG51bGw7XHJcbiAgICAkc2NvcGUub3B0aW9ucyA9IHt9O1xyXG4gIH0pKClcclxuXHJcblxyXG4gICRzY29wZS5zZWFyY2hFdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgRXZlbnRGYWN0b3J5LmNyZWF0ZShcclxuICAgICAge2lkOiAxfSxcclxuICAgICAgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgJHNjb3BlLmV2ZW50RGF0YSA9IGV2ZW50O1xyXG4gICAgICB9LFxyXG4gICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgIH0pO1xyXG4gIH1cclxuICAkc2NvcGUuZXZlbnRUeXBlID0gW1wiV2Fsa1wiLCBcIlJ1blwiLCBcIkN5Y2xlXCJdOyAvL2NvbnZlcnQgdG8gYXJyYXkgb2Ygb2JqZWN0c1xyXG4gICRzY29wZS50eXBlU2VsZWN0ZWQgPSAkc2NvcGUuZXZlbnRUeXBlWzBdO1xyXG4gICRzY29wZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgJHNjb3BlLnRvZ2dsZUdyb3VwID0gZnVuY3Rpb24gKGdyb3VwKSB7XHJcbiAgICBpZiAoJHNjb3BlLmlzR3JvdXBTaG93bihncm91cCkpIHtcclxuICAgICAgJHNjb3BlLnNob3duR3JvdXAgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHNjb3BlLnNob3duR3JvdXAgPSBncm91cDtcclxuICAgIH1cclxuICB9O1xyXG4gICRzY29wZS50b2dnbGVTZWxlY3Rpb24gPSBmdW5jdGlvbiAoc2VsZWN0ZWQsIGdyb3VwKSB7XHJcbiAgICAkc2NvcGUudHlwZVNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAkc2NvcGUudG9nZ2xlR3JvdXAoZ3JvdXApO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5pc0dyb3VwU2hvd24gPSBmdW5jdGlvbiAodHlwZSwgZ3JvdXApIHtcclxuICAgIHJldHVybiAkc2NvcGUuc2hvd25Hcm91cCA9PT0gZ3JvdXAgJiYgJHNjb3BlLnR5cGVTZWxlY3RlZCAhPT0gdHlwZTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUuaXNTaG93biA9IGZ1bmN0aW9uICh0eXBlLCBncm91cCkge1xyXG4gICAgcmV0dXJuICRzY29wZS5zaG93bkdyb3VwID09PSBncm91cCAmJiAkc2NvcGUudHlwZVNlbGVjdGVkICE9PSB0eXBlO1xyXG4gIH07XHJcblxyXG4gICRzY29wZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRldGFpbHMpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5yZXN1bHQpO1xyXG4gICAgZ2VuZXJhdGVMb2NhdGlvbkZyb21BdXRvQ29tcGxldGUodGhpcy5kZXRhaWxzKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdlbmVyYXRlTG9jYXRpb25Gcm9tQXV0b0NvbXBsZXRlKGRldGFpbHMpIHtcclxuICAgIHZhciBsb2NhdGlvbiA6YW55PSB7fTtcclxuICAgIGxvY2F0aW9uLkFkZHJlc3MgPSBkZXRhaWxzLmZvcm1hdHRlZF9hZGRyZXNzO1xyXG4gICAgbG9jYXRpb24uU3VidXJiID0gZXh0cmFjdFN1YnVyYihkZXRhaWxzLmFkZHJlc3NfY29tcG9uZW50cyk7XHJcbiAgICBsb2NhdGlvbi5DaXR5ID0gZXh0cmFjdENpdHkoZGV0YWlscy5hZGRyZXNzX2NvbXBvbmVudHMpO1xyXG4gICAgbG9jYXRpb24uUHJvdmluY2UgPSBleHRyYWN0UHJvdmluY2UoZGV0YWlscy5hZGRyZXNzX2NvbXBvbmVudHMpO1xyXG4gICAgbG9jYXRpb24uQ291bnRyeSA9IGV4dHJhY3RDb3VudHJ5KGRldGFpbHMuYWRkcmVzc19jb21wb25lbnRzKTtcclxuICAgIGxvY2F0aW9uLkxhdGl0dWRlID0gZGV0YWlscy5nZW9tZXRyeS5sb2NhdGlvbi5sYXQoKTtcclxuICAgIGxvY2F0aW9uLkxvbmd0aXR1ZGUgPSBkZXRhaWxzLmdlb21ldHJ5LmxvY2F0aW9uLmxuZygpO1xyXG4gICAgY29uc29sZS5sb2cobG9jYXRpb24pO1xyXG4gICAgcmV0dXJuIGxvY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gZXh0cmFjdFN1YnVyYihyZXN1bHRzKSB7XHJcbiAgICB2YXIgc3VidXJiUmVzdWx0cztcclxuICAgIHN1YnVyYlJlc3VsdHMgPSBmaW5kVHlwZSgnc3VibG9jYWxpdHlfbGV2ZWxfMicsIHJlc3VsdHMpO1xyXG4gICAgaWYgKHN1YnVyYlJlc3VsdHMgJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggPiAwKVxyXG4gICAgICByZXR1cm4gc3VidXJiUmVzdWx0c1swXS5sb25nX25hbWU7XHJcblxyXG4gICAgc3VidXJiUmVzdWx0cyA9IGZpbmRUeXBlKCdzdWJsb2NhbGl0eV9sZXZlbF8xJywgcmVzdWx0cyk7XHJcbiAgICBpZiAoc3VidXJiUmVzdWx0cyAmJiBzdWJ1cmJSZXN1bHRzLmxlbmd0aCAmJiBzdWJ1cmJSZXN1bHRzLmxlbmd0aCA+IDApXHJcbiAgICAgIHJldHVybiBzdWJ1cmJSZXN1bHRzWzBdLmxvbmdfbmFtZTtcclxuXHJcbiAgICBzdWJ1cmJSZXN1bHRzID0gZmluZFR5cGUoJ3N1YmxvY2FsaXR5JywgcmVzdWx0cyk7XHJcbiAgICBpZiAoc3VidXJiUmVzdWx0cyAmJiBzdWJ1cmJSZXN1bHRzLmxlbmd0aCAmJiBzdWJ1cmJSZXN1bHRzLmxlbmd0aCA+IDApXHJcbiAgICAgIHJldHVybiBzdWJ1cmJSZXN1bHRzWzBdLmxvbmdfbmFtZTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGV4dHJhY3RDaXR5KHJlc3VsdHMpIHtcclxuICAgIHZhciBzdWJ1cmJSZXN1bHRzO1xyXG4gICAgc3VidXJiUmVzdWx0cyA9IGZpbmRUeXBlKCdsb2NhbGl0eScsIHJlc3VsdHMpO1xyXG4gICAgaWYgKHN1YnVyYlJlc3VsdHMgJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggPiAwKVxyXG4gICAgICByZXR1cm4gc3VidXJiUmVzdWx0c1swXS5sb25nX25hbWU7XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBleHRyYWN0UHJvdmluY2UocmVzdWx0cykge1xyXG4gICAgdmFyIHN1YnVyYlJlc3VsdHM7XHJcbiAgICBzdWJ1cmJSZXN1bHRzID0gZmluZFR5cGUoJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMScsIHJlc3VsdHMpO1xyXG4gICAgaWYgKHN1YnVyYlJlc3VsdHMgJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggPiAwKVxyXG4gICAgICByZXR1cm4gc3VidXJiUmVzdWx0c1swXS5sb25nX25hbWU7XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBleHRyYWN0Q291bnRyeShyZXN1bHRzKSB7XHJcbiAgICB2YXIgc3VidXJiUmVzdWx0cztcclxuICAgIHN1YnVyYlJlc3VsdHMgPSBmaW5kVHlwZSgnY291bnRyeScsIHJlc3VsdHMpO1xyXG4gICAgaWYgKHN1YnVyYlJlc3VsdHMgJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggJiYgc3VidXJiUmVzdWx0cy5sZW5ndGggPiAwKVxyXG4gICAgICByZXR1cm4gc3VidXJiUmVzdWx0c1swXS5sb25nX25hbWU7XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBmaW5kVHlwZSh0eXBlLCBhZGRyZXNzQ29tcG9uZW50cykge1xyXG4gICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuXHJcbiAgICBpZighYWRkcmVzc0NvbXBvbmVudHMpIHtcclxuICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGkgPSAwO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGFkZHJlc3NDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBhZGRyZXNzQ29tcG9uZW50ID0gYWRkcmVzc0NvbXBvbmVudHNbaV07XHJcbiAgICAgIGlmIChhZGRyZXNzQ29tcG9uZW50ICE9IG51bGwgJiYgYWRkcmVzc0NvbXBvbmVudC50eXBlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgdmFyIGogPSAwO1xyXG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBhZGRyZXNzQ29tcG9uZW50LnR5cGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICB2YXIgbG9jYWxUeXBlID0gYWRkcmVzc0NvbXBvbmVudC50eXBlc1tqXTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9jYWwgdHlwZTogXCIgKyBsb2NhbFR5cGUgKyBcIiAtIFwiICsgYWRkcmVzc0NvbXBvbmVudC5sb25nX25hbWUpO1xyXG4gICAgICAgICAgaWYgKHR5cGUgPT0gbG9jYWxUeXBlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaChhZGRyZXNzQ29tcG9uZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9XHJcbn0pO1xyXG4iLCJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcFwiO1xuYXBwLmNvbnRyb2xsZXIoJ0V2ZW50RGV0YWlsQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRsb2NhdGlvbiwgRXZlbnRGYWN0b3J5KSB7XHJcblxyXG4gICAgICAvLyAkc2NvcGUuZXZlbnREYXRhID0ge1xyXG4gICAgICAvLyAgICAgYXR0ZW5kaW5nOiBmYWxzZSxcclxuICAgICAgLy8gICAgIGxvY2F0aW9uOiBcIkNBUEUgVE9XTiwgUk9OREVCT1NIXCIsXHJcbiAgICAgIC8vICAgICB0aXRsZTogXCJDeWNsaW5nIGluIG51bWJlcnNcIixcclxuICAgICAgLy8gICAgIHR5cGU6IFwiQ1lDTEVcIixcclxuICAgICAgLy8gICAgIGRpc3RhbmNlOiBcIjVLTVwiLFxyXG4gICAgICAvLyAgICAgbGV2ZWw6IFwiTk9WSUNFXCIsXHJcbiAgICAgIC8vICAgICBkYXRlOiBcIjIwIE5vdmVtYmVyIDIwMTVcIixcclxuICAgICAgLy8gICAgIHN1bW1hcnk6IFwiVGhpcyBpcyBhICdGYWNlYm9vaycgc3R5bGVkIENhcmQuIFRoZSBoZWFkZXIgaXMgY3JlYXRlZCBmcm9tIGEgVGh1bWJuYWlsIExpc3QgaXRlbSwgICAgICAgIHRoZSBjb250ZW50IGlzIGZyb20gYSBjYXJkLWJvZHkgY29uc2lzdGluZyBvZiBhbiBpbWFnZSBhbmQgcGFyYWdyYXBoIHRleHQuIFRoZSBmb290ZXIgY29uc2lzdHMgb2YgdGFicywgaWNvbnMgYWxpZ25lZCBsZWZ0LCB3aXRoaW4gdGhlIGNhcmQtZm9vdGVyLlwiLFxyXG4gICAgICAvLyAgICAgbnVtYmVyT2ZBdHRlbmRlZXM6IFwiNFwiXHJcbiAgICAgIC8vIH1cclxuICAgICAgJHNjb3BlLmV2ZW50RGF0YSA9IHt9O1xyXG4gICAgICAkc2NvcGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgRXZlbnRGYWN0b3J5LmdldEV2ZW50KHtpZDogM31cclxuICAgICAgICwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICRzY29wZS5ldmVudERhdGEgPSBldmVudDtcclxuICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICAgfVxyXG4gICAgICAgLCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuXHJcbiAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmF0dGVuZGluZ0Rlc2NyaXB0aW9uID0gXCJKT0lOXCI7XHJcbiAgICAgICAgaWYgKCRzY29wZS5ldmVudERhdGEuYXR0ZW5kaW5nKSB7XHJcbiAgICAgICAgICAkc2NvcGUuYXR0ZW5kaW5nRGVzY3JpcHRpb24gPSBcIkNBTkNFTFwiXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAkc2NvcGUuZG9BdHRlbmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAkc2NvcGUuZXZlbnREYXRhLmF0dGVuZGluZyA9ICEkc2NvcGUuZXZlbnREYXRhLmF0dGVuZGluZztcclxuICAgICAgICAkc2NvcGUuYXR0ZW5kaW5nRGVzY3JpcHRpb24gPSBcIkpPSU5cIjtcclxuICAgICAgICBpZiAoJHNjb3BlLmV2ZW50RGF0YS5hdHRlbmRpbmcpIHtcclxuICAgICAgICAgICRzY29wZS5hdHRlbmRpbmdEZXNjcmlwdGlvbiA9IFwiQ0FOQ0VMXCJcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgfSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCAkbG9jYXRpb24sIEV2ZW50U2VydmljZSkge1xyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgJHNjb3BlLmV2ZW50cyA9IFtdO1xyXG4gIH0pKClcclxuICAkc2NvcGUucmVmcmVzaEV2ZW50cyA9IGZ1bmN0aW9uKCl7XHJcbiAgICBFdmVudFNlcnZpY2UuZ2V0QWxsRXZlbnRzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICRzY29wZS5ldmVudHMgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyKXtcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICAkc2NvcGUucmVmcmVzaEV2ZW50cygpO1xyXG5cclxuICAkc2NvcGUuY2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LkV2ZW50RGF0ZVRpbWVFbmQgPCBuZXcgRGF0ZSgpKSB7XHJcbiAgICAgICRsb2NhdGlvbi5wYXRoKFwiYXBwL3JhdGluZ1wiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGxvY2F0aW9uLnBhdGgoXCJhcHAvZXZlbnQtZGV0YWlsXCIpXHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuIiwiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHBcIjtcbmFwcC5jb250cm9sbGVyKCdMYW5kaW5nQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZVBhcmFtcywgRmFjZWJvb2ssIFByb2ZpbGVTZXJ2aWNlLCAkbG9jYXRpb24pIHtcclxuICAkc2NvcGUuZ2V0TG9naW5TdGF0dXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBGYWNlYm9vay5sb2dvdXQoKTtcclxuICAgIEZhY2Vib29rLmdldExvZ2luU3RhdHVzKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09ICdjb25uZWN0ZWQnKSB7XHJcblxyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCdhcHAvaG9tZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICRzY29wZS5sb2dnZWRJbiA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAkc2NvcGUuZmJMb2dpbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIEZhY2Vib29rLmxvZ2luKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICBQcm9maWxlU2VydmljZS5zZXRQcm9maWxlRnJvbUZhY2Vib29rKHJlc3BvbnNlKTtcclxuICAgICAgICRsb2NhdGlvbi5wYXRoKCdhcHAvcmVnaXN0cmF0aW9uJyk7XHJcbiAgICB9KTtcclxuICB9O1xyXG59KTtcclxuIiwiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHBcIjtcbmFwcC5jb250cm9sbGVyKCdMYXRlc3RDdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJGxvY2F0aW9uKSB7XHJcblxyXG5cclxuXHJcbiAgJHNjb3BlLmdvQ3JlYXRlQW5FdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICRsb2NhdGlvbi5wYXRoKCdhcHAvcmVnaXN0cmF0aW9uJyk7XHJcbiAgfVxyXG5cclxuICAkc2NvcGUuZ29IYW1iYVNhZmUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAkbG9jYXRpb24ucGF0aCgnYXBwL2V2ZW50ZGV0YWlsL1RFTVAnKTtcclxuICB9XHJcbn0pO1xyXG4iLCJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcFwiO1xuYXBwLmNvbnRyb2xsZXIoJ01hcEN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBFdmVudFNlcnZpY2UsICRzdGF0ZSwgJGNvbXBpbGUsICRpb25pY0xvYWRpbmcsICRsb2NhdGlvbikge1xyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgJHNjb3BlLnNsaWRlckRpc3RhbmNlID0gMTA7XHJcbiAgfSkoKVxyXG4gICRzY29wZS5sb2FkaW5nID0gJGlvbmljTG9hZGluZy5zaG93KHtcclxuICAgIGNvbnRlbnQ6ICdHZXR0aW5nIGN1cnJlbnQgbG9jYXRpb24uLi4nLFxyXG4gICAgc2hvd0JhY2tkcm9wOiBmYWxzZVxyXG4gIH0pO1xyXG5cclxuICAkc2NvcGUuc2VhcmNoQnlMb2NhdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhleVwiKTtcclxuICAgIGlmKCEhJHNjb3BlLmdDb29yZHMgJiYgISEkc2NvcGUuc2xpZGVyRGlzdGFuY2Upe1xyXG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2xpZGVyRGlzdGFuY2UpO1xyXG4gICAgICBjb25zb2xlLmxvZygkc2NvcGUuZ0Nvb3Jkcy5sYXQoKSArIFwiIFwiICsgJHNjb3BlLmdDb29yZHMubG5nKCkgKTtcclxuICAgICAgJGxvY2F0aW9uLnBhdGgoJ2FwcC9zZWFyY2g/bGF0PScrJHNjb3BlLmdDb29yZHMubGF0KCkrIFwiJmxuZ1wiKyRzY29wZS5nQ29vcmRzLmxuZygpK1wiJmRpc3Q9XCIrICRzY29wZS5zbGlkZXJEaXN0YW5jZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gICRzY29wZS5pbml0ID0gZnVuY3Rpb24oKSB7XHJcblxyXG5cclxuICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICB6b29tOiAxMCxcclxuICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUFxyXG4gICAgfTtcclxuICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwT3B0aW9ucyk7XHJcblxyXG4gICAgLy9NYXJrZXIgKyBpbmZvd2luZG93ICsgYW5ndWxhcmpzIGNvbXBpbGVkIG5nLWNsaWNrXHJcbiAgICAvLyB2YXIgY29udGVudFN0cmluZyA9IFwiPGRpdj48YSBuZy1jbGljaz0nY2xpY2tUZXN0KCknPkNsaWNrIG1lITwvYT5hPjwvZGl2PmRpdj5cIjtcclxuICAgIC8vIHZhciBjb21waWxlZCA9ICRjb21waWxlKGNvbnRlbnRTdHJpbmcpKCRzY29wZSk7XHJcblxyXG4gICAgLy8gdmFyIGluZm93aW5kb3cgPSBuZXcgZ29vZ2xlLm1hcHMuSW5mb1dpbmRvdyh7XHJcbiAgICAvLyAgIGNvbnRlbnQ6IGNvbXBpbGVkWzBdXHJcbiAgICAvLyB9KTtcclxuXHJcblxyXG5cclxuICAgICRzY29wZS5tYXAgPSBtYXA7XHJcbiAgICBuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uZ2V0Q3VycmVudFBvc2l0aW9uKGZ1bmN0aW9uKHBvcykge1xyXG4gICAgICBjb25zb2xlLmxvZyhwb3MpO1xyXG4gICAgICAkc2NvcGUubWFwLnNldENlbnRlcihuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKHBvcy5jb29yZHMubGF0aXR1ZGUsIHBvcy5jb29yZHMubG9uZ2l0dWRlKSk7XHJcbiAgICAgICRzY29wZS5nQ29vcmRzID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhwb3MuY29vcmRzLmxhdGl0dWRlLCBwb3MuY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICAgICRzY29wZS5tYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgICAgICBwb3NpdGlvbjogJHNjb3BlLmdDb29yZHMsXHJcbiAgICAgICAgbWFwOiAkc2NvcGUubWFwLFxyXG4gICAgICAgIHRpdGxlOiAnWW91ISdcclxuICAgICAgfSk7XHJcbiAgICAgICRzY29wZS5sb2NhdGlvbkNpcmNsZSA9IG5ldyBnb29nbGUubWFwcy5DaXJjbGUoe1xyXG4gICAgICAgIHN0cm9rZUNvbG9yOiAnI0ZGMDAwMCcsXHJcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMC44LFxyXG4gICAgICAgIHN0cm9rZVdlaWdodDogMixcclxuICAgICAgICBmaWxsQ29sb3I6ICcjRkYwMDAwJyxcclxuICAgICAgICBmaWxsT3BhY2l0eTogMC4zNSxcclxuICAgICAgICBtYXA6ICRzY29wZS5tYXAsXHJcbiAgICAgICAgY2VudGVyOiAgJHNjb3BlLmdDb29yZHMsXHJcbiAgICAgICAgcmFkaXVzOiAkc2NvcGUuc2xpZGVyRGlzdGFuY2UqMTAwMFxyXG4gICAgICB9KTtcclxuICAgICAgJGlvbmljTG9hZGluZy5oaWRlKCk7XHJcbiAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgICBhbGVydCgnVW5hYmxlIHRvIGdldCBsb2NhdGlvbjogJyArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gICRzY29wZS4kd2F0Y2goJ3NsaWRlckRpc3RhbmNlJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgY29uc29sZS5sb2coJHNjb3BlLm1hcClcclxuICAgIGlmKCRzY29wZS5tYXAgJiYgJHNjb3BlLmxvY2F0aW9uQ2lyY2xlKSB7XHJcbiAgICAgICRzY29wZS5sb2NhdGlvbkNpcmNsZS5zZXRPcHRpb25zKHtcclxuICAgICAgICByYWRpdXM6ICRzY29wZS5zbGlkZXJEaXN0YW5jZSoxMDAwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy9kbyBzb21ldGhpbmdcclxuICB9KTtcclxufSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuY29udHJvbGxlcignUHJvZmlsZUN0cmwnLCBmdW5jdGlvbiAoJHNjb3BlLCBQcm9maWxlU2VydmljZSkge1xyXG4gIFByb2ZpbGVTZXJ2aWNlLmdldCgxKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgJHNjb3BlLnVzZXIgPSByZXNwb25zZS5kYXRhO1xyXG4gIH0pO1xyXG5cclxufSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuY29udHJvbGxlcignUmF0aW5nQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUpIHtcclxuICAkc2NvcGUuZXZlbnQgPSB7TmFtZTpcIkV2ZW50IE5hbWVcIixEZXNjcmlwdGlvbjpcIkRlc2NyaXB0aW9uXCJ9XHJcbiAgJHNjb3BlLlJhdGU9MztcclxuICAkc2NvcGUuc2V0UmF0ZSA9IGZ1bmN0aW9uKHZhbCl7XHJcbiAgICAkc2NvcGUuUmF0ZSA9IHZhbDtcclxuICB9O1xyXG5cclxuICBjb25zb2xlLmxvZygnSGVyZScpO1xyXG59KTtcclxuIiwiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHBcIjtcbmFwcC5jb250cm9sbGVyKCdSZWdpc3RyYXRpb25DdHJsJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBQcm9maWxlU2VydmljZSkge1xyXG4gIFByb2ZpbGVTZXJ2aWNlLmdldEZhY2VCb29rUHJvZmlsZSgpLnRoZW4oZnVuY3Rpb24gKHByb2ZpbGUpIHtcclxuICAgICRzY29wZS51c2VyID0gcHJvZmlsZTtcclxuICB9KTtcclxuICAvKlxyXG4gICAqICBEb0JcclxuICAgKiAgRW1haWxcclxuICAgKiAgUHJvZmlsZSBQaWN0dXJlXHJcbiAgICovXHJcbiAgJHNjb3BlLmRvUmVnaXN0ZXIgPSBmdW5jdGlvbiAodmFsaWQpIHtcclxuICAgICRzY29wZS5zdWJtaXR0ZWQgPSB0cnVlO1xyXG5cclxuXHJcblxyXG4gICAgJHNjb3BlLnVwZGF0ZVBhc3N3b3JkRXJyb3IoKTtcclxuXHJcbiAgICBpZiAodmFsaWQpIHtcclxuICAgICAgLy9Mb2FkaW5nU3ZjLnNob3coKTtcclxuICAgICAgLy9Vc2Vycy5zaWdudXAoe30sICRzY29wZS5sb2dpbkRhdGFcclxuICAgICAgLy8gICwgZnVuY3Rpb24gKHVzZXIpIHtcclxuICAgICAgLy8gICAgTG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xyXG4gICAgICAvLyAgICAkc2NvcGUuYXV0aGVudGljYXRpb24udXNlciA9IHVzZXI7XHJcbiAgICAgIC8vICAgICRsb2NhdGlvbi5wYXRoKCd2YWx1YXRpb25zJyk7XHJcbiAgICAgIC8vICAgIExvYWRpbmdTdmMuaGlkZSgpO1xyXG4gICAgICAvLyAgfVxyXG4gICAgICAvLyAgLCBmdW5jdGlvbiAoZXJyb3JSZXNwb25zZSkge1xyXG4gICAgICAvLyAgICBjb25zb2xlLmxvZygnZXJyb3Igc2lnbmluZyB1c2VyIHVwJyk7XHJcbiAgICAgIC8vICAgICRzY29wZS5lcnJvciA9IGVycm9yUmVzcG9uc2UuZGF0YS5tZXNzYWdlO1xyXG4gICAgICAvLyAgICBMb2FkaW5nU3ZjLmhpZGUoKTtcclxuICAgICAgLy8gIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJHNjb3BlLmVycm9yID0gJ1BsZWFzZSBmaWxsIGluIGFsbCByZXF1aXJlZCBmaWVsZHMnO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuY29udHJvbGxlcignU2VhcmNoQ3RybCcsIGZ1bmN0aW9uICgkc2NvcGUsICRzdGF0ZVBhcmFtcywgRXZlbnRTZXJ2aWNlLCAkbG9jYXRpb24pIHtcclxuICAgIC8vaW5pdFxyXG4gICAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5sYXQpO1xyXG4gICAgICBjb25zb2xlLmxvZygkc3RhdGVQYXJhbXMubG5nKTtcclxuICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLmRpc3QpO1xyXG5cclxuICAgIH0pKClcclxuICAgICRzY29wZS5ldmVudFR5cGUgPSBbXCJFdmVudCBUeXBlXCJdO1xyXG4gICAgJHNjb3BlLnR5cGVTZWxlY3RlZCA9ICRzY29wZS5ldmVudFR5cGVbMF07XHJcbiAgICAkc2NvcGUuc2VsZWN0ZWRTZWFyY2ggPSAwO1xyXG4gICAgaWYoJHN0YXRlUGFyYW1zLmxhdCAmJiAkc3RhdGVQYXJhbXMubG5nICYmJHN0YXRlUGFyYW1zLmRpc3Qpe1xyXG4gICAgICAkc2NvcGUuc2VsZWN0ZWRTZWFyY2ggPSAxO1xyXG4gICAgfVxyXG4gICAgJHNjb3BlLmV2ZW50c1RvTGlzdCA9IFtdXHJcbiAgICAkc2NvcGUuc2VhcmNoRXZlbnRzID0gZnVuY3Rpb24oKXtcclxuICAgICAgdmFyIHNlYXJjaEJ5ID0gJHNjb3BlLnNlbGVjdGVkU2VhcmNoO1xyXG4gICAgICBFdmVudFNlcnZpY2UuZ2V0QWxsRXZlbnRzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICRzY29wZS5ldmVudHNUb0xpc3QgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuc2VhcmNoRXZlbnRzKCk7XHJcbiAgICAkc2NvcGUuZ2V0VHlwZXM9ZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIEV2ZW50U2VydmljZS5nZXRFdmVudFR5cGVzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cclxuICAgICAgICAkc2NvcGUuZXZlbnRUeXBlcyA9IFtdO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCByZXNwb25zZS5kYXRhLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICRzY29wZS5ldmVudFR5cGVzLnB1c2gocmVzcG9uc2UuZGF0YVtpXS5OYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmV2ZW50VHlwZXMpXHJcbiAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAgICAkc2NvcGUuZ2V0VHlwZXMoKTtcclxuXHJcbiAgICAkc2NvcGUudG9nZ2xlR3JvdXAgPSBmdW5jdGlvbihncm91cCl7XHJcbiAgICAgIGlmICgkc2NvcGUuaXNHcm91cFNob3duKGdyb3VwKSkge1xyXG4gICAgICAgICRzY29wZS5zaG93bkdyb3VwID0gbnVsbDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkc2NvcGUuc2hvd25Hcm91cCA9IGdyb3VwO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnRvZ2dsZVNlbGVjdGlvbiA9IGZ1bmN0aW9uKHNlbGVjdGVkLCBncm91cCkge1xyXG4gICAgICAkc2NvcGUudHlwZVNlbGVjdGVkID0gc2VsZWN0ZWQ7XHJcbiAgICAgICRzY29wZS50b2dnbGVHcm91cChncm91cCk7XHJcbiAgICB9O1xyXG5cclxuICAgICRzY29wZS5pc0dyb3VwU2hvd24gPSBmdW5jdGlvbih0eXBlLCBncm91cCkge1xyXG4gICAgICByZXR1cm4gJHNjb3BlLnNob3duR3JvdXAgPT09IGdyb3VwICYmICRzY29wZS50eXBlU2VsZWN0ZWQgIT09IHR5cGU7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLmlzU2hvd24gPSBmdW5jdGlvbih0eXBlLCBncm91cCkge1xyXG4gICAgICByZXR1cm4gJHNjb3BlLnNob3duR3JvdXAgPT09IGdyb3VwICYmICRzY29wZS50eXBlU2VsZWN0ZWQgIT09IHR5cGU7XHJcbiAgICB9O1xyXG4gICAgJHNjb3BlLnNldEFjdGl2ZVNlYXJjaCA9IGZ1bmN0aW9uKHNlbGVjdGlvbil7XHJcbiAgICAgICRzY29wZS5zZWxlY3RlZFNlYXJjaCA9IHNlbGVjdGlvbjtcclxuICAgIH1cclxuICAgICRzY29wZS5hY3RpdmVTZWFyY2ggPSBmdW5jdGlvbihzZWxlY3Rpb24pe1xyXG4gICAgICByZXR1cm4gJHNjb3BlLnNlbGVjdGVkU2VhcmNoID09PSBzZWxlY3Rpb247XHJcbiAgICB9XHJcbiAgICAkc2NvcGUuZmlsdGVyUmVzdWx0cyA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KXtcclxuICAgICAgaWYoJHNjb3BlLnR5cGVTZWxlY3RlZCA9PSBcIkV2ZW50IFR5cGVcIil7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYoJHNjb3BlLnR5cGVTZWxlY3RlZCA9PSBldmVudE9iamVjdC5FdmVudFR5cGUuTmFtZSl7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgJHNjb3BlLmdvTWFwID0gZnVuY3Rpb24oKXtcclxuICAgICAgJGxvY2F0aW9uLnBhdGgoJ2FwcC9tYXAnKTtcclxuICAgIH1cclxuICB9KTtcclxuIiwiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHBcIjtcbmFwcC5mYWN0b3J5KCdDaGF0cycsIGZ1bmN0aW9uICgpIHtcclxuICAvLyBNaWdodCB1c2UgYSByZXNvdXJjZSBoZXJlIHRoYXQgcmV0dXJucyBhIEpTT04gYXJyYXlcclxuXHJcbiAgLy8gU29tZSBmYWtlIHRlc3RpbmcgZGF0YVxyXG4gIHZhciBjaGF0cyA9IFt7XHJcbiAgICBpZDogMCxcclxuICAgIG5hbWU6ICdCZW4gU3BhcnJvdycsXHJcbiAgICBsYXN0VGV4dDogJ1lvdSBvbiB5b3VyIHdheT8nLFxyXG4gICAgZmFjZTogJ2ltZy9iZW4ucG5nJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAxLFxyXG4gICAgbmFtZTogJ01heCBMeW54JyxcclxuICAgIGxhc3RUZXh0OiAnSGV5LCBpdFxcJ3MgbWUnLFxyXG4gICAgZmFjZTogJ2ltZy9tYXgucG5nJ1xyXG4gIH0sIHtcclxuICAgIGlkOiAyLFxyXG4gICAgbmFtZTogJ0FkYW0gQnJhZGxleXNvbicsXHJcbiAgICBsYXN0VGV4dDogJ0kgc2hvdWxkIGJ1eSBhIGJvYXQnLFxyXG4gICAgZmFjZTogJ2ltZy9hZGFtLmpwZydcclxuICB9LCB7XHJcbiAgICBpZDogMyxcclxuICAgIG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXHJcbiAgICBsYXN0VGV4dDogJ0xvb2sgYXQgbXkgbXVrbHVrcyEnLFxyXG4gICAgZmFjZTogJ2ltZy9wZXJyeS5wbmcnXHJcbiAgfSwge1xyXG4gICAgaWQ6IDQsXHJcbiAgICBuYW1lOiAnTWlrZSBIYXJyaW5ndG9uJyxcclxuICAgIGxhc3RUZXh0OiAnVGhpcyBpcyB3aWNrZWQgZ29vZCBpY2UgY3JlYW0uJyxcclxuICAgIGZhY2U6ICdpbWcvbWlrZS5wbmcnXHJcbiAgfV07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIGNoYXRzO1xyXG4gICAgfSxcclxuICAgIHJlbW92ZTogZnVuY3Rpb24gKGNoYXQpIHtcclxuICAgICAgY2hhdHMuc3BsaWNlKGNoYXRzLmluZGV4T2YoY2hhdCksIDEpO1xyXG4gICAgfSxcclxuICAgIGdldDogZnVuY3Rpb24gKGNoYXRJZCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGNoYXRzW2ldLmlkID09PSBwYXJzZUludChjaGF0SWQpKSB7XHJcbiAgICAgICAgICByZXR1cm4gY2hhdHNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcbn0pO1xyXG4iLCJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcFwiO1xuYXBwLnNlcnZpY2UoJ0V2ZW50RmFjdG9yeScsIFsnJGh0dHAnLCAnY29uZmlnJyxcclxuICAgIGZ1bmN0aW9uICgkaHR0cCwgY29uZmlnKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0QWxsRXZlbnRzOiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnRzJywgY29uZmlnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEV2ZW50OiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnQ/aWQ9JytpZCwgY29uZmlnKVxyXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2VzcyhyZXN1bHQpe1xyXG5cclxuICAgICAgICAgIH0sIGZ1bmN0aW9uIGVycm9yKGVycil7XHJcblxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZUV2ZW50IDogZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCd2MS9jcmVhdGVldmVudCcsIGV2ZW50LCBjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuc2VydmljZSgnRXZlbnRTZXJ2aWNlJywgWyckaHR0cCcsICdjb25maWcnLFxyXG4gICAgZnVuY3Rpb24gKCRodHRwLCBjb25maWcpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvY3JlYXRlZXZlbnQnLCBkYXRhLCBjb25maWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRBbGxFdmVudHM6IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoY29uZmlnLmJhc2VTZXJ2aWNlVVJMICsgJy92MS9ldmVudHMnLCBjb25maWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRFdmVudDogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldChjb25maWcuYmFzZVNlcnZpY2VVUkwgKyAnL3YxL2V2ZW50P2lkPScraWQsIGNvbmZpZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEV2ZW50VHlwZXM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnQtdHlwZXMnLCBjb25maWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRFdmVudEJ5VXNlcjogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldChjb25maWcuYmFzZVNlcnZpY2VVUkwgKyAnL3YxL2V2ZW50cy1ieS11c2VyJywgY29uZmlnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0RXZlbnRCeUF0dGVuZGVlOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgIHZhciBwYXJhbSA9IE9iamVjdC5rZXlzKGRhdGEpO1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldChjb25maWcuYmFzZVNlcnZpY2VVUkwgKyAnL3YxL2V2ZW50cy1ieS1hdHRlbmRlZT8nK3BhcmFtK1wiPVwiK2RhdGEucGFyYW0sIGNvbmZpZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEV2ZW50QnlTdWJ1cmI6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgdmFyIHBhcmFtID0gT2JqZWN0LmtleXMoZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnRzLWJ5LXN1YnVyYj8nK3BhcmFtK1wiPVwiK2RhdGEucGFyYW0sIGNvbmZpZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEV2ZW50QnlDb29yZHM6IGZ1bmN0aW9uKGxhdGl0dWRlLCBsb25naXR1ZGUsIHJhZGl1cyl7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnRzLWJ5LWNvb3JkaW5hdGVzP2xhdGl0dWRlPScrbGF0aXR1ZGUrJyZsb25naXR1ZGU9Jytsb25naXR1ZGUrJyZyYWRpdXM9JytyYWRpdXMsIGNvbmZpZylcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbl0pO1xyXG4iLCJpbXBvcnQge2FwcH0gZnJvbSBcIi4uL2FwcFwiO1xuYXBwLmZhY3RvcnkoXCJMb2NhbFN0b3JhZ2VcIiwgWyckd2luZG93JyxcclxuICBmdW5jdGlvbiAoJHdpbmRvdykge1xyXG4gICAgdmFyIF9mYWNlYm9va0F1dGggPSBudWxsXHJcbiAgICB2YXIgX3Byb2ZpbGVJZCA9IDE7XHJcbiAgICByZXR1cm4ge1xyXG5cclxuXHJcblxyXG4gICAgICBzZXQgZmFjZWJvb2tBdXRoKHZhbHVlKSB7XHJcbiAgICAgICAgX2ZhY2Vib29rQXV0aCA9IHZhbHVlO1xyXG4gICAgICB9LFxyXG4gICAgICBnZXQgZmFjZWJvb2tBdXRoKCkge1xyXG4gICAgICAgIHJldHVybiBfZmFjZWJvb2tBdXRoO1xyXG4gICAgICB9LFxyXG5cclxuXHJcbiAgICB9O1xyXG4gIH1dKTtcclxuIiwiaW1wb3J0IHthcHB9IGZyb20gXCIuLi9hcHBcIjtcbmFwcC5zZXJ2aWNlKCdMb2NhdGlvblNlcnZpY2UnLCBbJyRodHRwJywgJ2NvbmZpZycsXHJcbiAgICBmdW5jdGlvbiAoJGh0dHAsIGNvbmZpZykge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNyZWF0ZUV2ZW50OiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoY29uZmlnLmJhc2VTZXJ2aWNlVVJMICsgJy92MS9jcmVhdGVldmVudCcsIGRhdGEsIGNvbmZpZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEFsbEV2ZW50czogZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldChjb25maWcuYmFzZVNlcnZpY2VVUkwgKyAnL3YxL2V2ZW50cycsIGNvbmZpZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEV2ZW50OiBmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnQ/aWQ9JytpZCwgY29uZmlnKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0RXZlbnRCeVVzZXI6IGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoY29uZmlnLmJhc2VTZXJ2aWNlVVJMICsgJy92MS9ldmVudHNieXVzZXInLCBjb25maWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRFdmVudEJ5QXR0ZW5kZWU6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgdmFyIHBhcmFtID0gT2JqZWN0LmtleXMoZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnRzYnlhdHRlbmRlZT8nK3BhcmFtK1wiPVwiK2RhdGEucGFyYW0sIGNvbmZpZylcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldEV2ZW50QnlTdWJ1cmI6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgdmFyIHBhcmFtID0gT2JqZWN0LmtleXMoZGF0YSk7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGNvbmZpZy5iYXNlU2VydmljZVVSTCArICcvdjEvZXZlbnRzYnlzdWJ1cmI/JytwYXJhbStcIj1cIitkYXRhLnBhcmFtLCBjb25maWcpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRFdmVudEJ5Q29vcmRzOiBmdW5jdGlvbihsYXRpdHVkZSwgbG9uZ2l0dWRlLCByYWRpdXMpe1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldChjb25maWcuYmFzZVNlcnZpY2VVUkwgKyAnL3YxL2V2ZW50c2J5Y29vcmRpbmF0ZXM/bGF0aXR1ZGU9JytsYXRpdHVkZSsnJmxvbmdpdHVkZT0nK2xvbmdpdHVkZSsnJnJhZGl1cz0nK3JhZGl1cywgY29uZmlnKVxyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH1cclxuXSk7XHJcbiIsImltcG9ydCB7YXBwfSBmcm9tIFwiLi4vYXBwXCI7XG5hcHAuc2VydmljZSgnUHJvZmlsZVNlcnZpY2UnLFxyXG4gIGZ1bmN0aW9uICgkaHR0cCwgY29uZmlnLCBsb2NhbFN0b3JhZ2VTZXJ2aWNlLCAkcSxGYWNlYm9vaykge1xyXG4gIHZhciBiYXNlID0gY29uZmlnLmJhc2VTZXJ2aWNlVVJMICsgXCIvdjEvXCI7XHJcbiAgdmFyIHByb2ZpbGVLZXkgPSBcInByb2ZpbGVLZXlcIjtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldFByb2ZpbGVGcm9tRmFjZWJvb2s6IGZ1bmN0aW9uIChwcm9maWxlKSB7XHJcbiAgICAgIGxvY2FsU3RvcmFnZVNlcnZpY2Uuc2V0KHByb2ZpbGVLZXksIHByb2ZpbGUpO1xyXG4gICAgfSxcclxuICAgIGdldEFsbDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZSArICd1c2VycycsIGNvbmZpZyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0QnlJZDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgIHZhciB2YWwgPSBpZCB8fCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShwcm9maWxlS2V5KTtcclxuXHJcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoYmFzZSArICd1c2Vycz91c2VybmFtZT0nICsgdmFsLCBjb25maWcpO1xyXG5cclxuICAgIH0sXHJcbiAgICBnZXRCeVVzZXJuYW1lOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgdmFyIHZhbCA9IGlkIHx8IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHByb2ZpbGVLZXkpO1xyXG5cclxuICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlICsgJ3VzZXJzP3VzZXJuYW1lPScgKyB2YWwsIGNvbmZpZyk7XHJcbiAgICB9LFxyXG4gICAgZ2V0OiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgdmFyIHZhbCA9IGlkIHx8IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHByb2ZpbGVLZXkpO1xyXG5cclxuICAgICAgcmV0dXJuICRodHRwLmdldChiYXNlICsgJ3VzZXI/aWQ9JyArIHZhbCwgY29uZmlnKTtcclxuXHJcbiAgICB9LFxyXG4gICAgZ2V0UHJvZmlsZUlkOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgfSxcclxuICAgIGdldEZhY2VCb29rUHJvZmlsZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgZGVmZXIgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgRmFjZWJvb2suYXBpKCcvbWUnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgdmFyIHByb2YgPSB7XHJcbiAgICAgICAgICBGaXJzdE5hbWVzOiByZXNwb25zZS5maXJzdF9uYW1lLFxyXG4gICAgICAgICAgTGFzdE5hbWU6IHJlc3BvbnNlLmxhc3RfbmFtZSxcclxuICAgICAgICAgIEdlbmRlcjogcmVzcG9uc2UuZ2VuZGVyXHJcbiAgICAgICAgfTtcclxuICAgICAgICBkZWZlci5yZXNvbHZlKHByb2YpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XHJcblxyXG4gICAgfVxyXG4gIH07XHJcbn1cclxuKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
