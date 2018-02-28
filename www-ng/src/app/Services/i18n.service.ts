import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable()
export class I18nService {
  items: Object = {};
  private loaded: boolean = false;
  // TODO sanitize key

  constructor(
    private http: HttpService,
  ) { }

  /**
   * Translation is in async mode
   * @param key
   * @returns {Promise<string>}
   */
  public translate(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if(! this.loaded) {
        this.http
          .get('/i18n')
          .then(result => {
            this.loaded = true;
            Object.keys(result).map(k => {
              // TODO latinize
              this.items[k] = result[k];
            });
            resolve(this.trans(key));
          })
          .catch(error => {
            this.loaded = true;
            resolve(this.trans(key));
            console.error(error);
          });
      }else {
        resolve(this.trans(key));
      }
    });
  }

  public trans(key: string): string {
    // TODO latinize
    if(! this.items[key]) {
      //console.warn('Translation error : ' + key);
    }
    return this.items[key] || key;
  }

}

@Pipe({
  name: 'trans'
})
export class I18nPipe implements PipeTransform {
  constructor(
    private i18n: I18nService
  ) { }

  /**
   * Use with async
   * @param value
   * @returns {Promise<string>}
   */
  transform(value: any): any {
    return this.i18n.trans(value) ;
  }
}

@NgModule({
  imports: [],
  declarations: [I18nPipe],
  exports: [I18nPipe],
})
export class I18nModule {
  static forRoot() {
    return {
      ngModule: I18nModule,
      providers: [],
    };
  }
}
