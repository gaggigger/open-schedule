import { Component, OnInit } from '@angular/core';
import {HttpService} from "../Services/http.service";
import {TitleService} from "../Services/title.service";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  resources: any[] = [];

  constructor(
    private httpSrv: HttpService,
    private titleSrv: TitleService
  ) { }

  ngOnInit() {
    this.titleSrv.setTitle('Ressources');

    this.httpSrv
      .send('/resources')
      .then(result => {
        this.resources = result;
      })
      .catch(error => console.log(error));
  }

}
