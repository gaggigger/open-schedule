import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";


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

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
