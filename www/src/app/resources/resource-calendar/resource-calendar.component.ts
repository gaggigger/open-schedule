import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {TokenService} from "../../Services/token.service";

@Component({
  selector: '[app-resource-calendar]',
  templateUrl: './resource-calendar.component.html',
  styleUrls: ['./resource-calendar.component.css']
})
export class ResourceCalendarComponent implements OnChanges {
  @Input() path: string = '';
  private frameurl: string = '#';
  @Input() items: Array<object> = [];

  constructor(
    private token: TokenService
  ) { }

  ngOnChanges() {
    console.log(this.items);
    console.log(JSON.stringify(this.items.map(item => item['data']['id'])));
    this.frameurl = 'assets/module_calendar/index.html?' +
      'path=' + encodeURIComponent(environment.API_URL + this.path) +
      '&resources=' + encodeURIComponent(environment.API_URL + '/resources') +
      '&token=' + encodeURIComponent(this.token.get()) +
      '#items=' + encodeURIComponent(JSON.stringify(this.items.map(item => item['data']['id'])))
    ;
  }

}
