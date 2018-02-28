import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenService {
  constructor(
    private cookie: CookieService
  ) { }

  get(): string {
    return this.cookie.get('os-tkn');
  }

  set(token:string): void {
    this.cookie.set('os-tkn', token);
  }

  logged(): boolean {
    return !!this.get();
  }

  logOff(): void {
    this.cookie.delete('os-tkn');
  }
}

