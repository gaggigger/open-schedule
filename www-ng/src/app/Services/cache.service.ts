import { Injectable } from '@angular/core';
import {Time} from "ngx-bootstrap/timepicker/timepicker.models";


@Injectable()
export class CacheService {
  // TODO implement methods

  public getKey(): string {
    return '';
  }

  public get(): any {
    return null;
  }

  public isHit(): boolean {
    return false;
  }

  public set(value: any): any {
    return null;
  }

  public expiresAt(expiration: Date): any {
    return null;
  }

  public expiresAfter(time: Time): any {
    return null;
  }
}
