import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import {LogoutComponent} from "./log/logout/logout.component";
import {ResourcesComponent} from "./resources/resources/resources.component";
import {ResourceItemComponent} from "./resources/resource-item/resource-item.component";
import {environment} from "../environments/environment";
import {HomeRoutingModule} from "./home/home-routing.module";
import {PageForbiddenRoutingModule} from "./error-pages/page-forbidden/page-forbidden-routing.module";
import {PageGeneralErrorRoutingModule} from "./error-pages/page-general-error/page-general-error-routing.module";
import {PageNotFoundRoutingModule} from "./error-pages/page-not-found/page-not-found-routing.module";
import {PageUnavailableRoutingModule} from "./error-pages/page-unavailable/page-unvailable-routing.module";
import {LoginRoutingModule} from "./log/login/login-routing.module";


const appRoutes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [
    HomeRoutingModule,
    LoginRoutingModule,

    PageForbiddenRoutingModule,
    PageGeneralErrorRoutingModule,
    PageNotFoundRoutingModule,
    PageUnavailableRoutingModule,

    RouterModule.forRoot(
      appRoutes,
      {
        useHash : true,
        enableTracing: false //!environment.production
      }
    ),
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
