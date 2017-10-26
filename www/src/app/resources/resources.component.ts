import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  resources: any[] = [];

  constructor(private httpSrv: HttpService) { }

  ngOnInit() {
    this.httpSrv
      .send('/resources')
      .then(result => {
        this.resources = result;
      })
      .catch(error => console.log(error));
  }

}
