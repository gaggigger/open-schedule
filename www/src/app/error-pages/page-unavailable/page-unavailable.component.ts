import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../Services/title.service";
import {I18nService} from "../../Services/i18n.service";

@Component({
  moduleId: module.id,
  selector: 'app-503',
  template: `
    <section style="font-size: 10em;text-align: center;color: gold;">
      <i class="glyphicon glyphicon-warning-sign"></i>
    </section>
  `
})

export class PageUnavailableComponent implements OnInit {
  constructor(
    private titleSrv: TitleService,
    private i18n: I18nService
  ) { }

  ngOnInit() {
    this.titleSrv.set('503 - ' + this.i18n.trans('Service Unavailable'));

  }
}
