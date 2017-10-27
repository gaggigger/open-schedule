import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../Services/title.service";

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
    private titleSrv: TitleService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('503 - Service Unavailable');

  }
}
