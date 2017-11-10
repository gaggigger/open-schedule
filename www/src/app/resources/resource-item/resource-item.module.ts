import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourceItemComponent }    from './resource-item.component';
import { ResourceItemRoutingModule } from './resource-item-routing.module';
import {I18nModule} from "../../Services/i18n.service";
import {AgGridModule} from "ag-grid-angular/main";
import {ResourceGirdComponent} from "../resource-gird/resource-gird.component";
import {ResourcePanelComponent} from "../resource-panel/resource-panel.component";
import {TabsModule} from "ngx-bootstrap";
import {ResourceInfoComponent} from "../resource-info/resource-info.component";
import {ResourceCalendarComponent} from "../resource-calendar/resource-calendar.component";
import {ResourcePrintComponent} from "../resource-print/resource-print.component";
import {FormsModule} from "@angular/forms";
import { FileDropModule } from 'ngx-file-drop/lib/ngx-drop';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ResourceItemRoutingModule,
    AgGridModule.withComponents([]),
    TabsModule.forRoot(),
    FormsModule,
    FileDropModule,
  ],
  declarations: [
    ResourceItemComponent,
    ResourceGirdComponent,
    ResourcePanelComponent,
    ResourceInfoComponent,
    ResourceCalendarComponent,
    ResourcePrintComponent,
  ],
  providers: [  ]
})
export class ResourceItemModule {}
