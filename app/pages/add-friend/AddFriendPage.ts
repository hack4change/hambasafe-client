import {
  forwardRef,
  Component,
  ViewChild,
  OnInit,
  Input,
  NgZone,
} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import {NavController, NavParams} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable, Subscription} from 'rxjs';

/*
 * Actions
 */
import {eventDataActions} from '../../actions/eventDataActions';
import {usersActions} from '../../actions/usersActions';

/*
 *  Pages
 */
import {HomePage} from '../home/HomePage';
import {SearchPage} from '../search/SearchPage';

@Component({
  templateUrl: 'build/pages/add-friend/add-friend.html',
})
export class AddFriendPage {
  currentQuery = '';

  visibleUsers$     : Observable<any>;
  userId$           : Observable<any>;

  visibleUsersSub$  : Subscription;
  userIdSub$        : Subscription;

  currentUserId     : string;
  selectedUsers = {};

  constructor(private nav: NavController, private params: NavParams, private ngRedux: NgRedux<any>, private zone: NgZone) {}

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
    this.nav.setRoot(HomePage);
	}
	goSearch() {
    this.nav.setRoot(SearchPage);
	}
  goBack() {
    console.log('GoBack')
    if(this.nav.canGoBack()){
      this.nav.pop();
    } else {
      this.nav.setRoot(HomePage);
    }
  }
  /*
   * 
   */
  addFriends(){
    this.ngRedux.dispatch(usersActions.addFriends(Object.keys(this.selectedUsers)));
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
    this.ngRedux.dispatch(usersActions.findUsers(this.currentQuery));
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
