/**
 * Copyright (c) 2020 QingLang, Inc. <baisui@qlangtech.com>
 * <p>
 *   This program is free software: you can use, redistribute, and/or modify
 *   it under the terms of the GNU Affero General Public License, version 3
 *   or later ("AGPL"), as published by the Free Software Foundation.
 * <p>
 *  This program is distributed in the hope that it will be useful, but WITHOUT
 *  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE.
 * <p>
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {TISService} from '../common/tis.service';
import {RouterOutlet, ActivatedRoute, Params, Router} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {AppFormComponent, CurrentCollection} from '../common/basic.form.component';

import {NzModalService, NzNotificationService} from "ng-zorro-antd";


@Component({
  template: `
      <my-navigate [core]="this.currentApp"></my-navigate>
      <nz-layout class="main-layout">
          <nz-sider [nzWidth]="150" [nzTheme]="'light'">
              <ul nz-menu nzMode="inline">
                  <li nz-menu-item nzMatchRouter nzMatchRouterExact>
                      <a [routerLink]="['./']">
                          <i class="fa fa-tachometer fa-2x" aria-hidden="true"></i>主控台</a>
                  </li>
                  <li nz-menu-item nzMatchRouter>
                      <a routerLink="./config"><i class="fa fa-plug fa-2x" aria-hidden="true"></i>配置</a>
                  </li>

                  <li nz-menu-item nzMatchRouter>
                      <a routerLink="./app_build_history" ><i aria-hidden="true" class="fa fa-cog fa-2x"></i>构建</a>
                  </li>
                  <li nz-menu-item nzMatchRouter>
                      <a routerLink="./incr_build">
                          <i aria-hidden="true" class="fa fa-truck fa-2x"></i>实时同步</a>
                  </li>
<!--                  <li nz-menu-item nzMatchRouter>-->
<!--                      <a routerLink="./monitor"><i class="fa fa-bar-chart fa-2x" aria-hidden="true"></i>指标</a>-->
<!--                  </li>-->
                  <li nz-menu-item nzMatchRouter>
                      <a routerLink="./operationlog"><i class="fa fa-pencil fa-2x" aria-hidden="true"></i>操作历史</a>
                  </li>
              </ul>
          </nz-sider>
          <nz-content>
              <router-outlet></router-outlet>
          </nz-content>
      </nz-layout>
      <ng-template #zeroTrigger>
          <i nz-icon nzType="menu-fold" nzTheme="outline"></i>
      </ng-template>

  `,
  styles: [`
      a:link {
          color: black;
      }

      a:visited {
          color: black;
      }

      a:hover {
          color: #0275d8;
      }

      .main-layout {
          height: 92vh;
          clear: both;
      }

      nz-content {
          margin: 0 20px 0 10px;
      }
  `]
})
export class DataxIndexComponent extends AppFormComponent implements OnInit {

  constructor(tisService: TISService, route: ActivatedRoute, modalService: NzModalService, private router: Router) {
    super(tisService, route, modalService);
  }

  protected initialize(app: CurrentCollection): void {
  }

  // isSelected(url: string): boolean {
  //   return this.router.isActive(url, true);
  // }

  ngOnInit(): void {
    super.ngOnInit();
  }

// constructor(tisService: TISService, private router: Router, private route: ActivatedRoute, modalService: NzModalService) {
  //   super(tisService, modalService);
  // }

  // ngOnInit(): void {
  //   this.route.params
  //     .subscribe((params: Params) => {
  //       this.app = new CurrentCollection(0, params['name']);
  //       this.currentApp = this.app;
  //     });
  //  // this.router.isActive()
  //   // this.route.
  // }

// 控制页面上的 业务线选择是否要显示
  // get appSelectable(): boolean {
  //  // return this.tisService.isAppSelectable();
  // }
}
