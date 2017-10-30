import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {TitleService} from "../../Services/title.service";


@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent implements OnInit {
  private resource: string = '';
  private sub: any;

  constructor(
    private titleSrv: TitleService,
    private route: ActivatedRoute,
  ) {


  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.resource = params['item'];
      this.titleSrv.append(this.resource);

    });
  }

}
