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

import {Component, OnInit, Input, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';

import {TISService} from '../common/tis.service';
import {BasicFormComponent} from '../common/basic.form.component';
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";

declare var jQuery: any;

@Component({
  // templateUrl: '/runtime/jarcontent/file_compare_result.htm'
  template: `
      <fieldset [disabled]='formDisabled'>

          <tis-page-header [showBreadcrumb]="false">
              <span class="edit-notify" style="background-color:#00FF00;">新增内容</span>
              <span class="edit-notify" style="background-color:pink;text-decoration:line-through;">删除内容</span></tis-page-header>
          <div style="margin-left:10px;">

              <nz-empty *ngIf="!twoSnapshot.hasDifferentRes" [nzNotFoundContent]="contentTpl">
                  <ng-template #contentTpl>
                      <span>两版本没有任何区别</span>
                  </ng-template>
              </nz-empty>
              <div *ngFor="let r of compareResults">
                  <h4>{{r.fileName}}</h4>
                  <tis-compare-result [content]="r"></tis-compare-result>
              </div>
          </div>
      </fieldset>
  `,
  styles: [
      `.edit-notify {
          display: inline-block;
          padding: 5px;
          margin-right: 10px;
          font-size: 20px;
      }`
  ]
})
export class CompareEachOtherComponent extends BasicFormComponent implements OnInit {

  compareResults: any[] = [];
  twoSnapshot: { snapshotId: number, snapshotOtherId: number, hasDifferentRes: boolean } = {snapshotId: 0, snapshotOtherId: 0, hasDifferentRes: true};

  @Input()
  set compareSnapshotId(val: number[]) {
    this.httpPost('/runtime/jarcontent/file_compare_result.ajax'
      , 'event_submit_do_get_compare_result=y&action=snapshot_revsion_action&comparesnapshotid='
      + val[0] + '&comparesnapshotid=' + val[1])
      .then(result => {
        this.compareResults = result.bizresult.results;
        this.twoSnapshot = result.bizresult;
        this.modalRef.getConfig().nzTitle = `版本配置比较 Ver[${this.twoSnapshot.snapshotOtherId}] ~ Ver[${this.twoSnapshot.snapshotId}]`;
      });
  }

  constructor(tisService: TISService, private modalRef: NzModalRef) {
    super(tisService);
  }


  ngOnInit(): void {
    // this.httpPost('/runtime/jarcontent/file_compare_result.ajax'
    //   , 'event_submit_do_get_compare_result=y&action=snapshot_revsion_action&comparesnapshotid='
    //   + this.compareSnapshotId[0] + '&comparesnapshotid=' + this.compareSnapshotId[1])
    //   .then(result => {
    //     this.compareResults = result.bizresult.results;
    //     this.twoSnapshot = result.bizresult;
    //     this.modalRef.getInstance().nzTitle = "dddd";
    //   });


    // this.httpPost('/runtime/jarcontent/file_compare_result.ajax'
    //   , 'event_submit_do_get_compare_result=y&action=snapshot_revsion_action&comparesnapshotid='
    //   + 19874 + '&comparesnapshotid=' + 19866)
    //   .then(result => {
    //     this.compareResults = result.bizresult.results;
    //     this.twoSnapshot = result.bizresult;
    //     this.modalRef.getInstance().nzTitle = `版本配置比较 Ver[${this.twoSnapshot.snapshotOtherId}] ~ Ver[${this.twoSnapshot.snapshotId}]`;
    //   });
  }

}

@Component({
  selector: 'tis-compare-result',
  template: `
      <pre style="border:#000066 solid 3px;margin-left:5px;background-color:#E6E6E6;padding:5px;"></pre>`
})
export class CompareResultComponent {
  constructor(private c: ViewContainerRef) {
  }

  @Input() set content(d: any) {
    // this.c.element.nativeElement.firstChild.innerHTML = 'ddd' ; // d.htmlDiffer;

    jQuery(this.c.element.nativeElement).find(':first-child').html(d.htmlDiffer);
    // console.info( ); // .firstChild.innerHTML =   d.htmlDiffer;

  }
}

