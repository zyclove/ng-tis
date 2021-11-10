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

import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {TISService} from "../common/tis.service";
import {AppFormComponent, CurrentCollection} from "../common/basic.form.component";

import {ActivatedRoute} from "@angular/router";


import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";

import {K8SReplicsSpecComponent} from "../common/k8s.replics.spec.component";
import {DataXJobWorkerStatus, DataxWorkerDTO} from "../runtime/misc/RCDeployment";
import {SavePluginEvent} from "../common/tis.plugin";

@Component({
  template: `
      <tis-steps [type]="this.dto.processMeta.stepsType" [step]="2"></tis-steps>
      <tis-page-header [showBreadcrumb]="false">
          <tis-header-tool>
              <button nz-button nzType="default" [disabled]="formDisabled" (click)="prestep()">上一步</button>&nbsp;
              <button [disabled]="formDisabled" nz-button nzType="primary" (click)="launchK8SController()"><i nz-icon nzType="rocket" nzTheme="outline"></i>启动</button>
          </tis-header-tool>
      </tis-page-header>
      <h4>K8S基本信息</h4>
      <div class="item-block">
          <tis-plugins [formControlSpan]="20" [shallInitializePluginItems]="false" [plugins]="['datax-worker']" [disabled]="true"
                       [showSaveButton]="false"
                       #pluginComponent></tis-plugins>
      </div>
      <ng-container *ngIf="dto.processMeta.supportK8SReplicsSpecSetter">
          <h4>K8S资源规格</h4>
          <div class="item-block">
              <k8s-replics-spec [rcSpec]="this.dto.rcSpec" [disabled]="true" #k8sReplicsSpec [labelSpan]="3"></k8s-replics-spec>
          </div>
      </ng-container>
  `
  , styles: [
      `
    `]
})
export class DataxWorkerAddStep3Component extends AppFormComponent implements AfterViewInit, OnInit {
  savePlugin = new EventEmitter<any>();
  @ViewChild('k8sReplicsSpec', {read: K8SReplicsSpecComponent, static: true}) k8sReplicsSpec: K8SReplicsSpecComponent;
  @Output() nextStep = new EventEmitter<any>();
  @Output() preStep = new EventEmitter<any>();
  @Input() dto: DataxWorkerDTO;

  constructor(tisService: TISService, route: ActivatedRoute, modalService: NzModalService, notification: NzNotificationService) {
    super(tisService, route, modalService, notification);
  }

  ngOnInit(): void {
    if (this.dto.processMeta.supportK8SReplicsSpecSetter && !this.dto.rcSpec) {
      throw new Error("rcSpec can not be null");
    }
  }

  get currentApp(): CurrentCollection {
    return new CurrentCollection(0, this.dto.processMeta.targetName);
  }
  launchK8SController() {
    let e = new SavePluginEvent();
    e.notShowBizMsg = true;
    this.jsonPost(`/coredefine/corenodemanage.ajax?action=datax_action&emethod=launch_datax_worker&targetName=${this.dto.processMeta.targetName}`
      , {}, e)
      .then((r) => {
        if (r.success) {
          this.successNotify("已经成功在K8S集群中启动" + this.dto.processMeta.pageHeader);
          let dataXWorkerStatus: DataXJobWorkerStatus
            = Object.assign(new DataXJobWorkerStatus(), r.bizresult, {'processMeta': this.dto.processMeta});
          this.nextStep.emit(dataXWorkerStatus);
        }
      });
  }

  protected initialize(app: CurrentCollection): void {
  }

  ngAfterViewInit() {
  }


  prestep() {
    this.preStep.next(this.dto);
  }
}

