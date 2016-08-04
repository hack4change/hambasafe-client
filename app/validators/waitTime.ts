import {Control} from '@angular/common';
 
export class WaitTimeValidator {

  static isValid(control: Control) : any {

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

    if(control.value > 30) {
      return {
        valid: false,
      }
    }

    return null;
  }

}

