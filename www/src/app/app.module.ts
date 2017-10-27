import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import {HttpService} from "./Services/http.service";

import {environment} from "../environments/environment";


import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './page-forbidden/page-forbidden.component';

import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component'
import { ResourcesComponent } from './resources/resources.component';
import { ResourceItemComponent } from './resource-item/resource-item.component';
import {TitleService} from "./Services/title.service";


const appRoutes: Routes = [
  { path: '',
    redirectTo: '/resources',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: 'resources/:item',
    component: ResourceItemComponent
  },
  { path: 'forbidden', component: PageForbiddenComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ResourcesComponent,
    PageNotFoundComponent,
    ResourceItemComponent,
    PageForbiddenComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    RouterModule.forRoot(
      appRoutes,
      {
        useHash : true,
        enableTracing: environment.Router_enableTracing
      }
    ),

    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [
    HttpService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
