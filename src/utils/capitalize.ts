import { Pipe, PipeTransform } from '@angular/core';

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
@Pipe({ name: 'Capitalize' })
export class Capitalize implements PipeTransform {
  transform(value) {
    if(!value || !value.length) return undefined;
    value = value.toLowerCase();
    var spaceSplit = value.split(' ');
    var result = '';
    for(var i = 0; i < spaceSplit.length; i++){
      var quoteSplit = spaceSplit[i].split("'");
      result += quoteSplit[0].charAt(0).toUpperCase();
      if(value.length > 1) {
        result += quoteSplit[0].substring(1);
      }
      for(var j = 1; j < quoteSplit.length; j++){
        result += "'";
        result += quoteSplit[j].charAt(0).toUpperCase();
        if(value.length > 1) {
          result += quoteSplit[j].substring(1);
        }
      }
      result += " ";
    }
    return result.trim();
  }
}

