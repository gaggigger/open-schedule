import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-choicelist',
  templateUrl: './choicelist.component.html',
  styleUrls: ['./choicelist.component.css']
})
export class ChoicelistComponent implements OnInit {
  @Input() fieldParameters: object = {};
  @Input() readonly = true;
  @Input() choice: Array<string> = [];
  @Input() itemData: object = {};

  constructor() { }

  ngOnInit() {
    console.log(this.fieldParameters);
    console.log(this.itemData);
  }

}
