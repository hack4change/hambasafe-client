import {Control} from '@angular/common';
 
export class DistanceValidator {

  static isValid(control: Control):any {

    if(isNaN(control.value)) {
      return {
        valid: false,
      }
    }

    if(control.value % 1 !== 0) {
      return {
        valid: false,
      }
    }

    if(control.value < 0) {
      return {
        valid: false,
      }
    }

    if(control.value > 300) {
      return {
        valid: false,
      }
    }

    return null;
  }

}
