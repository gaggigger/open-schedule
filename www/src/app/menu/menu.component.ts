import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title: string = 'OpenSchedule';
  menus: Array<Object> = [];

  constructor(private httpSrv: HttpService) { }

  ngOnInit(): void {
    this.httpSrv
      .get('/menu')
      .then(result => {
        this.menus = result;
      })
      .catch(error => console.error(error));
  }

}
