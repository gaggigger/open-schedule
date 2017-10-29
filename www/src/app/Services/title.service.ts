import { Injectable } from '@angular/core';


@Injectable()
export class TitleService {
  title : string = '';

  constructor(
  ) { }

  setTitle(title:string): void {
    this.title = title;
  }
}
