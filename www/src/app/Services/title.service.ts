import { Injectable } from '@angular/core';
import {I18nService} from "./i18n.service";


@Injectable()
export class TitleService {
  title : string = '';

  constructor(
    private i18n: I18nService
  ) { }

  set(title: string): void {
    this.title = this.i18n.trans(title);
  }
// TODO breadcrumbs
  append(title:string, join: string=' / '): void {
    this.title += join + this.i18n.trans(title);
  }
}
