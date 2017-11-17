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
  @Input() itemId: number = null;
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

  }

  showlist(template: TemplateRef<any>) {
    this.items = [];
    this.item['resources_items_items'].map(resource => {
      this.httpSrv
        .get('/resources/' + resource + '/data') // TODO get path from db
        .then(result => {
          this.items = this.items.concat(result.map(i => {
            i['_resource'] = resource;
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
      id : this.itemId,
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

