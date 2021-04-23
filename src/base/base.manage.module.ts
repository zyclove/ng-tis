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

import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BaseMangeRoutingModule} from "./base.manage-routing.module";
import {ApplistComponent} from "./applist.component";
import {BaseMangeIndexComponent} from "./base.manage.index.component";
import {DepartmentListComponent} from "./department.list.component";
import {AddGlobalParamComponent} from "./global.add.param";
import {GlobalUpdateParamComponent} from "./global.update.param";
import {AddAppFormComponent} from "./addapp-form.component";
import {AddAppStepFlowComponent} from "./addapp.step.flow.component";
import {AddAppFlowDirective} from "./addapp.directive";
import {AddAppDefSchemaComponent} from "./addapp-define-schema.component";
import {SchemaExpertAppCreateEditComponent} from "./schema.expert.create.edit.component";
import {AddAppConfirmComponent} from "./addapp-confirm.component";
import {TisCommonModule} from "../common/common.module";

import {NzStepsModule} from 'ng-zorro-antd/steps';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTabsModule} from 'ng-zorro-antd/tabs';
import {BaseConfigComponent} from "./base-config.component";
import {AddappSelectNodesComponent} from "./addapp-select-nodes.component";
import {DepartmentAddComponent} from "./department.add.component";
import {DataxAddStep1Component} from "./datax.add.step1.component";
import {DataxAddComponent} from "./datax.add.component";
import {DataxAddStep2Component} from "./datax.add.step2.component";
import {DataxAddStep3Component} from "./datax.add.step3.component";
import {DataxAddStep4Component, PluginSubFormComponent} from "./datax.add.step4.component";
import {DataxAddStep5Component} from "./datax.add.step5.component";
import {DataxAddStep6Component} from "./datax.add.step6.maptable.component";
import {DataxAddStep7Component} from "./datax.add.step7.confirm.component";


@NgModule({
  id: 'basemanage',
  imports: [CommonModule, FormsModule, BaseMangeRoutingModule, TisCommonModule, NzStepsModule, NzInputModule, NzButtonModule, NzTabsModule],
  declarations: [
    ApplistComponent, DepartmentAddComponent, BaseMangeIndexComponent, BaseConfigComponent, DepartmentListComponent, AddGlobalParamComponent, GlobalUpdateParamComponent
    , AddAppFormComponent, AddAppStepFlowComponent, AddAppFlowDirective, AddAppDefSchemaComponent, AddAppConfirmComponent, AddappSelectNodesComponent
    , SchemaExpertAppCreateEditComponent, DataxAddStep1Component, DataxAddComponent, DataxAddStep2Component, DataxAddStep3Component, DataxAddStep4Component, PluginSubFormComponent, DataxAddStep5Component, DataxAddStep6Component
    , DataxAddStep7Component
  ],
  entryComponents: [ApplistComponent
    , BaseMangeIndexComponent, DepartmentListComponent, AddGlobalParamComponent
    , GlobalUpdateParamComponent, AddAppFormComponent, AddAppDefSchemaComponent, AddAppConfirmComponent, AddappSelectNodesComponent
    , SchemaExpertAppCreateEditComponent],
  // providers: [TISService,ScriptService]
  exports: [AddAppFlowDirective]
})
export class BasiManageModule {
}
