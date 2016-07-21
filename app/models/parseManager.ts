declare var Parse: any;
const _ = require('lodash');

var Parse = require('parse').Parse;
Parse.initialize('test1234');
Parse.serverURL = 'https://mainstream.ninja/parse'

export class ParseManager {
    ActivityClass: any;
    AttendanceClass: any;
    LocationClass: any;
    Parse: any;
    constructor() {
      console.log('CONSTRUCTOR')
      this.Parse = Parse;
      this.ActivityClass = this.Parse.Object.extend("Activity");
      this.AttendanceClass = this.Parse.Object.extend("Attendance");
      this.LocationClass = this.Parse.Object.extend("Location");
      this.Parse.Object.registerSubclass('Activity', this.ActivityClass);
      this.Parse.Object.registerSubclass('Attendance', this.AttendanceClass);
      this.Parse.Object.registerSubclass('Location', this.LocationClass);
      this.fbInit();
    }
    
    signUp(data, success:()=>void, error:(res)=>void)
    {
      console.log('signUp');
      console.log(data);
      _.forEach(data, (value, key) => {
        if(key == 'dateOfBirth') {
          this.Parse.User.current().set(key, new Date(value));
        } else {
          this.Parse.User.current().set(key, value);
        }
      })
      this.Parse.User.current().save(null, {
        success: (res) => {
          success();
        },
        error: (res) => {
          console.log("error");
          console.log(res);
          error(res);
        }
      });
      console.log('here');
    }
    userRegistered() {
      if(!this.Parse.User.current()) return false;
      if(!this.Parse.User.current().get('profilePicture')) return false;
      if(!this.Parse.User.current().get('firstName')) return false;
      if(!this.Parse.User.current().get('lastName')) return false;
      if(!this.Parse.User.current().get('gender')) return false;
      // if(!this.Parse.User.current().get('address')) return false;
      if(!this.Parse.User.current().get('dateOfBirth')) return false;
      if(!this.Parse.User.current().get('mobileNumber')) return false;
      if(!this.Parse.User.current().get('email')) return false;
      // if(!this.Parse.User.current().get('fbId')) isValid = false;
      return true;
    }
    getCurrentUser(){
      return this.Parse.User.current();
    }
    joinActivity(activityId: any, error:(res)=>void, success:(res)=>void)
    {
      console.log('Joining');
      console.log(activityId);
      var activityQuery = new this.Parse.Query(this.ActivityClass);
      activityQuery.get(activityId, {
        success : (res) => {
          var attend = new this.AttendanceClass();
          attend.set('userReference', this.Parse.User.current());
          attend.set('activityReference', res);
          var activityObj = res;
          attend.save(null, {
            success : (res) => {
              console.log('joined Event')
              success(activityObj.toJSON());
            },
            error   : (err) => {
              console.log('ERROR: joining Event')
              console.log(err);
              error(err);
            }
          })
        },
        error : (err) => {
          console.log('ERROR: joining Event');
          console.log(err);
          error(err);
        }
      })
    }
    getActivity(name: String, error:(res)=>void, success:(res)=>void)
    {
    }
    getActivitiesByLocation(distance:number, latitude: number, longitude:number, error:(res)=>void, success:(res)=>void)
    {
      var point = new this.Parse.GeoPoint({
        'latitude' : latitude,
        'longitude' : longitude,
      });

      var locationQuery = new this.Parse.Query(this.LocationClass);
      locationQuery.withinKilometers('coordinates', point, distance);
      locationQuery.find({
        success: (res) => { 
          console.log(res);
          for(var i = 0; i < res.length; i++) {
            var activityQuery = new this.Parse.Query(this.ActivityClass);
            activityQuery.equalTo('startLocation', res[i]);
            var d =  new Date();
            activityQuery.greaterThanOrEqualTo(
              'startDate', 
              {
                "__type":"Date", 
                "iso": d.toISOString()
              }
            );
            activityQuery.find({
              success: (res) => { 
                console.log(res);
                for(var i = 0; i < res.length; i++){
                  var activityObj  = res[i];
                  var attendanceQuery = new this.Parse.Query(this.AttendanceClass); 
                  attendanceQuery.equalTo('activityReference', activityObj);
                  attendanceQuery.equalTo('userReference', this.getCurrentUser());
                  attendanceQuery.find({
                    success : function(response) {
                      var respObj = activityObj.toJSON();
                      if(response.length){
                        respObj.isAttending = true;
                      } else {
                        respObj.isAttending = false;
                      }
                      console.log(respObj);
                      success([
                        respObj
                      ]);
                    },
                    error: function(err){
                      error(err);
                    }
                  })
                }
              },
              error: (err) =>{
                console.log('parse saving error');
                error(err);
              }
            });
          }
          success([]);
          // var retArray = res.map(function(obj) {
          //   return obj.toJSON();
          // })
          // success(retArray);
        },
        error:(err) => {
          console.log('parse saving error');
          error(err);
        }
      })
      // activityQuery.near('startLocation', point);
      // activityQuery.include('author');
      // activityQuery.find({
      //   success: (res) => { 
      //     console.log(res);
      //     var retArray = res.map(function(obj) {
      //       return obj.toJSON();
      //     })
      //     success(retArray);
      //   },
      //   error:(err) =>{
      //     console.log('parse saving error');
      //     error(err);
      //   }
      // });
    }
    getActivitiesByTime(error:(res) => void, success:(res) =>  void)
    {
    }
    getUserActivities(error:(res) => void, success:(res) => void)
    {
      var userQuery = this.Parse.User.current().relation('activities');

      userQuery.find({
        success: (res) => { 
          success(res);
        },
        error:(err) =>{
          console.log('parse saving error');
          error(err);
        }
      });
    }
    createActivity(data: any, error:(res)=>void, success:(res)=>void)
    {
      var activity = new this.ActivityClass();
      var locationObj = new this.LocationClass();
      _.forEach(data, (value, key) => {
        if(key == 'startLocation' || key == 'endLocation') {
          // activity.set(key, new this.Parse.GeoPoint(value));
          return;
        } else if(key == 'startDate' || key == 'endDate') {
          activity.set(key, new Date(value));
        } else {
          activity.set(key, value);
        }
      })
       
      Parse.Cloud.run('checkLocationExists', {
        'latitude' : data.startLocation.latitude,
        'longitude' : data.startLocation.longitude,
      }).then(
      (res) => {
        locationObj.set('coordinates', new this.Parse.GeoPoint(data.startLocation));
        if(!res.exists){
          locationObj.save(null, {
            success: (res) => { 
              this.saveActivity(res, activity, error, success);
            },
            error: (err, response) => {
              console.log('ERROR: LOCATION SAVE');
              console.log(err);
              console.log(response);
            }

          })
        } else {
          this.saveActivity(res.obj, activity, error, success);
        }
      },
      (err) =>  {
      })

    }
    saveActivity(locationObj, activityObj, error:(res)=>void, success:(res)=>void) {
      var user = this.Parse.User.current();
      activityObj.set('author', user);
      activityObj.set('startLocation', locationObj);
      activityObj.save(null, {
        success: (res) => { 
          console.log('activity saved to parse server');
          var userRelation = user.relation('activities');
          userRelation.add(activityObj);
          user.save(null, {
            success: (res) => { 
              console.log('user-activity relation saved');
              console.log(res);
              success(res);
            },
            error: (err) => {
              console.log('parse saving error');
              console.log(err);
              error(res);
            }
          });
          // success(res)
        },
        error:(err)=> {
          console.log('parse saving error');
          console.log(err);
          error(err);
        }
      });
    }
		getActivities() {
      console.log('fetching queries');
			var query = new Parse.Query(this.ActivityClass);
			query.find({
				success: function(results) {
					console.log("Successfully retrieved " + results.length + " scores.");
					// Do something with the returned Parse.Object values
					for (var i = 0; i < results.length; i++) {
						var object = results[i];
						console.log(object);
						console.log(object.get('name'));
					}
				},
				error: function(error) {
					console.log("Error: " + error.code + " " + error.message);
				}
			});

		}
    fbInit(){
      this.Parse.FacebookUtils.init({

        /*
           The app id of the web app;
           To register a new app visit Facebook App Dashboard
           ( https://developers.facebook.com/apps/ )
         */
        appId: '1824765444411364',//'289482390688',

        /*
           Adding a Channel File improves the performance
           of the javascript SDK, by addressing issues
           with cross-domain communication in certain browsers.
         */

        // channelUrl: 'app/channel.html',

        /*
           Set if you want to check the authentication status
           at the start up of the app
         */
        status: true,

        /*
           Enable cookies to allow the server to access
           the session
         */
        cookie: true,

        /* Parse XFBML */
        xfbml: true,

        version    : 'v2.6',
      });
    }
    deviceLogin(authData, success:any, error:any) {
      if(!this.Parse.User.current()) {
      var user = new this.Parse.User();
      } else {
       var user = this.Parse.User.current();
      }
      this.Parse.FacebookUtils.logIn(authData, {
        success: (response) => {
          console.log('success');
          console.log(response);
          // console.log(this.Parse.User.isModelComplete())
          success(response);
        },
        error: (response) => {
          console.log('error');
          console.log(response);
          error(response);
        }
      });
    }
    facebookLogin(perms, success:any, error:any) {
      this.Parse.FacebookUtils.logIn(perms, {
        success: (response) => {
          console.log('success');
          console.log(response);
          // console.log(this.Parse.User.isModelComplete())
          success(response);
        },
        error: (response) => {
          console.log('error');
          console.log(response);
          error(response);
        }
      });
    }
		logOut(success:any, error:any){
      if(!!this.Parse.User.current()){
        this.Parse.User.logOut();
        success();
      } else {
        error("User not logged in");
      }
    }
}

      // this.Location = this.Parse.Object.extend("Location", {
      //   getAddress: function(){
        
      //   },
      //   getCoordinates: function(){
        
      //   },
      // });
      // this.Parse.User.extend({}, {
      //   isModelComplete: function() {
      //     console.log(this.get(''));
      //   },
      //   getProfileData: function()(){
        
      //   },
      //   getFirstName: function(){
         
      //   },
      //   getLastName: function(){
        
      //   },
      //   getEmail: function(){
        
      //   },
      //   getEmailVerified: function(){
        
      //   },
      //   getMobileNumber: function(){
        
      //   },
      //   getLocation: function(){
        
      //   },
      //   getVerified: function(){
        
      //   },
      //   getJoined: function(){
        
      //   },
      //   getRating: function(){
        
      //   },
      //   getProfilePicture: function(){
        
      //   },
      // })
