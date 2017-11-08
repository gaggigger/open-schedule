import {Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-resource-panel',
  templateUrl: './resource-panel.component.html',
  styleUrls: ['./resource-panel.component.css']
})
export class ResourcePanelComponent implements OnChanges {
  @Input() panelFeatures: Array<object> = [];
  @Input('selectedItems') selectedItems: Array<object> = [];

  constructor() { }

  ngOnChanges() {
    console.log(this.selectedItems);
  }

}
