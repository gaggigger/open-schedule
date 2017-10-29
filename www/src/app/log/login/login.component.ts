import { Component, OnInit } from '@angular/core';
import {TitleService} from "../../Services/title.service";
import {HttpService} from "../../Services/http.service";
import {Router} from "@angular/router";
import {TokenService} from "../../Services/token.service";
import {NgFor} from "@angular/common";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private titleSrv: TitleService,
    private httpSrv: HttpService,
    private router: Router,
    private token: TokenService
  ) { }

  ngOnInit() {
    if(this.token.logged()) {
      this.router.navigate(['']);
    }
    this.titleSrv.set('Login');
  }

  submit(f: NgForm) {
    if(! f.valid) return false;
    this.httpSrv.post('/login', f.value).then(result => {
      window.location.reload();
    }).catch(error => console.error(error));
  }

}
