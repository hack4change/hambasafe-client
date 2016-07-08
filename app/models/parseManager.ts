
declare var Parse: any;

var Parse = require('parse').Parse;
Parse.initialize('test1234');
Parse.serverURL = 'https://163.172.144.224/parse'

export class ParseManager {
    ActivityClass: any;
    UserClass: any;
    Parse: any;
    constructor() {
      console.log('CONSTRUCTOR')
      this.Parse = Parse;
      this.ActivityClass = this.Parse.Object.extend("Activity");
      this.Parse.Object.registerSubclass('Activity', this.ActivityClass);
    }
    
    createActivity(name: String, success:(res)=>void)
    {
        var activity = new this.ActivityClass();

        activity.set("name", name);
        activity.set("country", 'China');

        activity.save(null,{
          success:function(res) { 
            console.log(res);
            success(res);
          },
          error:function(error) {
            console.log('parse saving error');
          }
        });
    }
		getActivities() {
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
      FB.init({

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
    facebookLogin(perms, opts){
      this.Parse.FacebookUtils.logIn(perms, opts);
    }
    // logInFacebook(success: (user: Parse.User) => void, error: (user: Parse.User, error: any) => void)
    // {
    //     // this.Parse.FacebookUtils.logIn(null, {
    //     //     success: (user: Parse.User) => {
    //     //         success(user);
    //     //     },
    //     //     error: (user: Parse.User, error: any) => {
    //     //         error(user, error);
    //     //     }
    //     // });
    // }
    
}
