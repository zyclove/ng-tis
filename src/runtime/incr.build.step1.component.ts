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

import {AfterContentInit, Component, EventEmitter, Input, Output} from "@angular/core";
import {TISService} from "../common/tis.service";
import {AppFormComponent, CurrentCollection} from "../common/basic.form.component";

import {ActivatedRoute} from "@angular/router";
import {EditorConfiguration} from "codemirror";
import {Descriptor, Item, PluginSaveResponse, SavePluginEvent} from "../common/tis.plugin";
import {NzModalService} from "ng-zorro-antd/modal";
import {IndexIncrStatus} from "./misc/RCDeployment";

@Component({
  template: `
      <tis-steps type="createIncr" [step]="0"></tis-steps>
      <tis-page-header [showBreadcrumb]="false" [result]="result">
          <nz-affix [nzOffsetTop]="10">
              <button nz-button nzType="primary" (click)="createIndexStep1Next()" [nzLoading]="this.formDisabled"><i nz-icon nzType="save" nzTheme="outline"></i>保存&下一步</button>
              &nbsp;
              <button nz-button nzType="default" (click)="cancelStep()">取消</button>
          </nz-affix>
      </tis-page-header>
      <nz-spin nzSize="large" [nzSpinning]="formDisabled">
          <tis-plugins [savePlugin]="savePlugin" [plugins]="this.plugins" (afterSave)="buildStep1ParamsSetComponentAjax($event)"></tis-plugins>
      </nz-spin>
  `
})
export class IncrBuildStep1ExecEngineSelectComponent extends AppFormComponent implements AfterContentInit {
  plugins = [{name: 'incr-config', require: true}];
  savePlugin = new EventEmitter<SavePluginEvent>();

  @Output() nextStep = new EventEmitter<any>();
  @Output() preStep = new EventEmitter<any>();

  @Input() dto: IndexIncrStatus;

  constructor(tisService: TISService, route: ActivatedRoute, modalService: NzModalService) {
    super(tisService, route, modalService);
  }

  protected initialize(app: CurrentCollection): void {
  }

  ngAfterContentInit(): void {
  }

  buildStep1ParamsSetComponentAjax(event: PluginSaveResponse) {
    if (event.saveSuccess) {
      // 成功
      // let url = '/coredefine/corenodemanage.ajax?event_submit_do_save_script_meta=y&action=core_action';
      //  this.jsonPost(url, {}).then((r) => {
      //    if (r.success) {
      // r.bizresult;
      // this.compileAndPackageIncr();
      this.nextStep.emit(this.dto);
      //  console.log("ddddddddddddd");
      //   }
      // });
    }
  }

  createIndexStep1Next() {
    let e = new SavePluginEvent();
    e.notShowBizMsg = true;
    this.savePlugin.emit(e);
  }

  cancelStep() {

  }
}

@Component({
  template: `
      <tis-steps type="createIncr" [step]="1"></tis-steps>
      <tis-page-header [showBreadcrumb]="false" [result]="result">
          <tis-header-tool>
          </tis-header-tool>
      </tis-page-header>
      <nz-spin nzSize="large" [nzSpinning]="formDisabled">
          <nz-tabset [nzTabBarExtraContent]="extraTemplate" [(nzSelectedIndex)]="tabSelectIndex">
              <nz-tab nzTitle="配置" (nzDeselect)="configDeSelect($event)">
                  <ng-template nz-tab>
                      <tis-plugins [savePlugin]="savePlugin" [plugins]="this.plugins" (afterSave)="buildStep1ParamsSetComponentAjax($event)" #buildStep1ParamsSetComponent></tis-plugins>
                  </ng-template>
              </nz-tab>
              <!--              <nz-tab nzTitle="执行脚本">-->
              <!--                  <ng-template nz-tab>-->
              <!--                      <div style="height: 800px">-->
              <!--                          <tis-codemirror name="schemaContent" [(ngModel)]="dto.incrScriptMainFileContent" [config]="codeMirrorCfg"></tis-codemirror>-->
              <!--                      </div>-->
              <!--                  </ng-template>-->
              <!--              </nz-tab>-->
          </nz-tabset>
          <ng-template #extraTemplate>
              <nz-affix [nzOffsetTop]="10">
                  <button nz-button nzType="default" (click)="createIndexStepPre()"><i nz-icon nzType="backward" nzTheme="outline"></i>上一步</button>&nbsp;
                  <button nz-button nzType="primary" (click)="createIndexStep1Next()" [nzLoading]="this.formDisabled"><i nz-icon nzType="save" nzTheme="outline"></i>保存&下一步</button>
                  &nbsp;
                  <button nz-button nzType="default" (click)="cancelStep()">取消</button>
              </nz-affix>
          </ng-template>
      </nz-spin>
  `,
  styles: [
      ` nz-step {
          margin: 20px;
      }
    `
  ]
})
export class IncrBuildStep1Component extends AppFormComponent implements AfterContentInit {
  // private _incrScript: string;
  @Output() nextStep = new EventEmitter<any>();
  @Output() preStep = new EventEmitter<any>();
  @Input() dto: IndexIncrStatus;
  plugins = [{
    name: 'mq', require: true
    , descFilter: (desc: Descriptor) => {
      let tt = desc.extractProps['targetType'];
      return tt === 'all' || this.dto.readerDesc.endType === tt;
    }
  }, {
    name: 'sinkFactory', require: true, descFilter: (desc: Descriptor) => {
      let tt = desc.extractProps['targetType'];
      return tt === 'all' || this.dto.writerDesc.endType === tt;
    }
  }];

  savePlugin = new EventEmitter<SavePluginEvent>();
  tabSelectIndex = 0;
  // private configParamForm: FormGroup;

  // @ViewChild('buildStep1ParamsSetComponent', {static: false}) buildStep1ParamsSetComponent: IncrBuildStep1ParamsSetComponent;

  constructor(tisService: TISService, route: ActivatedRoute, modalService: NzModalService) {
    super(tisService, route, modalService);
  }

  ngOnInit(): void {
    // console.log(this.dto);
    if (!this.dto.k8sPluginInitialized) {
      // this.plugins.push({name: 'incr-config', require: true});
    }
    super.ngOnInit();
  }

  tabChange(index: number) {

  }

  configDeSelect(e: void) {
    // this.configParamForm = this.buildStep1ParamsSetComponent.validateForm;
    // console.log(configParamForm.invalid);
  }

  // get incrScript(): string {
  //   return this._incrScript;
  // }
  //
  // set incrScript(value: string) {
  //   this._incrScript = value;
  // }


  protected initialize(app: CurrentCollection): void {
  }

  ngAfterContentInit(): void {
  }

  createIndexStep1Next() {
    // if (this.tabSelectIndex === 0) {
    // 当前正在 '配置' tab
    let e = new SavePluginEvent();
    e.notShowBizMsg = true;
    this.savePlugin.emit(e);
    // } else {
    // 当前正在 '执行脚本' tab
    // this.compileAndPackageIncr();
    // }
  }

  private compileAndPackageIncr() {
    let url = '/coredefine/corenodemanage.ajax?emethod=compileAndPackage&action=core_action';
    this.jsonPost(url, {}).then((result) => {
      if (result.success) {
        // 执行编译打包
        this.nextStep.emit(this.dto);
      } else {
        let errFields = result.errorfields;
        if (errFields.length > 0) {
          let errFieldKey = "incr_script_compile_error";
          let item: Item = Item.create([errFieldKey]);
          Item.processErrorField(errFields[0], [item]);
          if ("error" === item.vals[errFieldKey].error) {
            this.tabSelectIndex = 1;
          }
        }
      }
    });
  }

  cancelStep() {
  }

  buildStep1ParamsSetComponentAjax(event: PluginSaveResponse) {

    if (event.saveSuccess) {
      this.nextStep.emit(this.dto);
    }

    setTimeout(() => {
      this.formDisabled = event.formDisabled;
    })
  }

  createIndexStepPre() {
    this.preStep.emit(this.dto);
  }
}
