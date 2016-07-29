declare var Parse: any;
const _ = require('lodash');

var Parse = require('parse').Parse;
Parse.initialize('test1234');
Parse.serverURL = 'https://mainstream.ninja/parse'

export class ParseManager {
  ActivityClass: any;
  AttendanceClass: any;
  LocationClass: any;
  InviteClass: any;
  FriendsClass: any;
  UserRatingClass: any;
  ActivityRatingClass: any;
  Parse: any;
  inviteSubscription;
  attendingSubscription;
  constructor() {
    console.log('CONSTRUCTOR')
    this.Parse = Parse;
    this.ActivityClass = this.Parse.Object.extend("Activity");
    this.AttendanceClass = this.Parse.Object.extend("Attendance");
    this.LocationClass = this.Parse.Object.extend("Location");
    this.InviteClass = this.Parse.Object.extend("Invite");
    this.FriendsClass = this.Parse.Object.extend("Friends");
    this.UserRatingClass = this.Parse.Object.extend("UserRating");
    this.ActivityRatingClass = this.Parse.Object.extend("ActivityRating");
    this.Parse.Object.registerSubclass('Activity', this.ActivityClass);
    this.Parse.Object.registerSubclass('Attendance', this.AttendanceClass);
    this.Parse.Object.registerSubclass('Location', this.LocationClass);
    this.fbInit();
  }
  
  /**
   *  SUBSCRIPTIONS
   *
   */
  subscribeToAttending(error: any, createCb: any, deleteCb: any) {
    var query = new Parse.Query(this.AttendanceClass);
    query.equalTo('userReference', this.Parse.User.current());
    query.include('activityReference');
    query.include('activityReference.startLocation');
    query.include('activityReference.author');
    query.include('ratingPtr');
    this.attendingSubscription = query.subscribe();
    this.attendingSubscription.on('create', (attendance) => {
      var attendedActivity = attendance.get('activityReference').toJSON();
      attendedActivity.isAttending = true;
      if (!attendance.get('ratingPtr')) {
        attendedActivity.mustRate = true;
      } else {
        attendedActivity.mustRate = false;
      }
      createCb([
        attendedActivity
      ]);
    })
    this.attendingSubscription.on('update', (attendance) => {
      var attendedActivity = attendance.get('activityReference').toJSON();
      attendedActivity.isAttending = true;
      if (!attendance.get('ratingPtr')) {
        attendedActivity.mustRate = true;
      } else {
        attendedActivity.mustRate = false;
      }
      createCb([
        attendedActivity
      ]);
    })
    query.find({
      success: (activitiesAttending) => {
        for (var i = 0; i < activitiesAttending.length; i++) {
          var attendedActivity = activitiesAttending[i].get('activityReference').toJSON();
          attendedActivity.isAttending = true;
          console.log(activitiesAttending[i].get('ratingPtr'));
          console.log(activitiesAttending[i].toJSON());
          if (!activitiesAttending[i].get('ratingPtr')) {
            attendedActivity.mustRate = true;
          } else {
            attendedActivity.mustRate = false;
          }
          createCb([
            attendedActivity
          ]);
        }
      },
      error: function(err) {
        // error(err);
      }
    })

  }
  subscribeToInvites(success: any, error: any, createCb: any, deleteCb: any) {
    var query = new Parse.Query(this.InviteClass);
    query.equalTo('inviteePtr', this.Parse.User.current());
    this.inviteSubscription = query.subscribe();
    this.inviteSubscription.on('create', (invite) => {
      console.log('add to invites');
      console.log(invite);
      createCb(invite.toJSON());
    })
    this.inviteSubscription.on('delete', (invite) => {
      deleteCb(invite.toJSON()['objectId']);
    })
    this.inviteSubscription.on('error', (err) => {
      error(err);
    })
    query.find({
      success: (invites) => {
        console.log('add to invites');
        for (var i = 0; i < invites.length; i++) {
          createCb(invites[i].toJSON());
        }
      },
      error: (err) => {
        error(err);
      }
    })
    success();
  }


  /***
   * ACTIVITIES
   ***/

  createActivity(data: any, error: (res) => void, success: (res) => void) {
    var activity = new this.ActivityClass();
    var locationObj = new this.LocationClass();
    _.forEach(data, (value, key) => {
      if (key == 'startLocation' || key == 'endLocation') {
        // activity.set(key, new this.Parse.GeoPoint(value));
        return;
      } else if (key == 'startDate' || key == 'endDate') {
        activity.set(key, new Date(value));
      } else {
        activity.set(key, value);
      }
    })

    Parse.Cloud.run('checkLocationExists', {
      'latitude': data.startLocation.latitude,
      'longitude': data.startLocation.longitude,
    }).then(
    (res) => {
      locationObj.set('coordinates', new this.Parse.GeoPoint(data.startLocation));
      if (!res.exists) {
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
    }, (err) => {})

  }
  saveActivity(locationObj, activityObj, error: (res) => void, success: (res) => void) {
    var user = this.Parse.User.current();
    activityObj.set('author', user);
    activityObj.set('startLocation', locationObj);
    activityObj.save(null, {
      success: (res) => {
        console.log('activity saved to parse server');
        var userRelation = user.relation('activities');
        var activity = activityObj.toJSON();
        userRelation.add(activityObj);
        user.save(null, {
          success: (res) => {
            console.log('user-activity relation saved');
            console.log(res);
            success({
              message: activity['objectId'],
              item: activity,
            });
          },
          error: (err) => {
            console.log('parse saving error');
            console.log(err);
            error(res);
          }
        });
        // success(res)
      },
      error: (err) => {
        console.log('parse saving error');
        console.log(err);
        error(err);
      }
    });
  }

  inviteToActivity(activityId, userArray, success: (res) => void, error: (res) => void) {
    console.log('inviting');
    var user = this.Parse.User.current();
    var activityQuery = new this.Parse.Query(this.ActivityClass);
    activityQuery.get(activityId, {
      success: (activityObj) => {
        for (var i = 0; i < userArray.length; i++) {
          var invite = new this.InviteClass();
          var inviteeId = userArray[i];
          var userQuery = new this.Parse.Query(this.Parse.User);
          userQuery.get(inviteeId, {
            success: (inviteeObj) => {
              var inviteQuery = new this.Parse.Query(this.InviteClass);
              inviteQuery.equalTo('activityPtr', activityObj)
              inviteQuery.equalTo('inviteePtr', inviteeObj)
              inviteQuery.find({
                success: (invitedUsers) => {
                  if (!invitedUsers.length) {
                    invite.set('activityPtr', activityObj);
                    invite.set('invitorPtr', user);
                    invite.set('inviteePtr', inviteeObj);
                    invite.save(null, {
                      success: (inviteRes) => {
                        console.log('successful invite');
                        console.log(inviteRes);
                        success(inviteRes.toJSON());
                      },
                      error: (err, result) => {
                        error(err);
                      }
                    })

                  }
                },
                error: (err, result) => {
                  error(err);
                }
              })
            },
            error: (err, result) => {
              error(err);
            }
          })
        }
      },
      error: (err, result) => {
        error(err);
      }
    })
  }

  joinActivity(activityId: any, error: (res) => void, success: (res) => void) {
    console.log('Joining');
    console.log(activityId);
    var activityQuery = new this.Parse.Query(this.ActivityClass);
    activityQuery.get(activityId, {
      success: (res) => {
        var attend = new this.AttendanceClass();
        attend.set('userReference', this.Parse.User.current());
        attend.set('activityReference', res);
        var activityObj = res;
        attend.save(null, {
          success: (res) => {
            console.log('joined Event')
            var inviteQuery = new this.Parse.Query(this.InviteClass);
            inviteQuery.equalTo("activityPtr", activityObj)
            inviteQuery.equalTo("inviteePtr", this.Parse.User.current())
            inviteQuery.find({
              success: (invitesObj) => {
                for (var i = 0; i < invitesObj.length; i++) {
                  console.log('found invite');
                  invitesObj[i].destroy({
                    success: function(res) {
                      // The object was deleted from the Parse Cloud.
                      console.log('invite deleted')
                    },
                    error: function(res, error) {
                      // The delete failed.
                      // error is a Parse.Error with an error code and message.
                    }
                  });
                }
              },
              error: (err) => {
                error(err);
              }
            })
            success(activityObj.toJSON());
          },
          error: (err) => {
            console.log('ERROR: joining Event')
            console.log(err);
            error(err);
          }
        })
      },
      error: (err) => {
        console.log('ERROR: joining Event');
        console.log(err);
        error(err);
      }
    })
  }
  /*
   * Activity Fetching
   */
  getActivity(objectId: String, error: (res) => void, success: (res) => void) {}

  getActivitiesByLocation(distance: number, latitude: number, longitude: number, error: (res) => void, success: (res) => void) {
    var point = new this.Parse.GeoPoint({
      'latitude': latitude,
      'longitude': longitude,
    });

    var locationQuery = new this.Parse.Query(this.LocationClass);
    locationQuery.withinKilometers('coordinates', point, distance);
    locationQuery.find({
      success: (res) => {
        console.log(res);
        for (var i = 0; i < res.length; i++) {
          var activityQuery = new this.Parse.Query(this.ActivityClass);
          activityQuery.equalTo('startLocation', res[i]);
          var d = new Date();
          activityQuery.include('author');
          activityQuery.greaterThanOrEqualTo(
            'startDate', {
              "__type": "Date",
              "iso": d.toISOString()
            }
          );
          activityQuery.find({
            success: (res) => {
              console.log(res);
              for (var i = 0; i < res.length; i++) {
                success([
                  res[i].toJSON()
                ]);
              }
            },
            error: (err) => {
              console.log('parse saving error');
              error(err);
            }
          });
        }
        success([]);
      },
      error: (err) => {
        console.log('parse saving error');
        error(err);
      }
    })
  }
  getActivitiesByTime(error: (res) => void, success: (res) => void) {}
  getUserActivities(error: (res) => void, success: (res) => void) {
    var userQuery = this.Parse.User.current().relation('activities');

    userQuery.find({
      success: (res) => {
        success(res);
      },
      error: (err) => {
        console.log('parse saving error');
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


  /***
   * USER FUNCTIONS
   ***/
  getCurrentUser() {
      return this.Parse.User.current();
  }

  fetchUsersByName(queryString, success: (res) => void, error: (res) => void) {
    var user = this.Parse.User.current();
    var userQuery = new this.Parse.Query(this.Parse.User)
    userQuery.contains('fullname', queryString.toLowerCase());
    userQuery.notEqualTo('objectId', user['id']);
    userQuery.find({
      success: (res) => {
        console.log('FOUND USERS')
        for (var i = 0; i < res.length; i++) {
          // if(resObj.toJSON['objectId'] !== user['id']){
          var resObj = res[i].toJSON();
          success(resObj);
          // }
        }
      },
      error: (res) => {
        console.log('ERROR FINDING USERS');
        error(res);
      }
    })
  }
  fetchByAttendance(activityId, success: (res) => void, error: (res) => void) {
    var user = this.Parse.User.current();
    var attendanceQuery = new this.Parse.Query(this.AttendanceClass)
    attendanceQuery.equalTo('activityReference', {
      __type: "Pointer",
      className: "Activity",
      objectId: activityId
    });
    attendanceQuery.notEqualTo('userReference', user);
    attendanceQuery.include('userReference');
    attendanceQuery.find({
      success: (res) => {
        for (var i = 0; i < res.length; i++) {
          var resObj = res[i].get('userReference').toJSON();
          resObj.attendance = [
            activityId
          ]
          success(resObj);
        }
      },
      error: (res) => {
        console.log('ERROR FINDING USERS');
        error(res);
      }
    })
  }


  /**
   * Rating Functions
   */
  rateUser(userId: string, activityId: string, rating: number, success: (res) => void, error: (err) => void) {
    var user = this.Parse.User.current();
    var attendanceQuery = new this.Parse.Query(this.AttendanceClass);
    var userAttendedPtr;
    var userRatingObj;
    attendanceQuery.equalTo('activityReference', {
      __type: "Pointer",
      className: "Activity",
      objectId: activityId
    });
    attendanceQuery.equalTo('userReference', {
      __type: "Pointer",
      className: "_User",
      objectId: userId
    });
    attendanceQuery.find().then((attendedResult) => {
      console.log(attendedResult.length);
      if (attendedResult.length) {
        userAttendedPtr = attendedResult[0];
        var ratingQuery = new this.Parse.Query(this.UserRatingClass);
        ratingQuery.equalTo("userPtr", {
          __type: "Pointer",
          className: "_User",
          objectId: userId
        })
        ratingQuery.equalTo("attendancePtr", userAttendedPtr)
        ratingQuery.equalTo("raterPtr", user)
        return ratingQuery.find()
      }
    }).then((ratings) => {
      if (!ratings.length) {
        console.log('No User rating exists');
        var ratingToCreate = new this.UserRatingClass();
        ratingToCreate.set("userPtr", {
          __type: "Pointer",
          className: "_User",
          objectId: userId
        })
        ratingToCreate.set("attendancePtr", userAttendedPtr)
        ratingToCreate.set("raterPtr", user)
        ratingToCreate.set('rating', rating);
        return ratingToCreate.save()
      } else {
        throw new Error('User Rating exists');
      }
    }).then((ratingObj) => {
      console.log('Successfully saved usrRating');
      if (!!ratingObj) {
        userRatingObj = ratingObj;
        var userAttendanceQuery = new this.Parse.Query(this.Parse.Attendance);
        userAttendanceQuery.equalTo('activityReference', activityId);
        userAttendanceQuery.equalTo('userReference', user);
        return userAttendanceQuery.find()
      } else {
        throw new Error("Couldn't Save Object");
      }
    }).then((userAttendance) => {
      if (userAttendance.length) {
        userAttendance[0].set('ratingPtr', userRatingObj);
        return userAttendance[0].save()
      }
    }).then((res) => {
      console.log('Successfully saved rating ptr in attendance')
      success(res)
    })
  }

  rateActivity(activityId: string, rating: number, success: (res) => void, error: (err) => void) {
    var user = this.Parse.User.current();
    var activityAttendedPtr;
    var activityRatingObj;
    var ratingQuery = new this.Parse.Query(this.ActivityRatingClass);
    ratingQuery.equalTo("activityPtr", {
      __type: "Pointer",
      className: "Activity",
      objectId: activityId
    })
    ratingQuery.equalTo("userPtr", user)
    ratingQuery.find().then((ratingPtr) => {
      if (!ratingPtr.length) {
        var ratingToCreate = new this.ActivityRatingClass();
        ratingToCreate.set('activityPtr', {
          __type: "Pointer",
          className: "Activity",
          objectId: activityId
        });
        ratingToCreate.set("userPtr", user)
        ratingToCreate.set('rating', rating);
        return ratingToCreate.save();
      }
    }).then((ratingObj) => {
      console.log('Successfully saved usrRating');
      if (!!ratingObj) {
        activityRatingObj = ratingObj;
        var attendanceQuery = new this.Parse.Query(this.AttendanceClass);
        attendanceQuery.equalTo('activityReference', {
          __type: "Pointer",
          className: "Activity",
          objectId: activityId
        });
        attendanceQuery.equalTo('userReference', user);
        return attendanceQuery.find()
      } else {
        throw new Error("Couldn't Save Object");
      }
    }).then((attendance) => {
      if (attendance.length) {
        attendance[0].set('ratingPtr', activityRatingObj);
        return attendance[0].save()
      }
    }).then((res) => {
      console.log('Successfully saved rating ptr in attendance')
      success(res)
    })
  }




  /**
   * Friend Functions
   */
  addFriends(userArray, success: (res) => void, error: (res) => void) {
      // for (var i = 0; i < userArray.length; i++) {}
  }
  fetchFriends(success: (res) => void, error: (res) => void) {
      var user = this.Parse.current();
  }

  /*
   *  Registration Function
   */
  signUp(data, success: () => void, error: (res) => void) {
    console.log('signUp');
    console.log(data);
    _.forEach(data, (value, key) => {
      if (key == 'dateOfBirth') {
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
    if (!this.Parse.User.current()) return false;
    if (!this.Parse.User.current().get('profilePicture')) return false;
    if (!this.Parse.User.current().get('firstName')) return false;
    if (!this.Parse.User.current().get('lastName')) return false;
    if (!this.Parse.User.current().get('gender')) return false;
    // if(!this.Parse.User.current().get('address')) return false;
    if (!this.Parse.User.current().get('dateOfBirth')) return false;
    if (!this.Parse.User.current().get('mobileNumber')) return false;
    if (!this.Parse.User.current().get('email')) return false;
    // if(!this.Parse.User.current().get('fbId')) isValid = false;
    return true;
  }
      /*
       *  LOGIN
       */
  deviceLogin(authData, success: any, error: any) {
    if (!this.Parse.User.current()) {
      var user = new this.Parse.User();
    } else {
      var user = this.Parse.User.current();
    }
    this.Parse.FacebookUtils.logIn(authData, {
      success: (response) => {
        console.log('success');
        console.log(response);
        success(response);
      },
      error: (response) => {
        console.log('error');
        console.log(response);
        error(response);
      }
    });
  }
  facebookLogin(perms, success: any, error: any) {
    this.Parse.FacebookUtils.logIn(perms, {
      success: (response) => {
        console.log('success');
        console.log(response);
        success(response);
      },
      error: (response) => {
        console.log('error');
        console.log(response);
        error(response);
      }
    });
  }
      //LOGOUT
  logOut(success: any, error: any) {
    if (!!this.Parse.User.current()) {
      this.Parse.User.logOut();
      success();
    } else {
      error("User not logged in");
    }
  }

  /**
   * UTILITY
   */
  fbInit() {
    this.Parse.FacebookUtils.init({

      /*
         The app id of the web app;
         To register a new app visit Facebook App Dashboard
         ( https://developers.facebook.com/apps/ )
       */
      appId: '1824765444411364', //'289482390688',

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

      version: 'v2.6',
    });
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
