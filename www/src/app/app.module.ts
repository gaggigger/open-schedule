import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CookieService } from 'ngx-cookie-service';

import {HttpService} from "./Services/http.service";

import {MenuComponent, MenuModule} from './menu/menu.component'

import {TitleService} from "./Services/title.service";
import {TokenService} from "./Services/token.service";

import {HomeModule} from "./home/home.module";
import {PageForbiddenModule} from "./error-pages/page-forbidden/page-forbidden.module";
import {PageGeneralErrorModule} from "./error-pages/page-general-error/page-general-error.module";
import {PageNotFoundModule} from "./error-pages/page-not-found/page-not-found.module";
import {PageUnavailableModule} from "./error-pages/page-unavailable/page-unavailable.module";
import {LogoutModule} from "./log/logout/logout.module";
import {LoginModule} from "./log/login/login.module";
import {ResourcesModule} from "./resources/resources/resources.module";
import {ResourceItemModule} from "./resources/resource-item/resource-item.module";
import {CacheService} from "./Services/cache.service";
import {I18nService} from "./Services/i18n.service";
import {CreditModule} from "./credit/credit.module";
import {UtilsService} from "./Services/utils";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AccordionModule.forRoot(),

    HomeModule,
    CreditModule,
    MenuModule,

    LoginModule,
    LogoutModule,

    ResourcesModule,
    ResourceItemModule,

    PageForbiddenModule,
    PageGeneralErrorModule,
    PageNotFoundModule,
    PageUnavailableModule,

    AppRoutingModule,

  ],
  providers: [
    CookieService,
    HttpService,
    TitleService,
    TokenService,
    CacheService,
    I18nService,
    UtilsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
