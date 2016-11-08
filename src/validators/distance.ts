import {FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';
 

@Injectable()
export class DistanceValidator {

  constructor(){}

  static isValid(formControl: FormControl):any {

    if(isNaN(formControl.value)) {
      return {
        valid: false,
      }
    }

    if(formControl.value % 1 !== 0) {
      return {
        valid: false,
      }
    }

    if(formControl.value < 0) {
      return {
        valid: false,
      }
    }

    if(formControl.value > 300) {
      return {
        valid: false,
      }
    }

    return null;
  }

}
