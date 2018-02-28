import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";

@Injectable()
export class AttachmentService {
  constructor(
    private http: HttpService,
  ) { }

  upload(item_id, content) {
    return this.http.put('/attachments?item_id=' + item_id, content);
  }

  getUrl(uuid) {
    return '/attachments/' + uuid;
  }
}
