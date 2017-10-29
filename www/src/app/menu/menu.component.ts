import {Component, NgModule, OnInit} from '@angular/core';
import { HttpService } from '../Services/http.service';
import {I18nModule, I18nService} from "../Services/i18n.service";
import {CommonModule} from "@angular/common";
import {LogoutRoutingModule} from "../log/logout/logout-routing.module";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  title: string = 'OpenSchedule';
  menus: Array<Object> = [];

  constructor(
    private httpSrv: HttpService,
    private i18n: I18nService
  ) { }

  ngOnInit(): void {
    this.i18n.translate('OpenSchedule').then(text => {
      this.title = text;
    });

    this.httpSrv
      .get('/menu')
      .then(result => {
        this.menus = result;
      })
      .catch(error => console.error(error));
  }
}

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    LogoutRoutingModule
  ],
  declarations: [],
  providers: [  ]
})
export class MenuModule {}
