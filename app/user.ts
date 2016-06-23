import {Record}  from 'immutable';

export const UserRecord = Record({
  'id'                : '',
  'firstname'         : '',
  'surname'           : '',
  'joined'            : new Date(),
  'rating'            : 0,
  'age'               : 0,
  'place'             : '',
  'gender'            : '',
  'numberOfFriends'   : 0,
  'attended'          : 0,
})

export class User extends UserRecord{
  'id'               : string;
  'firstname'        : string;
  'surname'          : string;
  'joined'           : Date;
  'rating'           : number;
  'age'              : number;
  'place'            : string;
  'gender'           : string;
  'numberOfFriends'  : number;
  'attended'         : number;

  constructor(props){
    super(props);
  }
  public static fromJS(data:any){
    return new User({
      'id'                :  data.id                      ,
      'firstname'         :  data.firstname               ,
      'surname'           :  data.surname                 ,
      'joined'            :  data.joined                  ,
      'rating'            :  data.rating                  ,
      'age'               :  data.age                     ,
      'place'             :  data.place                   ,
      'gender'            :  data.gender                  ,
      'numberOfFriends'   :  data.numberOfFriends         ,
      'attended'          :  data.attended                ,
    })
  }
}
