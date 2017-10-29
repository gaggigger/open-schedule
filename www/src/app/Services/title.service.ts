import { Injectable } from '@angular/core';
import {I18nService} from "./i18n.service";


@Injectable()
export class TitleService {
  title : string = '';

  constructor(
    private i18n: I18nService
  ) { }

  set(title: string): void {
    this.i18n.translate(title).then(text => {
      this.title = text;
    });
  }
// TODO breadcrumbs
  append(title:string, join: string=' / '): void {
    this.i18n.translate(title).then(text => {
      this.title += join + text;
    });
  }
}
