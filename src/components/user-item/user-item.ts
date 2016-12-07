import { Component, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';

/*
 *  Pages
 */
import { HomePage} from '../../pages/home/home';

/**
 * Actions
 */
import { UserActions} from '../../actions/user.actions';

/*
  Generated class for the UserItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'user-item',
  templateUrl: 'user-item.html'
})
export class UserItem implements OnInit {

  @Input() user;
  @Input() options      : boolean = false;
  @Input() mustRate     : boolean = false;
  @Input() checkedIn    : boolean = false;
  
  
  rating  : number = 0;
  hasChanged : boolean = false;
  maxStars : Object = [1, 2, 3, 4, 5];

  constructor(private nav: NavController, private ngRedux: NgRedux<any>, private userActions : UserActions) {};

  ngOnInit() {
    console.log(this.mustRate);
  }

  getIsRated(index: number) {
    return index <= this.rating ? {
      'rated': 'true'
    } : {
    };
  } 

  incrementRating() {
    this.rating += 1;
  }

  decrementRating() {
    this.rating -= 1;
  }
  logItemSwipe(ev) {
    console.log('ITEMSWIPE');
    console.log(ev);
  }
  logItemDrag(item){
    console.log('EVENTSWIPE');
    console.log(item);
    // setTimeout(()=>{
    //   item.close();
    // }, 1000)
  }
  setRating(index:number, lock: boolean) {
    if(lock) {
      this.hasChanged = true;
    }
    this.rating = index;
  }
  getClasses() {
    var retObj = {};
    if(this.checkedIn){
      retObj['user-checked-in'] = true;
    } else if (!this.user.isConfirmed && this.options) {
      retObj['to-confirm'] = true;
    }
    return retObj;
  }
  confirmFriend() {
    this.ngRedux.dispatch(this.userActions.confirmFriend(this.user.objectId));
  }
  removeFriend(friendId: string) {
    this.ngRedux.dispatch(this.userActions.removeFriend(this.user.objectId));
  }
  viewProfile(){
    console.log('viewProfile');
    this.nav.push(HomePage, {
      'userId': this.user.objectId
    }) 
  }
}
