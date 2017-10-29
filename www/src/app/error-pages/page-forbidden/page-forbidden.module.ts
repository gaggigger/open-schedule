import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageForbiddenComponent }    from './page-forbidden.component';
import { PageForbiddenRoutingModule } from "./page-forbidden-routing.module";
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    PageForbiddenRoutingModule
  ],
  declarations: [
    PageForbiddenComponent,
  ],
  providers: [  ]
})
export class PageForbiddenModule {}
