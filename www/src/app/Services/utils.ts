import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {isArray} from "rxjs/util/isArray";


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

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], term, key): any {
    return term
      ? items.filter(item => item[key].indexOf(term) !== -1)
      : items;
  }
}

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  transform(items: any[], sortedBy: string): any {
    return items.sort((a, b) => {return b[sortedBy] - a[sortedBy]});
  }
}

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
 transform (input: any, character: string = ''): any {
    if (!isArray(input)) {
      return input;
    }
    return input.join(character);
  }
}
