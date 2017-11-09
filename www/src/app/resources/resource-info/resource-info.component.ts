import {Component, Input, OnChanges} from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {UtilsService} from "../../Services/utils";
import {NgForm} from "@angular/forms";


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
    console.log(Math.random());
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  saveResource(item) {
    console.log(this.path);
    console.log(item);
    this.httpSrv
      .put(this.path, item)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error));
  }
}
