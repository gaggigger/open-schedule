import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

//import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
//import { TooltipModule } from 'ngx-bootstrap/tooltip';
//import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { ResourcesmenuComponent } from './resourcesmenu/resourcesmenu.component'

@NgModule({
  declarations: [
    AppComponent,
    ResourcesmenuComponent
  ],
  imports: [
    BrowserModule,
    //BsDropdownModule.forRoot(),
    //TooltipModule.forRoot(),
    //ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
