import { Pipe } from '@angular/core';
import _ from 'lodash';


/**
 * Filter Pipe
 * 
 * It accepts a string or an array.
 *
 * It can also filter deep, it splits the property, using a '.' a delimiter, you shouldn't have a fullstop in a key anyway.
 *
 * Example:
 * 
 *  <div *ngFor="let item of items | searchFilter:query:'name'">
 *   
 *  </div>
 * 
 */
@Pipe({ name: 'SearchFilter' })
export class SearchFilter {
  transform(value, query, property) {
    console.log('searchFilter');
    console.log(value);
    if(!query) return value;
    if(!property) return value;
    if(query.constructor.name === 'String'){
      query = query.toLowerCase();
      return value.filter(function(item) {
        return item[property].toLowerCase().indexOf(query) !== -1;
      })
    }
    else if(query.constructor.name === 'Array'){
      console.log(query);
      console.log(value);
      var splitString = property.split(".");
      return value.filter(function(item) {
        var comparable = undefined;
        _.each(splitString, (propertyItem) => { 
          comparable = !!comparable ? comparable[propertyItem] : item[propertyItem];
        })
        return query.indexOf(comparable) !== -1;
      })
    }
  }
}
