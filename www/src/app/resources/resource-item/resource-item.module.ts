import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourceItemComponent }    from './resource-item.component';
import { ResourceItemRoutingModule } from './resource-item-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ResourceItemRoutingModule
  ],
  declarations: [
    ResourceItemComponent,
  ],
  providers: [  ]
})
export class ResourceItemModule {}
