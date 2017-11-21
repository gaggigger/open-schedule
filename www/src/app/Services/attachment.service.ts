import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AttachmentService {
  constructor(
    private http: HttpService,
  ) { }

  upload(content) {
    return this.http.put('/attachments', content);
  }

  getUrl(uuid) {
    return '/attachments/' + uuid;
  }
}
