import {Component, Input, OnChanges} from '@angular/core';
import {HttpService} from "../../Services/http.service";

@Component({
  selector: '[app-resource-info]',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css']
})
export class ResourceInfoComponent implements OnChanges {
  @Input() path: string = '';
  @Input() items: Array<object> = [];
  private resources: Array<object> = [];

  constructor(
    private httpSrv: HttpService
  ) { }

  // TODO move to a filter
  toarray(obj): Array<object> {
    return Object.keys(obj).map((key) => {
      return {
        key : key,
        value : obj[key]
      }
    });
  }

  ngOnChanges() {
    this.resources = [];
    this.items.map((item: object) => {
      this.httpSrv
        .get(this.path.replace(/:id/, item['id']))
        .then(result => {
          this.resources.push(result);
        })
        .catch(error => console.error(error));

    });
  }


}
