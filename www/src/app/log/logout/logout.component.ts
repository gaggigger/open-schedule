import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../Services/token.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit() {
    this.token.logOff();
    // TODO reload page
    this.router.navigate(['']);
  }

}
