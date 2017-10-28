import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageForbiddenComponent }    from './page-forbidden.component';
import { PageForbiddenRoutingModule } from "./page-forbidden-routing.module";


@NgModule({
  imports: [
    CommonModule,
    PageForbiddenRoutingModule
  ],
  declarations: [
    PageForbiddenComponent,
  ],
  providers: [  ]
})
export class PageForbiddenModule {}
