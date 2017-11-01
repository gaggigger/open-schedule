import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-resource-calendar]',
  templateUrl: './resource-calendar.component.html',
  styleUrls: ['./resource-calendar.component.css']
})
export class ResourceCalendarComponent implements OnInit {
  @Input() path: string = '';

  constructor() { }

  ngOnInit() {
  }

}
