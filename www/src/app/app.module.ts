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
import { CookieService } from 'ngx-cookie-service';

import {HttpService} from "./Services/http.service";

import {environment} from "../environments/environment";

import { PageNotFoundComponent } from './error-pages/page-not-found/page-not-found.component';
import { PageForbiddenComponent } from './error-pages/page-forbidden/page-forbidden.component';
import { PageUnavailableComponent } from './error-pages/page-unavailable/page-unavailable.component';

import { LoginComponent } from './log/login/login.component';
import { LogoutComponent } from './log/logout/logout.component';

import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component'
import { ResourcesComponent } from './resources/resources/resources.component';
import { ResourceItemComponent } from './resources/resource-item/resource-item.component';
import {TitleService} from "./Services/title.service";
import {TokenService} from "./Services/token.service";
import { PageGeneralErrorComponent } from './error-pages/page-general-error/page-general-error.component';


const appRoutes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: 'resources/:item',
    component: ResourceItemComponent
  },
  { path: 'unavailable', component: PageUnavailableComponent },
  { path: 'forbidden', component: PageForbiddenComponent },
  { path: 'general-error', component: PageGeneralErrorComponent },
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
    LoginComponent,
    PageUnavailableComponent,
    LogoutComponent,
    HomeComponent,
    PageGeneralErrorComponent
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
    CookieService,
    HttpService,
    TitleService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
