import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { LogoutComponent }    from './logout.component';
import { LogoutRoutingModule } from './logout-routing.module';
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    LogoutRoutingModule
  ],
  declarations: [
    LogoutComponent,
  ],
  providers: [  ]
})
export class LogoutModule {}
