import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-resource-print]',
  templateUrl: './resource-print.component.html',
  styleUrls: ['./resource-print.component.css']
})
export class ResourcePrintComponent implements OnInit {
  @Input() path: string = '';

  constructor() { }

  ngOnInit() {
  }

}
