import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {TitleService} from "../../Services/title.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest'


@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css']
})
export class ResourceItemComponent implements OnInit {
  private params: object = {};
  private sub: any;

  constructor(
    private titleSrv: TitleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // TODO erreur subscribe
    this.sub = this.route.params.subscribe(params => {
      this.titleSrv.append(params['item']);
      this.params = this.route.snapshot.queryParams;
    });

    /*
    Observable.combineLatest(this.route.params, this.route.queryParams,(params, qparams) => ({ params, qparams }))
      .subscribe( ap => {
        this.params = ap.qparams;
      });
     */
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
