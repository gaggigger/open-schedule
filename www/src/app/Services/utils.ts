import { Injectable } from '@angular/core';


@Injectable()
export class UtilsService {

  // TODO move to a filter
  toarray(obj): Array<object> {
    return Object.keys(obj).map((key) => {
      return {
        key : key,
        value : obj[key]
      }
    });
  }

}
