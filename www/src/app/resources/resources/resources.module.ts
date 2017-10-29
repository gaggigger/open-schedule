import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { ResourcesComponent }    from './resources.component';
import { ResourcesRoutingModule } from './resources-routing.module';
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ResourcesRoutingModule
  ],
  declarations: [
    ResourcesComponent,
  ],
  providers: [  ]
})
export class ResourcesModule {}
