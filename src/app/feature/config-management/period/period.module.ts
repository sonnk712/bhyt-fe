import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeriodRoutingModule } from './period-routing.module';
import { PeriodCreateComponent } from './period-create/period-create.component';
import { PeriodUpdateComponent } from './period-update/period-update.component';
import { PeriodListComponent } from './period-list/period-list.component';
import { PeriodDetailComponent } from './period-detail/period-detail.component';
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
  declarations: [PeriodCreateComponent, PeriodUpdateComponent, PeriodListComponent, PeriodDetailComponent],
  imports: [
    CommonModule,
    PeriodRoutingModule,
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
export class PeriodModule { }
