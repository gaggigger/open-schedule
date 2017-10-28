import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourcesComponent }    from './resources.component';
import { ResourcesRoutingModule } from './resources-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ResourcesRoutingModule
  ],
  declarations: [
    ResourcesComponent,
  ],
  providers: [  ]
})
export class ResourcesModule {}
