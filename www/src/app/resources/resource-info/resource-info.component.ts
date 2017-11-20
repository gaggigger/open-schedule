import {
  Component, Input, EventEmitter, OnChanges, Output, ViewEncapsulation, ViewChild,
  TemplateRef
} from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {UtilsService} from "../../Services/utils";
import {NgForm} from "@angular/forms";
import {AttachmentService} from "../../Services/attachment.service";


@Component({
  selector: '[app-resource-info]',
  templateUrl: './resource-info.component.html',
  encapsulation : ViewEncapsulation.None,
  styleUrls: [
    './resource-info.component.css',
    '../../../../node_modules/ngx-bootstrap/datepicker/bs-datepicker.css',
  ]
})

export class ResourceInfoComponent implements OnChanges {
  @Input() path: string = '';
  @Input() items: Array<object> = [];
  @Output() onInfoChange = new EventEmitter<object>();

  private resources: Array<object> = [];
  private cacheForm: Array<object> = [];
  private form: object = {};

  constructor(
    private httpSrv: HttpService,
    private utils: UtilsService,
    private attachment: AttachmentService,
  ) { }

  ngOnChanges() {
    if (! this.cacheForm[this.path]) {
      this.httpSrv
        .get(this.path)
        .then(result => {
          this.cacheForm[this.path] = this.form = result;
          this.formatData();
        })
        .catch(error => console.error(error));
    } else {
      this.form = this.cacheForm[this.path];
      this.formatData();
    }
  }

  formatData() {
    Object.keys(this.form).map(key => {
      this.form[key].map(item => {
        if (item.type == 'date') {
          this.items.map((data, k) => {
            if (this.items[k]['data'][item.name]) {
              this.items[k]['data'][item.name] = new Date(this.items[k]['data'][item.name]);
            }
          });
        }
      });
    });

  }

  trackByFn(index: any, item: any) {
    return index;
  }

  activeResourceEdition(item) {
    item.enableEdition = true;
  }

  saveResource(item) {
    this.httpSrv
      .put(this.path, item)
      .then(result => {
        if (result.id) item.data.id = result.id;
        item.savedError = false;
        item.saved = true;
        this.onInfoChange.emit(result);
      })
      .catch(error => {
        item.saved = false;
        item.savedError = true;
        console.error(error);
      });
  }

  uploadFile(content) {
    this.attachment.upload(content);
  }

  checkItems(data) {
    this.items.map((item: object) => {
      if (item['data'].id === data.id) {
        if (! item['data'][data.item.name]) {
          item['data'][data.item.name] = [];
        }
        item['data'][data.item.name].push(data.data.id);
      }
    });
  }
}
