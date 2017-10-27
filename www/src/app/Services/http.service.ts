import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {environment} from "../../environments/environment";
import {Router} from "@angular/router";


@Injectable()
export class HttpService {
  headers: Headers;
  options: RequestOptions;

  constructor(
    private http: Http,
    private router : Router
  ) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  send(url: string): Promise<any> {
    return this.http
      .get(environment.API_URL + url, this.options)
      .toPromise()
      .then(response => response.json())
      .catch(response => this.handleError(response, url));
  }

  private handleError(response: any, url: string): Promise<any> {
    switch (response.status) {
      case 404 :
        this.router.navigate([url]);
        break;
      case 401 :
        this.router.navigate(['login']);
        break;
      case 403 :
        this.router.navigate(['forbidden']);
        break;
    }
    return Promise.reject(response.message || response);
  }
}
