import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';
import {HttpService} from "../../Services/http.service";
import {TitleService} from "../../Services/title.service";

import {GridOptions} from "ag-grid/main";

@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent implements OnInit {
  private resource: string = '';
  private items: Array<object> = [];
  private sub: any;

  private gridOptions: GridOptions = <GridOptions>{};
  private columnDefs: any[];
  private rowData: any[];

  constructor(
    private titleSrv: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private httpSrv: HttpService,
    private location: Location
  ) {


  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.resource = params['item'];
      this.titleSrv.append(this.resource);

      this.columnDefs = [
        {headerName: "Make", field: "make"},
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
      ];

      this.rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
      ]

    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
}
