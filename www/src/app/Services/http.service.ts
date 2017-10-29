import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {Observable} from "rxjs/Observable";


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
    // TODO send lang
    if(! this.options.headers.has('Authorization') && this.token.get()) {
      this.options.headers.append('Authorization', this.token.get());
    }
    return this.http;
  }

  private send(obs: Observable<any>): Promise<any> {
    return obs
      .toPromise()
      .then(response => this.handleSuccess(response))
      .catch(response => this.handleError(response, ''));
  }

  private handleSuccess(response: any) {
    let result = response.json();
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
      default:
        this.router.navigate(['general-error']);
        break;
    }
    return Promise.reject(response.message || response);
  }

  post(url: string, body: object): Promise<any> {
    return this.send(
      this.request().post(environment.API_URL + url, body, this.options)
    );
  }

  get(url: string, parameters: object={}): Promise<any> {
    return this.send(
      this.request().get(
        environment.API_URL + url + '?' + Object.keys(parameters)
          .map(p => p + '=' + encodeURIComponent(parameters[p]))
          .join('&'),
        this.options)
    );
  }

}
