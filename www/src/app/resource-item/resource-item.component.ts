import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent implements OnInit {
  item: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpSrv: HttpService
  ) { }

  ngOnInit() {
    this.item = this.route.snapshot.paramMap.get('item');
  }

}
