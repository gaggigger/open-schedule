import { Injectable } from '@angular/core';
import {Time} from "ngx-bootstrap/timepicker/timepicker.models";
import {HttpService} from "./http.service";


@Injectable()
export class ChoiceListService {
  private items: Array<object> = [];
  private loaded = false;

  constructor(
    private http: HttpService,
  ) { }

  /**
   * Translation is in async mode
   * @param key
   * @returns {Promise<string>}
   */
  public get(key: string): Promise<object[]> {
    return new Promise<object[]>((resolve, reject) => {
      if(! this.loaded) {
        this.http
          .get('/choicelists')
          .then(result => {
            this.loaded = true;
            this.items = result;
            resolve(this.items.filter(item => item['name'] === key)[0]['items']);
          })
          .catch(error => {
            this.loaded = true;
            //resolve();
          });
      }else {
        resolve(this.items.filter(item => item['name'] === key)[0]['items']);
      }
    });
  }
}
