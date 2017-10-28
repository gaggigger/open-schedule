import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageGeneralErrorComponent }    from './page-general-error.component';
import { PageGeneralErrorRoutingModule } from "./page-general-error-routing.module";


@NgModule({
  imports: [
    CommonModule,
    PageGeneralErrorRoutingModule
  ],
  declarations: [
    PageGeneralErrorComponent,
  ],
  providers: [  ]
})
export class PageGeneralErrorModule {}
