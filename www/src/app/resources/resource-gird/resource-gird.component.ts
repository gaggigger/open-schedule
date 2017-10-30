import {Component, ViewEncapsulation} from "@angular/core";

import {GridOptions} from "ag-grid/main";

@Component({
  selector: 'app-resource-grid',
  templateUrl: './resource-gird.component.html',
  encapsulation : ViewEncapsulation.None,
  styleUrls: [
    // TODO ???????
    '../../../../node_modules/ag-grid/dist/styles/ag-grid.css',
    '../../../../node_modules/ag-grid/dist/styles/compiled-icons.css',
    '../../../../node_modules/ag-grid/dist/styles/ag-theme-material.css',
    '../../../../node_modules/ag-grid/dist/styles/theme-blue.css',
    '../../../../node_modules/ag-grid/dist/styles/theme-dark.css',
    '../../../../node_modules/ag-grid/dist/styles/theme-material.css',
    '../../../../node_modules/ag-grid/dist/styles/theme-fresh.css',
    '../../../../node_modules/ag-grid/dist/styles/theme-bootstrap.css',
  ],
})
export class ResourceGirdComponent {
  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor() {
    this.gridOptions = <GridOptions>{};

    this.columnDefs = [
      {headerName: "Model", field: "model"},
      {headerName: "Price", field: "price"}
    ];

    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000},
      {make: "Ford", model: "Mondeo", price: 32000},
      {make: "Porsche", model: "Boxter", price: 72000}
    ]
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }
}

