import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PageUnavailableComponent }    from './page-unavailable.component';
import { PageUnavailableRoutingModule } from './page-unvailable-routing.module';


@NgModule({
  imports: [
    CommonModule,
    PageUnavailableRoutingModule
  ],
  declarations: [
    PageUnavailableComponent,
  ],
  providers: [  ]
})
export class PageUnavailableModule {}
