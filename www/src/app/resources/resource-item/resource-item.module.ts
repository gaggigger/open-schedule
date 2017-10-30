import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourceItemComponent }    from './resource-item.component';
import { ResourceItemRoutingModule } from './resource-item-routing.module';
import {I18nModule} from "../../Services/i18n.service";
import {AgGridModule} from "ag-grid-angular/main";
import {ResourceGirdComponent} from "../resource-gird/resource-gird.component";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ResourceItemRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    ResourceItemComponent,
    ResourceGirdComponent
  ],
  providers: [  ]
})
export class ResourceItemModule {}
