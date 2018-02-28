import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageNotFoundComponent }    from './page-not-found.component';
import { PageNotFoundRoutingModule } from "./page-not-found-routing.module";
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    PageNotFoundRoutingModule
  ],
  declarations: [
    PageNotFoundComponent,
  ],
  providers: [  ]
})
export class PageNotFoundModule {}
