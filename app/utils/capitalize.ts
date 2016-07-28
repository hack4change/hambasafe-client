import { Pipe } from '@angular/core';

/**
 * Capitalize Pipe
 * 
 * It accepts a string
 * 
 * Example:
 * 
 *  <div>
 *    firstname: {{ user.firstName | capitalize}}
 *  </div>
 * 
 */
@Pipe({ name: 'capitalize' })
export class capitalize {
  transform(value) {
    if(!value || !value.length) return undefined;
    value = value.toLowerCase();
    var splitValue = value.split(' ');
    var result = '';
    for(var i = 0; i < splitValue.length; i++){
      result += splitValue[i].charAt(0).toUpperCase();
      if(value.length > 1) {
        result += splitValue[i].substring(1);
      }
      result += " ";
    }
    return result.trim();
  }
}

