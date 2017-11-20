import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourceItemComponent }    from './resource-item.component';
import { ResourceItemRoutingModule } from './resource-item-routing.module';
import {I18nModule} from "../../Services/i18n.service";
import {AgGridModule} from "ag-grid-angular/main";
import {ResourceGirdComponent} from "../resource-gird/resource-gird.component";
import {ResourcePanelComponent} from "../resource-panel/resource-panel.component";
import {BsDatepickerModule, TabsModule} from "ngx-bootstrap";
import {ResourceInfoComponent} from "../resource-info/resource-info.component";
import {ResourceCalendarComponent} from "../resource-calendar/resource-calendar.component";
import {ResourcePrintComponent} from "../resource-print/resource-print.component";
import {FormsModule} from "@angular/forms";
import {ColorPickerModule} from 'angular4-color-picker';
import {FilterPipe, JoinPipe, SafePipe} from "../../Services/utils";
import {ResourceListComponent} from "../resource-list/resource-list.component";
import {FileUploadComponent} from "../../file-upload/file-upload.component";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ResourceItemRoutingModule,
    AgGridModule.withComponents([]),
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ColorPickerModule,
  ],
  declarations: [
    ResourceItemComponent,
    ResourceGirdComponent,
    ResourcePanelComponent,
    ResourceInfoComponent,
    ResourceCalendarComponent,
    ResourcePrintComponent,
    ResourceListComponent,
    SafePipe,
    FilterPipe,
    JoinPipe,
    FileUploadComponent,
  ],
  providers: [  ]
})
export class ResourceItemModule {}
