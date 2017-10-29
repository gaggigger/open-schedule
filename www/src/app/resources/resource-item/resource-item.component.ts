import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {HttpService} from "../../Services/http.service";
import {TitleService} from "../../Services/title.service";

@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent implements OnInit {
  item: string = '';
  private sub: any;

  constructor(
    private titleSrv: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private httpSrv: HttpService,
    private location: Location
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.item = params['item'];
      this.titleSrv.append(this.item);




    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
