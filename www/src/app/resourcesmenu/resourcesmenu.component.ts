import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-resourcesmenu',
  templateUrl: './resourcesmenu.component.html',
  styleUrls: ['./resourcesmenu.component.css']
})
export class ResourcesmenuComponent implements OnInit {
  title : string = 'OpenSchedule'

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get(environment.API_URL + 'api/resources').subscribe(data => {
      console.log(data)
      // Read the result field from the JSON response.
      //this.results = data['results'];
    });

  }

}
