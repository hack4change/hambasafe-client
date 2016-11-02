import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import reduxLogger from 'redux-logger';
import rootReducer  from '../reducers/rootReducer';

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


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LandingPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    NgReduxModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LandingPage,
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
  constructor(ngRedux:NgRedux<any>, devTools:DevToolsExtension) {
    // config as before 
    ngRedux.configureStore(rootReducer, {}, [
      reduxLogger.createLogger()
    ])
  }
}

