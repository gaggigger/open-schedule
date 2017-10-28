import { Component, OnInit } from '@angular/core';
import {TitleService} from "../Services/title.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private titleSrv: TitleService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('Home');
  }

}
