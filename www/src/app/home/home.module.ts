import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { HomeComponent }    from './home.component';
import {HomeRoutingModule} from "./home-routing.module";
import { I18nModule } from "../Services/i18n.service";


@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [  ]
})
export class HomeModule {}
