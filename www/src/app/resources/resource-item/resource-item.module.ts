import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourceItemComponent }    from './resource-item.component';
import { ResourceItemRoutingModule } from './resource-item-routing.module';
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ResourceItemRoutingModule
  ],
  declarations: [
    ResourceItemComponent,
  ],
  providers: [  ]
})
export class ResourceItemModule {}
