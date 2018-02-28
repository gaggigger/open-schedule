import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChoiceListService} from "../Services/choicelist.service";

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
  @Output() onChange = new EventEmitter<any>();

  private choiceLists: Array<object> = [];

  constructor(
    private choicelistService: ChoiceListService
  ) { }

  ngOnInit() {
    console.log(this.choice);
    this.choicelistService.get(this.fieldParameters['choicelist_item']).then(items => {
      this.choiceLists = items;
    });
  }

  isChecked(code) {
    return this.choice.indexOf(code) !== -1;
  }

  getSelectedChoiceLists() {
    return this.choiceLists.filter(item => this.choice.indexOf(item['code']) !== -1);
  }

  change(selectDom) {
    this.onChange.emit({
      id : this.itemData['id'],
      item: this.fieldParameters,
      data: {
        selected: Object.values(selectDom.options)
          .filter(item => item['selected'])
          .map(item => item.value)
      }
    });

    /*
    for (var i = 0; i < selectDom.options.length; i++) {
      var optionElement = selectDom.options[i];
      var optionModel = this.myOptions[i];

      if (optionElement.selected == true) { optionModel.selected = true; }
      else { optionModel.selected = false; }
    }

    */
  }

}
