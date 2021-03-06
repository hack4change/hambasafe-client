import { 
  NgModule,
  enableProdMode
} from '@angular/core';
import { 
  CommonModule
} from '@angular/common';
import { 
  FormsModule
} from '@angular/forms';
import {
  NgReduxModule,
  NgRedux,
  DevToolsExtension
} from 'ng2-redux';
import { 
  IonicApp,
  IonicModule,
  Platform,
} from 'ionic-angular';
// import { QRCodeModule } from 'angular2-qrcode';
import {
  MyApp 
} from './app.component';

import { applyMiddleware } from 'redux';
const createLogger = require('redux-logger');
import thunk from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

/**
 * Providers
 */
import { ParseManager } from '../providers/parse-manager';

/*
 * Actions
 */
import { AuthActions }      from '../actions/auth.actions';
import { EventDataActions } from '../actions/event-data.actions';
import { InviteActions }    from '../actions/invite.actions';
import { UserActions }      from '../actions/user.actions';

/*
 * Pages
 */

import { AboutPage          } from '../pages/about/about';
import { ActivePage         } from '../pages/active/active';
import { ActivityDetailPage } from '../pages/activity-detail/activity-detail';
import { ActivityInvitePage } from '../pages/activity-invite/activity-invite';
import { ActivityListPage   } from '../pages/activity-list/activity-list';
import { AddFriendPage      } from '../pages/add-friend/add-friend';
import { ContactPage        } from '../pages/contact/contact';
import { CreatePage         } from '../pages/create/create';
import { EmergencyPage      } from '../pages/emergency/emergency';
import { FriendsPage        } from '../pages/friends/friends';
import { HomePage           } from '../pages/home/home';
import { InvitesPage        } from '../pages/invites/invites';
import { LandingPage        } from '../pages/landing/landing';
import { LatestPage         } from '../pages/latest/latest';
import { MapPage            } from '../pages/map/map';
// import { ProfilePage        } from '../pages/profile/profile';
import { RatingPage         } from '../pages/rating/rating';
import { RegistrationPage   } from '../pages/registration/registration';
import { SearchPage         } from '../pages/search/search';
import { SplashPage         } from '../pages/splash/splash';
import { TermsPage          } from '../pages/terms/terms';

/*
 * Components
 */
import { ActivityItem } from '../components/activity-item/activity-item';
import { CheckinComponent } from '../components/checkin/checkin';
import { InvitesReceived } from '../components/invites-received/invites-received';
import { InvitesSent } from '../components/invites-sent/invites-sent';
import { MapComponent } from '../components/map/map';
import { UserItem } from '../components/user-item/user-item';

/*
 *  Pipes
 */
import { SearchFilter } from '../utils/searchFilter';
import { Capitalize } from '../utils/capitalize';

/*
 *  Validators
 */
// import {DistanceValidator} from  '../validators/distance';
// import {WaitTimeValidator} from  '../validators/waitTime';
enableProdMode()

@NgModule({
  declarations: [
    MyApp,

    AboutPage,
    ActivePage,
    ActivityDetailPage,
    ActivityInvitePage,
    ActivityListPage,
    AddFriendPage,
    ContactPage,
    CreatePage,
    EmergencyPage,
    FriendsPage,
    HomePage,
    InvitesPage,
    LandingPage,
    LatestPage,
    MapPage,
    // ProfilePage,
    RatingPage,
    RegistrationPage,
    SearchPage,
    SplashPage,
    TermsPage,


    ActivityItem,
    CheckinComponent,
    InvitesReceived,
    InvitesSent,
    MapComponent,
    UserItem,

    Capitalize,
		SearchFilter,

    //DistanceValidator,
    //WaitTimeValidator,
  ],
  imports: [
    // QRCodeModule,
    FormsModule,
    CommonModule,
    IonicModule.forRoot(MyApp),
    NgReduxModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    AboutPage,
    ActivePage,
    ActivityDetailPage,
    ActivityInvitePage,
    ActivityListPage,
    AddFriendPage,
    ContactPage,
    CreatePage,
    EmergencyPage,
    FriendsPage,
    HomePage,
    InvitesPage,
    LandingPage,
    LatestPage,
    MapPage,
    // ProfilePage,
    RatingPage,
    RegistrationPage,
    SearchPage,
    SplashPage,
    TermsPage,

    ActivityItem,
    CheckinComponent,
    InvitesReceived,
    InvitesSent,
    MapComponent,
    UserItem,
  ],
  providers: [
    AuthActions,
    EventDataActions,
    InviteActions,
    UserActions,
    ParseManager,
    DevToolsExtension,
  ]
})
export class AppModule {
  constructor(
    // public navCtrl : NavController,
    public platform : Platform,
    public ngRedux : NgRedux<any>,
    public devTools : DevToolsExtension
  ) {
    // config as before 
    var enhancers = [
      applyMiddleware(thunk),
    ]
    if(!platform.is('cordova') || platform.is('browser')) {
      enhancers.push(devTools.enhancer());
    }
    this.ngRedux.configureStore(
      rootReducer,
      {},
      [
        createLogger()
      ],
      enhancers
    );
  }
}
