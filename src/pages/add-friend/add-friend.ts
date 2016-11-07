import {
  Component,
  OnInit,
  NgZone,
} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
// const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {
  EventDataActions
} from '../../actions/event-data.actions';
import {
  UserActions
} from '../../actions/user.actions';

/*
 *  Pages
 */
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-add-friend',
  templateUrl: 'add-friend.html'
})
export class AddFriendPage implements OnInit {
  currentQuery = '';

  visibleUsers$     : Observable<any>;
  userId$           : Observable<any>;

  visibleUsersSub$  : Subscription;
  userIdSub$        : Subscription;

  currentUserId     : string;
  selectedUsers = {};

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private ngRedux: NgRedux<any>,
    private zone: NgZone,
    private userActions : UserActions,
    private eventDataActions : EventDataActions,
  ) {}

  ngOnInit() {
    this.visibleUsers$ = this.ngRedux.select(
      (state) => {
      return state
        .getIn(['users', 'items'])
        .filter(item => {
          return this.currentQuery !== '' && (item.get('firstName') + ' ' + item.get('lastName')).indexOf(this.currentQuery.toLowerCase()) !== -1 || !!this.selectedUsers[item.get('objectId')];
          // && this.selectUsers.tem.get('objectId')
        })
        .toList()
        .toJSON()
      });
      this.visibleUsersSub$ = this.visibleUsers$.subscribe(() => {
      
      })
  }
  ngOnDestroy(){
    if(!!this.visibleUsersSub$){
      this.visibleUsersSub$.unsubscribe();
    }
    if(!!this.userIdSub$) {
      this.userIdSub$.unsubscribe();
    }
  }
  /**
   *  NAVIGATION
   **/
	goHome() {
    this.navCtrl.setRoot(HomePage);
	}
	goSearch() {
    this.navCtrl.setRoot(SearchPage);
	}
  goBack() {
    console.log('GoBack')
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }
  /*
   * 
   */
  befriend() {
    console.log('befriending');
    this.ngRedux.dispatch(this.userActions.addFriends(Object.keys(this.selectedUsers)));
    this.goBack();
  }
  toggleSelect(userItem){
    console.log('toggle Select')
    if(!!this.selectedUsers[userItem['objectId']]){
      delete this.selectedUsers[userItem['objectId']]
    } else {
      this.selectedUsers[userItem['objectId']] = true;
    }
  }
  getFromInput(ev){
    console.log(ev);
    this.currentQuery = ev.target.value.trim();
    this.ngRedux.dispatch(this.userActions.findUsers(this.currentQuery));
  }
  isSelected(objectId){
    return !!this.selectedUsers[objectId] ? {
      'selected-user' : true
    } : {
    };
  }
  emptySelection(){
    return Object.keys(this.selectedUsers).length == 0;
  }
}
