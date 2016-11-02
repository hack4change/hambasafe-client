import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {ParseManager} from '../providers/parse-manager';

/*
  Generated class for the AuthActions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthActions {

  constructor(public http: Http, public parseManager: ParseManager) {
    console.log('Hello AuthActions Provider');
  }

}
