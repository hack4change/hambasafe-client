#Hambasafe... The Client

## Better together.
Hambasafe is a community created app, with a vision of bringing communities together and helping people keep people safe.

Breaking it down into a few components:

1.  Create an event
2.  Join an event
3.  Rate an event, and the attendees

The aim is to build up a network of trust, and enjoyment. Enabling people to be active and meet people with similar passions, in safety.

Using a to-be-defined algorithms, we can assign the likelihood of legitimacy of your portfolio/person as being a real human, and building it up over time via community feedback.

## Installation

Running the following commands in order, you should be able to view the current state of the app in your browser.

```
git clone https://github.com/hack4change/hambasafe-client
sudo npm install -g cordova ionic@beta
npm install
ionic serve -l
```

In time, it will be available on the App & Play Stores

## News to use or lose as you choose:
* The app logic is contained in `./app`
* Parse is used as a server backend, with LiveQueries enabled on the Invite and Attendance Classes.
* The temporary hosting is at mainstream.ninja, during development.
* The parse api endpoints are at https://mainstream.ninja/parse
* Redux is used for the persistance of state between views. As well as enabling limited offline capabilities.


## The State of the App Address.
### One can (In no particular order)...
* Open the app.
* View The splash page.
* Navigate to login.
* Login via facebook credentials.
* Register.
* View Home Page.
* View Search Page.
  + Search All events in 150Km;
  + Search for events using the coordinates of a google maps marker and the distance from said marker.
* View Profile Page.
* View Emergency Page.
* View About Page.
* View Terms Page.
* View Create Page.
* Create Events.
* Join Events.
* Invite Users(based on their name).
* Accept Invites.
* Edit Your profile.
* Rate an event & the attendees


## External API's used
* Google Maps. *Looking to remove/reduce*
* [UploadCare](https://www.uploadcare.com)
  + Great widget and cdn for handling uploads and distribution of profile pictures.
* [What3Words](https://www.what3words.com)
  + A wonderbar idea to break down the world into ~57 trillion 3x3 meter blocks. This grants us the ability to reduce server google maps calls for a place data(reverse geocoding) and an easy referencing of events in a location.
  - Really hoping to incorporate this more, unfortunately there's not much of a use case as it stands for forward geocoding.
