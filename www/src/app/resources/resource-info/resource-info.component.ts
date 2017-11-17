import {
  Component, Input, EventEmitter, OnChanges, Output, ViewEncapsulation, ViewChild,
  TemplateRef
} from '@angular/core';
import {HttpService} from "../../Services/http.service";
import {UtilsService} from "../../Services/utils";
import {NgForm} from "@angular/forms";
import { FileDropModule, UploadFile, UploadEvent } from 'ngx-file-drop/lib/ngx-drop';
import {CreateNewAutocompleteGroup, NgAutocompleteComponent, SelectedAutocompleteItem} from "ng-auto-complete";
import {BsModalRef, BsModalService} from "ngx-bootstrap";


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
  modalRef: BsModalRef;

  @ViewChild(NgAutocompleteComponent) public completer: NgAutocompleteComponent;
  public group = [
    CreateNewAutocompleteGroup(
      'Search / choose in / from list',
      'completer',
      [
        {title: 'Option 1', id: '1'},
        {title: 'Option 2', id: '2'},
        {title: 'Option 3', id: '3'},
        {title: 'Option 4', id: '4'},
        {title: 'Option 5', id: '5'},
      ],
      {titleKey: 'title', childrenKey: null},
      '',
      false
    )
  ];

  constructor(
    private httpSrv: HttpService,
    private utils: UtilsService,
    private modalService: BsModalService,
  ) { }

  ngOnChanges() {
    if(! this.cacheForm[this.path]) {
      this.httpSrv
        .get(this.path)
        .then(result => {
          this.cacheForm[this.path] = this.form = result;
          this.formatData();
        })
        .catch(error => console.error(error));
    }
    else {
      this.form = this.cacheForm[this.path];
      this.formatData();
    }
  }

  formatData() {
    Object.keys(this.form).map(key => {
      this.form[key].map(item => {
        if(item.type == 'date') {
          this.items.map((data, k) => {
            if(this.items[k]['data'][item.name]) {
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
        this.onInfoChange.emit(result);
      })
      .catch(error => {
        item.saved = false;
        item.savedError = true;
        console.error(error);
      });
  }

  showlist(template: TemplateRef<any>, items: Array<string>) {
    console.log(items);
    this.modalRef = this.modalService.show(template);
  }
}
