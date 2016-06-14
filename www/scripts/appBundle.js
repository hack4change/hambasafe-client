///<reference path="../typings/tsd.d.ts"/>
///<reference path="ref.ts"/>
var app = angular.module('starter', ['ui.router', 'ionic', "LocalStorageModule", 'ionic-datepicker'])
    .constant('config', {
    baseServiceURL: "http://hsdevapi1.azurewebsites.net"
})
    .run(function ($ionicPlatform, $rootScope, $window) {
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
        $rootScope.user = {};
    });
})
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, ionicDatePickerProvider) {
    $httpProvider.defaults.useXDomain = true;
    // FacebookProvider.init('289482390688');
    var datePickerObj = {
        inputDate: new Date(),
        setLabel: 'Set',
        todayLabel: 'Today',
        closeLabel: 'Close',
        mondayFirst: false,
        weeksList: ["S", "M", "T", "W", "T", "F", "S"],
        monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        templateType: 'popup',
        from: new Date(2012, 8, 1),
        to: new Date(2018, 8, 1),
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
    })
        .state('app.splash', {
        url: '/splash',
        views: {
            'menuContent': {
                templateUrl: 'templates/splash.html',
                controller: 'SplashCtrl'
            }
        }
    })
        .state('app.landing', {
        url: '/landing',
        views: {
            'menuContent': {
                templateUrl: 'templates/landing.html',
                controller: 'LandingCtrl'
            }
        }
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
    //if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/registration');
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
app.controller('AboutUsCtrl', function ($scope) {
});
app.controller('AccountCtrl', function ($scope) {
});
app.controller('ChatsCtrl', function ($scope, Chats) {
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
app.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});
app.controller('CreateCtrl', function ($scope, EventFactory) {
    //init
    (function () {
        $scope.shownGroup = null;
        $scope.options = {};
    })();
    $scope.searchEvents = function () {
        EventFactory.create({
            'id': 1
        }, function (event) {
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
        var placeDetails = {};
        placeDetails.Address = details.formatted_address;
        placeDetails.Suburb = extractSuburb(details.address_components);
        placeDetails.City = extractCity(details.address_components);
        placeDetails.Province = extractProvince(details.address_components);
        placeDetails.Country = extractCountry(details.address_components);
        placeDetails.Latitude = details.geometry.location.lat();
        placeDetails.Longtitude = details.geometry.location.lng();
        return placeDetails;
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
app.controller('DashCtrl', function ($scope) {
});
app.controller('EventDetailCtrl', function ($scope, $location, EventFactory) {
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
app.controller('EventRatingCtrl', function ($scope) {
    console.log('Here');
});
app.controller('HomeCtrl', function ($scope, $location, EventService) {
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
app.controller('LandingCtrl', function ($scope, $stateParams, $location, $window, $ionicLoading, ProfileService) {
    (function () {
    })();
    $scope.fbLogin = function () {
        console.log('fbLogin');
        ProfileService.doFBLogin().then(function (response) {
            console.log(response);
            if (response === "connected") {
                $location.path('app/registration');
            }
            else {
                $ionicLoading.show({
                    template: 'Failed, please try again.',
                    duration: 1000
                });
            }
        });
    };
    angular.element(document).ready(function () {
        FB.getLoginStatus(function (response) {
            if (response.status === "connected") {
                $location.path('app/registration');
            }
        });
    });
});
app.controller('LatestCtrl', function ($scope, $location) {
    $scope.goCreateAnEvent = function () {
        $location.path('app/registration');
    };
    $scope.goHambaSafe = function () {
        $location.path('app/eventdetail/TEMP');
    };
});
app.controller('MapCtrl', function ($scope, EventService, $state, $compile, $ionicLoading, $location) {
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
app.controller('ProfileCtrl', function ($scope, ProfileService) {
    ProfileService.get(1).then(function (response) {
        $scope.user = response.data;
    });
});
app.controller('RatingCtrl', function ($scope) {
    $scope.event = { Name: "Event Name", Description: "Description" };
    $scope.Rate = 3;
    $scope.setRate = function (val) {
        $scope.Rate = val;
    };
    console.log('Here');
});
app.controller('RegistrationCtrl', function ($rootScope, $scope, $window, $stateParams, ProfileService, ionicDatePicker) {
    (function () {
        $scope.genders = [
            'male',
            'female',
            'other',
        ];
        $scope.genderOpen = false;
    })();
    angular.element(document).ready(function () {
        ProfileService.getRegistrationData().then(function (profile) {
            $scope.user = profile;
            console.log(profile);
        });
    });
    var pickDateObj = {
        callback: function (val) {
            $scope.user.dateOfBirth = new Date(val);
        },
        disabledDates: [
            new Date(2016, 2, 16),
            new Date(2015, 3, 16),
            new Date(2015, 4, 16),
            new Date(2015, 5, 16),
            new Date('Wednesday, August 12, 2015'),
            new Date("08-16-2016"),
            new Date(1439676000000)
        ],
        from: new Date(2012, 1, 1),
        to: new Date(2016, 10, 30),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [0],
        closeOnSelect: false,
        templateType: 'popup' //Optional
    };
    $scope.openDatePicker = function () {
        ionicDatePicker.openDatePicker(pickDateObj);
    };
    $scope.isGenderOpen = function () {
        return $scope.genderOpen;
    };
    $scope.toggleGenderOpen = function () {
        $scope.genderOpen = !$scope.genderOpen;
    };
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
app.controller('SearchCtrl', function ($scope, $stateParams, EventService, $location) {
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
            console.log(response);
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
app.controller('SplashCtrl', function ($scope, $location, EventService) {
    (function () {
    })();
    $scope.goToLanding = function () {
        $location.path("app/landing");
    };
    $scope.goToTerms = function () {
        $location.path("app/terms");
    };
});
app.controller('TellaFriendCtrl', function ($scope) {
});
app.controller('TermsCtrl', function ($scope) {
    console.log('Here');
});
app.factory('Chats', function () {
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
app.service('EventFactory', ['$http', 'config',
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
app.service('EventService', ['$http', 'config',
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
app.service('FacebookService', function ($http, config, localStorageService, $q) {
    var base = config.baseServiceURL + "/v1/";
    var profileKey = "profileKey";
    return {
        login: function () {
        }
    };
});
app.factory("LocalStorage", ['$window',
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
app.service('LocationService', ['$http', 'config',
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
        getProfileId: function () {
        },
        doFBLogin: function () {
            var defer = $q.defer();
            FB.getLoginStatus(function (response) {
                if (response.status !== 'connected') {
                    FB.login(function (response) {
                        if (response.status === 'connected') {
                            this.setProfileFromFacebook(response.authResponse);
                            $rootScope.loggedIn = true;
                        }
                        defer.resolve(response.status);
                    });
                }
                else {
                    this.setProfileFromFacebook(response.authResponse);
                    $rootScope.loggedIn = true;
                    defer.resolve('connected');
                }
            }.bind(this));
            return defer.promise;
        },
        getRegistrationData: function () {
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
                    firstName: response['first_name'],
                    lastName: response['last_name'],
                    dateOfBirth: response['birthday'],
                    gender: response['gender'],
                    email: response['email'],
                };
                $rootScope.currentUser = response['id'];
                defer.resolve(profile);
            });
            return defer.promise;
        },
        logout: function () {
            this.setProfileFromFacebook('');
        }
    };
});
//# sourceMappingURL=appBundle.js.map