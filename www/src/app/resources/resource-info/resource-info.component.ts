import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: '[app-resource-info]',
  templateUrl: './resource-info.component.html',
  styleUrls: ['./resource-info.component.css']
})
export class ResourceInfoComponent implements OnChanges {
  @Input() path: string = '';
  @Input() items: Array<object> = [];

  constructor() { }

  ngOnChanges() {
    console.log(this.path);
    console.log(this.items);
  }


}
