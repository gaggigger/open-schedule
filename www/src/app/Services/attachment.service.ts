import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable()
export class AttachmentService {
  constructor(
    private http: HttpService,
  ) { }

  upload(content) {
    return this.http.put('/attachments', content);
  }
}
