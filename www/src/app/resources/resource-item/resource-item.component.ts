import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {TitleService} from "../../Services/title.service";
import 'rxjs/add/observable/combineLatest'
import {HttpService} from "../../Services/http.service";
import {I18nService} from "../../Services/i18n.service";


@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: [
    './resource-item.component.css'
  ]
})
export class ResourceItemComponent implements OnInit {
  public gridColumn: string = '';
  public gridData: string = '';
  public panelFeatures: Array<object> = [];
  public selectedItems: Array<object> = [];
  private sub: any;

  constructor(
    private titleSrv: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private httpSrv: HttpService,
    private i18n: I18nService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.httpSrv
        .get(this.router.url)
        .then(result => {
          //this.titleSrv.append(result.information.name);

          this.panelFeatures = result.features;
          this.selectedItems = [];

          this.gridColumn = result.grid.columns;
          this.gridData = result.grid.data;
        })
        .catch(error => console.error(error));
    });
  }

  gridSelection([data, selected]) {
    let enableEdition = false;
    // New item
    if(! data.id) {
      // New data already in progress
      if(this.selectedItems.filter(item => ! item['data']['id']).length > 0) {
        //return;
      }
      data.name = this.i18n.trans('New *');
      enableEdition = true;
    }


    if(selected) this.selectedItems.push({
      enableEdition : enableEdition,
      data: data
    });
    else this.selectedItems = this.selectedItems.filter(
      item => item['data']['id'] !== data.id
    );
    this.selectedItems = this.selectedItems.slice();
  }

  infoChange(data) {
    // 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
