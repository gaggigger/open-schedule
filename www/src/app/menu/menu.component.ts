import { Component, OnInit } from '@angular/core';
import { HttpService } from '../Services/http.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title : string = 'OpenSchedule'

  constructor(private httpSrv: HttpService) { }

  ngOnInit(): void {
    this.httpSrv
      .send('/resources/menu')
      .then(result => {
        //console.log(result)
      })
      .catch(error => console.log(error));
  }

}
