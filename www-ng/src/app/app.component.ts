import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {TitleService} from "./Services/title.service";
import {I18nService} from "./Services/i18n.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'OpenSchedule';
  isLoaded: boolean = false;

  constructor(
    private location: Location,
    private i18n: I18nService,
    private titleSrv: TitleService
  ) {
    // hack to Preload i18n
    // TODO add all preload here
    this.i18n.translate(this.title).then(text => {
      this.title = text;
      this.isLoaded = true;
    });
  }

  back() {
    this.location.back();
  }
  next() {
    this.location.forward();
  }
}
