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

import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BasicSideBar, IDataFlowMainComponent} from '../common/basic.form.component';
import {TISService} from '../common/tis.service';


//  @ts-ignore
// import {} from 'ng-sidebar';
// import {Droppable} from '@shopify/draggable';
// @ts-ignore
// import { Graph } from '@antv/g6';
// @ts-ignore
// @ts-ignore

// @ts-ignore
// import * as $ from 'jquery';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/lib/codemirror.css';
import {EditorConfiguration, fromTextArea} from 'codemirror';
import {WorkflowAddComponent} from "./workflow.add.component";
import {NzModalService} from "ng-zorro-antd";


@Component({
  template: `
      <div>
          <sidebar-toolbar (close)="_closeSidebar()"
                           (save)="_saveClick()" (delete)="_deleteNode()"></sidebar-toolbar>

          <form class="clear" nz-form [nzLayout]="'vertical'" >

              <p class="item-head"><label>主表</label></p>

              <div>
                  <nz-select style="width: 100%;" [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose">
                      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
                      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
                      <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled></nz-option>
                  </nz-select>
              </div>

              <p class="item-head"><label>内嵌表</label></p>

              <div>

                  <nz-select
                          [nzMaxTagCount]="3"
                          [nzMaxTagPlaceholder]="tagPlaceHolder"
                          style="width: 100%"
                          nzMode="multiple"
                          nzPlaceHolder="请选择"
                          [(ngModel)]="listOfSelectedValue">
                      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
                  </nz-select>

              </div>

              <p class="item-head"><label>主键</label></p>

              <div>


              </div>


              <p class="item-head"><label>SQL</label></p>
              <div id="sqleditorBlock">
                  <textarea #sqleditor name="code-html"></textarea>
              </div>

          </form>

      </div>

  `,

  styles: [
      `
          .CodeMirror {
              width: 100%;
              height: 600px;
              border: #2f2ded;
          }

          .item-head {
              margin: 20px 0px 0px 0px;
          }

          #sqleditorBlock {
              width: 100%;
          }

          .clear {
              clear: both;
          }
    `]
})
// JOIN 节点设置
export class WorkflowAddNestComponent
  extends BasicSideBar implements OnInit, AfterContentInit, AfterViewInit {


  @ViewChild('sqleditor', {static: false}) sqleditor: ElementRef;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions: any[] = [];
  selectedValue: any;
  tagPlaceHolder: any;
  listOfSelectedValue: any;

  constructor(tisService: TISService, //
              modalService: NzModalService) {
    super(tisService, modalService);
  }

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({label: i.toString(36) + i, value: i.toString(36) + i});
    }
    this.listOfOption = children;
  }


  ngAfterViewInit(): void {
    let sqlmirror = fromTextArea(this.sqleditor.nativeElement, this.sqleditorOption);
    // sqlmirror.setSize('100%', '100%');
    sqlmirror.setValue("select * from mytable;");
  }

  ngAfterContentInit(): void {
  }

  private get sqleditorOption():
    EditorConfiguration {
    return {
      mode: "text/x-hive",
      lineNumbers: true,
    };
  }

  // 执行保存流程
  subscribeSaveClick(graph: any, $: any, nodeid: any, _: IDataFlowMainComponent): void {

  }

  initComponent(_: IDataFlowMainComponent): void {
  }


  _deleteNode() {
  }
}





