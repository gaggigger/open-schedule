import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-resourcesmenu',
  templateUrl: './resourcesmenu.component.html',
  styleUrls: ['./resourcesmenu.component.css']
})
export class ResourcesmenuComponent implements OnInit {
  title : string = 'OpenSchedule'

  constructor(private httpSrv: HttpService) { }

  ngOnInit(): void {
    this.httpSrv
      .send(environment.API_URL + '/resources')
      .then(result => {
        console.log(result)
      })
      .catch(error => console.log(error));
  }

}
