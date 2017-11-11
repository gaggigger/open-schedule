import {Component, Input, OnChanges} from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {UtilsService} from "../../Services/utils";
import {NgForm} from "@angular/forms";
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop/lib/ngx-drop';


@Component({
  selector: '[app-resource-info]',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css']
})
export class ResourceInfoComponent implements OnChanges {
  @Input() path: string = '';
  @Input() items: Array<object> = [];
  private resources: Array<object> = [];
  private cacheForm: Array<object> = [];
  private form: object = {};

  constructor(
    private httpSrv: HttpService,
    private utils: UtilsService,
  ) { }

  ngOnChanges() {
    if(! this.cacheForm[this.path]) {
      this.httpSrv
        .get(this.path)
        .then(result => {
          this.cacheForm[this.path] = this.form = result;
        })
        .catch(error => console.error(error));
    }
    else {
      this.form = this.cacheForm[this.path];
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  fileDrop(event) {
    console.log(event);
  }

  activeResourceEdition(item) {
    item.enableEdition = true;
  }

  saveResource(item) {
    this.httpSrv
      .put(this.path, item)
      .then(result => {
        if(result.id) item.data.id = result.id;
        item.savedError = false;
        item.saved = true;
      })
      .catch(error => {
        item.saved = false;
        item.savedError = true;
        console.error(error);
      });
  }
}
