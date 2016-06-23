import {Record}  from 'immutable';

export const EventDatumRecord = Record({
  'id'                : '',
  'description'       : '',
  'date'              : new Date(),
  'difficulty'        : '',
  'distance'          : 0,
  'image'             : '',
  'name'              : '',
  'place'             : '',
  'coordinates'       : {},
  'eventType'         : {},
  'numberOfAttendees' : 0,
})

export class EventDatum extends EventDatumRecord{
  id                : string;
  description       : string;
  date              : Date;
  difficulty        : string;
  distance          : number;
  image             : string;
  name              : string;
  place             : string;
  coordinates       : Object;
  eventType         : Object;
  numberOfAttendees : number;
  constructor(props){
    super(props);
  }
  public static fromJS(data:any){
    return new EventDatum({
      'id'                :  data.id                ,
      'description'       :  data.description       ,
      'date'              :  data.date              ,
      'difficulty'        :  data.difficulty        ,
      'distance'          :  data.distance          ,
      'image'             :  data.image             ,
      'name'              :  data.name              ,
      'place'             :  data.place             ,
      'coordinates'       :  data.coordinates       ,
      'eventType'         :  data.eventType         ,
      'numberOfAttendees' :  data.numberOfAttendees ,
    })
  }
}
