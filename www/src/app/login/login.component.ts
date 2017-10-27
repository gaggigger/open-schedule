import { Component, OnInit } from '@angular/core';
import {TitleService} from "../Services/title.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private titleSrv: TitleService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('Login');

  }

}
