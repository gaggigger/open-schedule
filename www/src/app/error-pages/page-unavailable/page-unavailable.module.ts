import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageUnavailableComponent }    from './page-unavailable.component';
import { PageUnavailableRoutingModule } from './page-unvailable-routing.module';
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    PageUnavailableRoutingModule
  ],
  declarations: [
    PageUnavailableComponent,
  ],
  providers: [  ]
})
export class PageUnavailableModule {}
