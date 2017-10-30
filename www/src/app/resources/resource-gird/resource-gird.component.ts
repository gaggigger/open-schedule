import {Component, Input, OnInit, ViewEncapsulation} from "@angular/core";

import {GridOptions} from "ag-grid/main";
import {I18nService} from "../../Services/i18n.service";
import {HttpService} from "../../Services/http.service";

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
export class ResourceGirdComponent implements OnInit {
  @Input() params: object = {};

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor(
    private httpSrv: HttpService,
    private i18n: I18nService
  ) {
  }

  ngOnInit(): void {
    this.gridOptions = <GridOptions>{
      enableFilter: true,
      rowSelection: 'multiple',
    };
    // Get column defs
    this.httpSrv
      .get(this.params['path'])
      .then(result => {
        this.columnDefs = [
          {
            headerName: '#',
            width: 30,
            checkboxSelection: true,
            suppressSorting: true,
            suppressMenu: true,
            pinned: true
          }
        ].concat(result);
      })
      .catch(error => console.error(error));
    // Get data
    this.httpSrv
      .get(this.params['path'] + '/data')
      .then(result => {
        this.rowData = result;
      })
      .catch(error => console.error(error));
  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  selectAllRows() {
    this.gridOptions.api.selectAll();
  }

  onRowSelected(event: any) {
    if(event.node.selected) {
      console.log(event.data);
    }
  }

  onCellValueChanged(event: any) {
    if(event.oldValue != event.value) {
      console.log(event.data);
    }
  }

}

