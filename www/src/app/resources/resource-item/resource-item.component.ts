import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {TitleService} from "../../Services/title.service";
import 'rxjs/add/observable/combineLatest'
import {HttpService} from "../../Services/http.service";


@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent implements OnInit {
  private gridColumn: string = '';
  private gridData: string = '';
  private panelFeatures: Array<object> = [];
  private selectedItems: Array<object> = [];
  private sub: any;

  constructor(
    private titleSrv: TitleService,
    private route: ActivatedRoute,
    private router: Router,
    private httpSrv: HttpService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.httpSrv
        .get(this.router.url)
        .then(result => {
          this.titleSrv.append(result.information.name);

          this.panelFeatures = result.features;
          this.selectedItems = [];

          this.gridColumn = result.grid.columns;
          this.gridData = result.grid.data;
        })
        .catch(error => console.error(error));
    });
  }

  gridSelection(sel) {
    this.selectedItems = sel;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
