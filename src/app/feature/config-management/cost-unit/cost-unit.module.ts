import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CostUnitRoutingModule } from './cost-unit-routing.module';
import { CostUnitCreateComponent } from './cost-unit-create/cost-unit-create.component';
import { CostUnitUpdateComponent } from './cost-unit-update/cost-unit-update.component';
import { CostUnitDetailComponent } from './cost-unit-detail/cost-unit-detail.component';
import { CostUnitListComponent } from './cost-unit-list/cost-unit-list.component';
import { IndicatorModule } from 'src/app/shared/indicator/indicator.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';
import { MessagesModule } from 'primeng/messages';
import { TabMenuModule } from 'primeng/tabmenu';
import { ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    CostUnitCreateComponent,
    CostUnitUpdateComponent,
    CostUnitDetailComponent,
    CostUnitListComponent,
  ],
  imports: [
    CommonModule,
    CostUnitRoutingModule,
    IndicatorModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    CardModule,
    ButtonModule,
    TooltipModule,
    TreeSelectModule,
    MessagesModule,
    TabMenuModule,
    ConfirmDialogModule
  ]
})
export class CostUnitModule { }
