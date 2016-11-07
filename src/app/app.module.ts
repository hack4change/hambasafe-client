import { NgModule } from '@angular/core';
import { NgReduxModule, DevToolsExtension } from 'ng2-redux';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

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
import { ProfilePage        } from '../pages/profile/profile';
import { RatingPage         } from '../pages/rating/rating';
import { RegistrationPage   } from '../pages/registration/registration';
import { SearchPage         } from '../pages/search/search';
import { SplashPage         } from '../pages/splash/splash';
import { TermsPage          } from '../pages/terms/terms';

/*
 * Components
 */
import { ActivityItem } from '../components/activity-item/activity-item';
import { InvitesReceived } from '../components/invites-received/invites-received';
import { InvitesSent } from '../components/invites-sent/invites-sent';
import { Map } from '../components/map/map';
import { UserItem } from '../components/user-item/user-item';

/*
 *  Pipes
 */
import { Capitalize } from '../utils/capitalize';


@NgModule({
  declarations: [
    MyApp,

    AboutPage,
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
    ProfilePage,
    RatingPage,
    RegistrationPage,
    SearchPage,
    SplashPage,
    TermsPage,

    ActivityItem,
    InvitesReceived,
    InvitesSent,
    Map,
    UserItem,

    Capitalize,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    NgReduxModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    AboutPage,
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
    ProfilePage,
    RatingPage,
    RegistrationPage,
    SearchPage,
    SplashPage,
    TermsPage,

    ActivityItem,
    InvitesReceived,
    InvitesSent,
    Map,
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
export class AppModule {}
