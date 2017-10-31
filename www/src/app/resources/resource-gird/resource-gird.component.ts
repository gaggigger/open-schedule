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
  @Input() gridColumn: string = '';
  @Input() gridData: string = '';

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor(
    private httpSrv: HttpService,
    private i18n: I18nService
  ) { }

  ngOnChanges() {
    // Force component refre
    if(this.gridOptions) {
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.gridOptions = <GridOptions>{
      enableFilter: true,
      rowSelection: 'single',
    };
    this.getConfiguration()
      .then(result => {
        return this.getData();
      })
      .catch(error => console.error(error));
  }

  /**
   * Get item configuraiton : column defs, ...
   * @returns {Promise<void|TResult2|TResult1>}
   */
  private getConfiguration(): Promise<any> {
    return this.httpSrv
      .get(this.gridColumn)
      .then(result => {
        this.columnDefs = [
          // Add checkbox column
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
  }

  /**
   * Get grid data
   * @returns {Promise<void|TResult2|TResult1>}
   */
  private getData(): Promise<any> {
    return this.httpSrv
      .get(this.gridData)
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

