import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { LoginComponent }    from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import {I18nModule} from "../../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [  ]
})
export class LoginModule {}
