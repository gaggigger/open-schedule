import { Component } from '@angular/core';
import {Location} from '@angular/common';
import {TitleService} from "./Services/title.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Open-Schedule';

  constructor(
    private location: Location,
    private titleSrv: TitleService
  ) { }

  back() {
    this.location.back();
  }
  next() {
    this.location.forward();
  }
}
