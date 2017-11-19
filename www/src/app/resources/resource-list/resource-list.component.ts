import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, Pipe, PipeTransform,
  TemplateRef
} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpService} from "../../Services/http.service";

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnChanges {
  @Input() item: object = {};
  @Input() itemData: number = null;
  @Input() readonly: boolean = true;

  modalRef: BsModalRef;
  private items: Array<object> = [];

  private term: string = '';
  private checkedItems: Array<object> = [];

  @Output() onCheck = new EventEmitter<object>();

  constructor(
    private httpSrv: HttpService,
    private modalService: BsModalService,
  ) { }

  ngOnChanges() {
    // Load selected item
    this.httpSrv
      .get('/resources/items/data', {
        ids: this.itemData[this.item['name']]
      }) // TODO get path from db
      .then(result => {
        this.checkedItems = result.map(item => {
          item['checked'] = true;
          return item;
        });
      })
      .catch(error => console.error(error));
  }

  showlist(template: TemplateRef<any>) {
    const ids = this.checkedItems.map(item => item['id']);
    this.items = [];
    this.item['resources_items_items'].map(resource => {
      this.httpSrv
        .get('/resources/' + resource + '/data') // TODO get path from db
        .then(result => {
          this.items = this.items.concat(result.map(i => {
            i['_resource'] = resource;
            i['checked'] = ids.indexOf(i['id']) !== -1;
            return i;
          }));
        })
        .catch(error => console.error(error));
    });

    this.modalRef = this.modalService.show(template);
  }

  checkItem(item: object) {
    item['checked'] = ! item['checked'];
    this.onCheck.emit({
      id : this.itemData['id'],
      item: this.item,
      data: item
    });
    if(item['checked']) {
      this.checkedItems.push(item);
    }else {
      this.checkedItems = this.checkedItems.filter(i => i['id'] !== item['id']);
    }
  }
}

