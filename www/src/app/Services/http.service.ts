import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";


@Injectable()
export class HttpService {
  headers: Headers;
  options: RequestOptions;

  constructor(
    private http: Http,
    private router: Router,
    private token: TokenService
  ) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  private request(): Http {
    if(! this.options.headers.has('Authorization') && this.token.get()) {
      this.options.headers.append('Authorization', this.token.get());
    }
    return this.http;
  }

  post(url: string, body: object): Promise<any> {
    return this.request()
      .post(environment.API_URL + url, body, this.options)
      .toPromise()
      .then(response => this.handleSuccess(response))
      .catch(response => this.handleError(response, url));
  }

  get(url: string): Promise<any> {
    return this.request()
      .get(environment.API_URL + url, this.options)
      .toPromise()
      .then(response => this.handleSuccess(response))
      .catch(response => this.handleError(response, url));
  }

  private handleSuccess(response: any) {
    let result = response.json();
    // TODO save to local storage
    if(result.token) this.token.set(result.token);
    return result;
  }

  private handleError(response: any, url: string): Promise<any> {
    switch (response.status) {
      case 0:
        this.router.navigate(['unavailable']);
        break;
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
