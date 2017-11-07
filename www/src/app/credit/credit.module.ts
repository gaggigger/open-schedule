import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { CreditComponent }    from './credit.component';
import {CreditRoutingModule} from "./home-routing.module";
import { I18nModule } from "../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    CreditRoutingModule
  ],
  declarations: [
    CreditComponent
  ],
  providers: [  ]
})
export class CreditModule {}
