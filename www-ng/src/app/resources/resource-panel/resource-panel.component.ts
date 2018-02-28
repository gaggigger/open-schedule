import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-resource-panel',
  templateUrl: './resource-panel.component.html',
  styleUrls: ['./resource-panel.component.css']
})
export class ResourcePanelComponent implements OnChanges {
  @Input() panelFeatures: Array<object> = [];
  @Input('selectedItems') selectedItems: Array<object> = [];
  @Output() onInfoChange = new EventEmitter<Array<object>>();

  constructor() { }

  ngOnChanges() {

  }
  infoChange(data) {
    this.onInfoChange.emit(data);
  }
}
