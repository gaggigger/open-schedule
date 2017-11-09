import {Component, EventEmitter, Input, OnChanges, Output, ViewEncapsulation} from "@angular/core";

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
export class ResourceGirdComponent implements OnChanges {
  @Input() gridColumn: string = '';
  @Input() gridData: string = '';
  @Output() onGridSelection = new EventEmitter<Array<object>>();

  gridOptions: GridOptions;
  columnDefs: any[];
  rowData: any[];

  constructor(
    private httpSrv: HttpService,
    private i18n: I18nService
  ) { }

  ngOnChanges(): void {
    this.gridOptions = <GridOptions>{
      enableFilter: true,
      rowSelection: 'multiple',
    };

    if(! this.gridColumn && ! this.gridData) return;

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
    // TODO error here on resource change
    this.onGridSelection.emit([event.data, event.node.selected]);
  }

  onCellValueChanged(event: any) {
    if(event.oldValue != event.value) {
      console.log(event.data);
    }
  }

  onModelUpdated(event: any) {
    // !!! needed after grid content update
    if(event.newData) this.gridOptions.api = event.api;
  }

  addResource() {
    this.onGridSelection.emit([{}, true]);
  }

}

