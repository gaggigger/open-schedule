import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageGeneralErrorComponent }    from './page-general-error.component';
import { PageGeneralErrorRoutingModule } from "./page-general-error-routing.module";
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    PageGeneralErrorRoutingModule
  ],
  declarations: [
    PageGeneralErrorComponent,
  ],
  providers: [  ]
})
export class PageGeneralErrorModule {}
