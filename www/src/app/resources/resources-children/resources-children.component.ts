import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {BsModalService} from "ngx-bootstrap";
import {HttpService} from "../../Services/http.service";

@Component({
  selector: 'app-resources-children',
  templateUrl: './resources-children.component.html',
  styleUrls: ['./resources-children.component.css']
})
export class ResourcesChildrenComponent implements OnChanges {
  @Input() item: object = {};
  @Input() itemData: number = null;
  @Input() readonly: boolean = true;

  constructor(
    private httpSrv: HttpService,
    private modalService: BsModalService,
  ) { }

  ngOnChanges() {
    // Load selected item
    this.httpSrv
      .get('/resources/items/data', {
        children: this.itemData['id']
      }) // TODO get path from db
      .then(result => {
        console.log(result);
      })
      .catch(error => console.error(error));
  }

}
