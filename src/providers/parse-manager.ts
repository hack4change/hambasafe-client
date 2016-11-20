import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import {Parse} from 'parse';

/*
  Generated class for the ParseManager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParseManager {
  public Parse = Parse;
  // private isFBSdk = false;

  private ActivityClass: any;
  private AttendanceClass: any;
  private LocationClass: any;
  private InviteClass: any;
  private FriendClass: any;
  private UserRatingClass: any;
  private ActivityRatingClass: any;
  // private attendingSubscription;
  // private friendSubscription;
  // private inviteSubscription;
  // private userSubscription;

  constructor(public http: Http) {
    console.log('Hello ParseManager Provider');
    this.Parse.initialize('test1234');
    this.Parse.serverURL = 'https://mainstream.ninja/parse'

    this.ActivityClass = this.Parse.Object.extend("Activity");
    this.AttendanceClass = this.Parse.Object.extend("Attendance");
    this.LocationClass = this.Parse.Object.extend("Location");
    this.InviteClass = this.Parse.Object.extend("Invite");
    this.FriendClass = this.Parse.Object.extend("Friend");
    this.UserRatingClass = this.Parse.Object.extend("UserRating");
    this.ActivityRatingClass = this.Parse.Object.extend("ActivityRating");

    this.Parse.Object.registerSubclass('Activity', this.ActivityClass);
    this.Parse.Object.registerSubclass('Attendance', this.AttendanceClass);
    this.Parse.Object.registerSubclass('Location', this.LocationClass);
    this.Parse.Object.registerSubclass('InviteClass', this.InviteClass);
    this.Parse.Object.registerSubclass('FriendClass', this.FriendClass);
    this.Parse.Object.registerSubclass('UserRatingClass', this.UserRatingClass);
    this.Parse.Object.registerSubclass('ActivityRatingClass', this.ActivityRatingClass);
  }

  /**
   *  SUBSCRIPTIONS
   *
   */

  subscribeToAttending() {
    var query = new Parse.Query(this.AttendanceClass);
    query.equalTo('userReference', this.Parse.User.current());
    query.include('activityReference');
    query.include('activityReference.startLocation');
    query.include('activityReference.author');
    query.include('ratingPtr');
    return query.subscribe();
  }

  fetchAttending() : Promise<any> {
    var query = new Parse.Query(this.AttendanceClass);
    query.equalTo('userReference', this.Parse.User.current());
    query.include('activityReference');
    query.include('activityReference.startLocation');
    query.include('activityReference.author');
    query.include('ratingPtr');
    return query.find()
    .then((activitiesAttending) => {
      var jsRes = [];
      for (var i = 0; i < activitiesAttending.length; i++) {
        var attendedActivity = activitiesAttending[i].get('activityReference').toJSON();
        attendedActivity.isAttending = true;
        console.log(activitiesAttending[i].get('ratingPtr'));
        console.log(activitiesAttending[i].toJSON());
        if(!activitiesAttending[i].get('ratingPtr')) {
          attendedActivity.mustRate = true;
        } else {
          attendedActivity.mustRate = false;
        }
        jsRes[i] = attendedActivity;
      }
      console.log('RESOLVING ATTENDED');
      console.log(jsRes);
      return Promise.resolve(jsRes);
    })
  }

  subscribeToInvites() {
    var query = new Parse.Query(this.InviteClass);
    query.equalTo('inviteePtr', this.Parse.User.current());
    query.include('inviteePtr');
    query.include('invitorPtr');
    query.include('activityPtr');
    query.include('activityPtr.author');
    query.include('activityPtr.startLocation');
    return query.subscribe();
  }

  fetchInvites() : Promise<any> {
    var query = new Parse.Query(this.InviteClass);
    query.equalTo('inviteePtr', this.Parse.User.current());
    query.include('inviteePtr');
    query.include('invitorPtr');
    query.include('activityPtr');
    query.include('activityPtr.author');
    query.include('activityPtr.startLocation');
    return query.find()
    .then((res) => {
      console.log('add to invites');
      var jsRes = [];
      for (var i = 0; i < res.length; i++) {
        jsRes[i] = res[i].toJSON();
      }
      return Promise.resolve(jsRes);
    })
  }

  subscribeToCurrentUser() {
    var query = new Parse.Query(this.Parse.User);
    console.log('SUBSCRIBING TO USER CHANGES - ' + this.Parse.User.current()['id'])
    query.equalTo('objectId', this.Parse.User.current()['id']);
    query.find().then((res) => {
      console.log('CURRENT USER');
      console.log(res);
    })
    return query.subscribe();
  }

  subscribeToFriends() {
    var query = new Parse.Query(this.FriendClass);
    var query2 = new Parse.Query(this.FriendClass);

    query.equalTo('userPtr', this.Parse.User.current());
    query.equalTo('confirmed', true);

    query.include('friendPtr');
    query.include('userPtr');

    query2.equalTo('friendPtr', this.Parse.User.current());
    query2.include('userPtr');
    query2.include('friendPtr');

    var friendQuery = this.Parse.Query.or(query, query2);
    return friendQuery.subscribe();
  }

  fetchFriends() : Promise<any> {
    var query = new Parse.Query(this.FriendClass);
    var query2 = new Parse.Query(this.FriendClass);

    query.equalTo('userPtr', this.Parse.User.current());
    query.equalTo('confirmed', true);

    query.include('friendPtr');
    query.include('userPtr');

    query2.equalTo('friendPtr', this.Parse.User.current());
    query2.include('userPtr');
    query2.include('friendPtr');

    var friendQuery = this.Parse.Query.or(query, query2);
    return friendQuery.find()
    .then((friends) => {
      console.log('add to friends');
      let promises = [];
      _.each(friends, (friend) => {
        var friendId: string = "";
        var isConfirmed : boolean = true;
        var getUser = new this.Parse.Query(this.Parse.User)
        if(friend.get('userPtr')['id'] !== this.Parse.User.current()['id']){
          friendId = friend.get('userPtr')['id'];
          isConfirmed = friend.get('confirmed');
        } else {
          friendId = friend.get('friendPtr')['id'];
        }
        promises.push(getUser.get(friendId)
        .then((res) => {
          var friendRes = res.toJSON();
          friendRes.isFriend= true;
          friendRes.isConfirmed = isConfirmed;
          return Promise.resolve(friendRes);
        }))
      })
      return Promise.all(promises);
    })
  }

  /**
   *  FRIENDS
   */
  confirmFriend(friendId) {
    var query = new Parse.Query(this.FriendClass);
    var query2 = new Parse.Query(this.FriendClass);

    query.equalTo('userPtr', this.Parse.User.current());
    query.equalTo('friendPtr', {
      __type: "Pointer",
      className: "_User",
      objectId: friendId
    });

    query2.equalTo('friendPtr', this.Parse.User.current());
    query.equalTo('userPtr', {
      __type: "Pointer",
      className: "_User",
      objectId: friendId
    });
    var friendQuery = this.Parse.Query.or(query, query2);
    return friendQuery.find()
    .then((friends) => {
      console.log('found invites');
      console.log();
      var promise = Parse.Promise.as();
      _.each(friends, function(friend) {
        // For each item, extend the promise with a function to delete it.
        promise = promise.then(function() {
          // Return a promise that will be resolved when the delete is finished.
          friend.set('confirmed', true);
          return friend.save();
        });
      });
      return promise;
    });
  }

  deleteFriend(friendId) : Promise<any> {
    var query = new Parse.Query(this.FriendClass);
    var query2 = new Parse.Query(this.FriendClass);

    query.equalTo('userPtr', this.Parse.User.current());
    query.equalTo('friendPtr', {
      __type: "Pointer",
      className: "_User",
      objectId: friendId
    });

    query2.equalTo('friendPtr', this.Parse.User.current());
    query2.equalTo('userPtr', {
      __type: "Pointer",
      className: "_User",
      objectId: friendId
    });

    var friendQuery = this.Parse.Query.or(query, query2);
    return friendQuery.find()
    .then((friends) => {
      console.log('found invites');
      console.log();
      var promise = Parse.Promise.as();
      _.each(friends, function(friend) {
        // For each item, extend the promise with a function to delete it.
        promise = promise.then(function() {
          // Return a promise that will be resolved when the delete is finished.
          return friend.destroy();
        });
      });
      return promise;
    })
  }

  /**
   * INVITES
   **/
  deleteInvite(activityId: string) : Promise<any> {
    var query = new Parse.Query(this.InviteClass);
    query.equalTo('inviteePtr', this.Parse.User.current());
    query.equalTo('activityPtr', {
      __type: "Pointer",
      className: "Activity",
      objectId: activityId
    });
    return query.find()
    .then((invites) => {
      console.log('found invites');
      console.log();
      var promise = Parse.Promise.as();
      _.each(invites, function(invite) {
        // For each item, extend the promise with a function to delete it.
        promise = promise.then(function() {
          // Return a promise that will be resolved when the delete is finished.
          return invite.destroy();
        });
      });
      return promise;
    })
  }

  /***
   * ACTIVITIES
   ***/

  createActivity(data: any) {
    let activity = new this.ActivityClass();
    let locationObj = new this.LocationClass();
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

   return  Parse.Cloud.run('checkLocationExists', {
      'latitude': data.startLocation.latitude,
      'longitude': data.startLocation.longitude,
    })
    .then((res) => {
      locationObj.set('coordinates', new this.Parse.GeoPoint(data.startLocation));
      if (!res.exists) {
        return locationObj.save(null).then((res) => {
          activity.set('startLocation', res);
          return this.saveActivity(activity);
        });
      } else {
        activity.set('startLocation', res.obj);
        return this.saveActivity(activity);
      }
    })
  }

  updateActivity(activityId: string, data: any) : Promise<any> {
    let activityObj;
    let locationObj = new this.LocationClass();
    
    var activityQuery = new this.Parse.Query(this.ActivityClass);
    return activityQuery.get(activityId)
    .then((activity) => {
      if(!!activity) {
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
        activityObj = activity;
        return Parse.Cloud.run('checkLocationExists', {
          'latitude': data.startLocation.latitude,
          'longitude': data.startLocation.longitude,
        })
      } else {
        return new this.Parse.Promise.error('failed to find activity');
      } 
    })
    .then((res) => {
      console.log(res);
      locationObj.set('coordinates', new this.Parse.GeoPoint(data.startLocation));
      if (!res.exists) {
        return locationObj.save(null).then((res)=>{
          activityObj.set('startLocation', res);
          return this.saveActivity(activityObj);
        })
      } else {
        activityObj.set('startLocation', res.obj);
        return this.saveActivity(activityObj);
      }
    })
  }

  saveActivity(activityObj) {
    let user = this.Parse.User.current();
    activityObj.set('author', user);
    return activityObj.save(null)
    .then((res) => {
      console.log('activity saved to parse server');
      // this.joinActivity(res.get('objectId'), error, success);
      var userRelation = user.relation('activities');
      let activity = activityObj.toJSON();
      userRelation.add(activityObj);
      return user.save(null).then((res)=>{
        return Promise.resolve(activity);
      });
    })
    .then((res) => {
      console.log('user-activity relation saved');
      console.log(res);
      return Promise.resolve({
        message: res['objectId'],
        item: res,
      });
    })
  }

  inviteToActivity(activityId, userArray) : Promise<any> {
    console.log('inviting');
    let user = this.Parse.User.current();
    let inviteeObj;
    // let activityObj;
    var activityQuery = new this.Parse.Query(this.ActivityClass);
    return activityQuery.get(activityId)
    .then((activityObj) => {
      var promises = [];
      for (var i = 0; i < userArray.length; i++) {
        var invite = new this.InviteClass();
        var inviteeId = userArray[i];
        var userQuery = new this.Parse.Query(this.Parse.User);
        promises[i] = userQuery.get(inviteeId)
        .then((res) => {
          inviteeObj = res;
          var inviteQuery = new this.Parse.Query(this.InviteClass);
          inviteQuery.equalTo('activityPtr', activityObj)
          inviteQuery.equalTo('inviteePtr', res);
          return inviteQuery.find()
        })
        .then((invitedUsers) => {
          invite.set('activityPtr', activityObj);
          invite.set('invitorPtr', user);
          invite.set('inviteePtr', inviteeObj);
          return invite.save(null)
        })
        .then((inviteRes) => {
          return Promise.resolve(inviteRes.toJSON());
        });
      }
      return Promise.all(promises);
    })
  }

  joinActivity(activityId: String) : Promise<any> {
    console.log('Joining');
    console.log(activityId);
    let activityObj;
    let activityQuery = new this.Parse.Query(this.ActivityClass);
    return activityQuery.get(activityId)
    .then((res) => {
      var attend = new this.AttendanceClass();
      attend.set('userReference', this.Parse.User.current());
      attend.set('activityReference', res);
      activityObj = res;
      return attend.save(null)
    })
    .then((res) => {
      console.log('joined Event')
      var inviteQuery = new this.Parse.Query(this.InviteClass);
      inviteQuery.equalTo("activityPtr", activityObj)
      inviteQuery.equalTo("inviteePtr", this.Parse.User.current())
      return inviteQuery.find()
    })
    .then((invitesObj) => {
      for (var i = 0; i < invitesObj.length; i++) {
        console.log('found invite');
        invitesObj[i].destroy();
      }
      return Promise.resolve(activityObj.toJSON());
    })
  }

  /*
   * Activity Fetching
   */
  getActivity(activityId: String) : Promise<any> {
    var activityQuery = new this.Parse.Query(this.ActivityClass);
    activityQuery.include('author');
    activityQuery.include('startLocation');
    return activityQuery.get(activityId)
    .then((res) => {
      console.log(res);
      var jsRes = [];
      for (var i = 0; i < res.length; i++) {
          jsRes[i] = res[i].toJSON()
      }
      return Promise.resolve(jsRes);
    });
  }

  getActivitiesByQuery(query: string, latitude: number, longitude: number) : Promise<any> {
    console.log('QUERY');
    console.log(query);
    var activityQuery = new this.Parse.Query(this.ActivityClass);
    var point = new this.Parse.GeoPoint({
      'latitude': latitude,
      'longitude': longitude,
    });
    var d = new Date();
    activityQuery.contains('eventType', query);
    activityQuery.withinKilometers('coordinates', point, '35');
    activityQuery.greaterThanOrEqualTo(
      'startDate', {
        "__type": "Date",
        "iso": d.toISOString()
      }
    );
    activityQuery.include('author');
    activityQuery.include('startLocation');
    return activityQuery.find()
    .then((res) => {
      console.log()
      // console.log(res);
      var jsRes = [];
      for(var i = 0; i < res.length; i++) {
        jsRes.push(res[i].toJSON());
      }
      return Promise.resolve(jsRes);
    });
  }

  getActivitiesByLocation(distance: number, latitude: number, longitude: number) : Promise<Array<any>> { 
    var point = new this.Parse.GeoPoint({
      'latitude': latitude,
      'longitude': longitude,
    });

    console.log('FETCHING BY LOCATION');
    var locationQuery = new this.Parse.Query(this.LocationClass);
    locationQuery.withinKilometers('coordinates', point, distance);
    return locationQuery.find()
    .then((res) => {
      var activityArray = [];
      var d = new Date();
      for (var i = 0; i < res.length; i++) {
        var activityQuery = new this.Parse.Query(this.ActivityClass);
        activityQuery.equalTo('startLocation', res[i]);
        activityQuery.include('author');
        activityQuery.include('startLocation');
        activityQuery.greaterThanOrEqualTo('startDate', {
          "__type": "Date",
          "iso": d.toISOString()
        });
        activityArray[i] = activityQuery.find();
      }
      return Promise.all(activityArray);
    })
    .then((res) => {
      console.log()
      console.log(res);
      var jsRes = [];
      for(var i = 0; i < res.length; i++) {
        for(var j = 0; j < res[i].length; j++) {
          jsRes.push(res[i][j].toJSON());
        }
      }
      return Promise.resolve(jsRes);
    })
  }

  // getActivitiesByTime(error: (res) => void, success: (res) => void) {}

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

  fetchUsersByName(queryString) : Promise<any> {
    var user = this.Parse.User.current();
    var userQuery = new this.Parse.Query(this.Parse.User)
    userQuery.contains('fullname', queryString.toLowerCase());
    userQuery.notEqualTo('objectId', user['id']);
    return userQuery.find()
    .then((res) => {
      console.log('FOUND USERS')
      var jsRes = [];
      for (var i = 0; i < res.length; i++) {
        // if(resObj.toJSON['objectId'] !== user['id']){
        jsRes[i] = res[i].toJSON();
        // }
      }
      return Promise.resolve(jsRes);
    })
  }

  fetchByAttendance(activityId) : Promise<any> {
    var user = this.Parse.User.current();
    var attendanceQuery = new this.Parse.Query(this.AttendanceClass)
    attendanceQuery.equalTo('activityReference', {
      __type: "Pointer",
      className: "Activity",
      objectId: activityId
    });
    attendanceQuery.notEqualTo('userReference', user);
    attendanceQuery.include('userReference');
    return attendanceQuery.find()
    .then((res) => {
      var jsRes = [];
      for (var i = 0; i < res.length; i++) {
        var resObj = res[i].get('userReference').toJSON();
        resObj.attendance = [activityId];
        jsRes[i] = resObj;
      }
      return Promise.resolve(jsRes);
    })
  }


  /**
   * Rating Functions
   */
  rateUser(userId: string, activityId: string, rating: number) : Promise<any>{
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
    return attendanceQuery.find().then((attendedResult) => {
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
    })
  }

  rateActivity(activityId: string, rating: number) {
    var user = this.Parse.User.current();
    var activityRatingObj;
    var ratingQuery = new this.Parse.Query(this.ActivityRatingClass);
    ratingQuery.equalTo("activityPtr", {
      __type: "Pointer",
      className: "Activity",
      objectId: activityId
    })
    ratingQuery.equalTo("userPtr", user)
    return ratingQuery.find().then((ratingPtr) => {
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
    })
  }




  /**
   * Friend Functions
   */
  addFriends(userArray) : Promise<any> {
    var currUser = this.Parse.User.current();
    var promises = [];
    _.each(userArray, (userId) => {
      if(userId === currUser['id']){
        return;
      }
      var userQuery = new this.Parse.Query(this.Parse.User);
      
      promises.push(userQuery.get(userId)
      .then((res) => {
        if(!!res) {
          var friendObj = new this.FriendClass();
          friendObj.set('userPtr', currUser);
          friendObj.set('friendPtr', {
            __type: "Pointer",
            className: "_User",
            objectId: userId
          })
          return friendObj.save()
        }
      }))
    })
    return Promise.all(promises);
  }

  /**
   * Registration Function
   */
  signUp(data) {
    console.log('signUp');
    console.log(data);
    _.forEach(data, (value, key) => {
      if (key == 'dateOfBirth') {
        this.Parse.User.current().set(key, new Date(value));
      } else {
        this.Parse.User.current().set(key, value);
      }
    })
    return this.Parse.User.current().save(null)
    .then((res) => {
      return Promise.resolve(res);
    });
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
  deviceLogin(authData) {
    // if (!this.Parse.User.current()) {
    //   var user = new this.Parse.User();
    // } else {
    //   var user = this.Parse.User.current();
    // }
    console.log('DEVICE LOGIN');
    console.log(authData);
    return this.Parse.FacebookUtils.logIn(authData, {});
  }

  facebookLogin(perms) {
    return this.Parse.FacebookUtils.logIn(perms, {})
// , {
//       success: (response) => {
//         console.log('success');
//         console.log(response);
//         success(response);
//       },
//       error: (response) => {
//         console.log('error');
//         console.log(response);
//         error(response);
//       }
//     });

  }
      //LOGOUT
  logOut() {
    if (!!this.Parse.User.current()) {
      return this.Parse.User.logOut();
    } else {
      throw new Error("User not logged in");
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
