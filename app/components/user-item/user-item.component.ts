import { Component, ViewChild, OnInit, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
const _ = require('lodash');

/**
 *  Redux
 */
import {NgRedux} from 'ng2-redux';
import {Observable} from 'rxjs';

/*
 *  Pipes
 */
import {capitalize} from '../../utils/capitalize'

@Component({
  templateUrl: 'build/components/user-item/user-item.html',
  selector: 'user-item',
  pipes : [
    capitalize
  ]
})
export class UserItemComponent {
  @Input() user;
  rating  : number = 0;
  hasChanged : boolean = false;
  maxStars : Object = [1, 2, 3, 4, 5];
  constructor(private nav: NavController, private ngRedux: NgRedux<any>) {};
  ngOnInit() {
    
  }
  getIsRated(index: number){
    return index <= this.rating ? {
      'rated': 'true'
    } : {
    };
  } 
  incrementRating() {
    this.rating += 1;
  }
  decrementRating(){
    this.rating -= 1;
  }
  logItemSwipe(ev){
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
  setRating(index:number, lock: boolean){
    if(lock) {
      this.hasChanged = true;
    }
    this.rating = index;
  }
}
