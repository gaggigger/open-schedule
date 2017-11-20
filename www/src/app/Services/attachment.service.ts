import {Injectable, NgModule, Pipe, PipeTransform} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable()
export class AttachmentService {
  constructor(
    private http: HttpService,
  ) { }

  upload(content) {
    this.http
      .put('/attachments', content)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
