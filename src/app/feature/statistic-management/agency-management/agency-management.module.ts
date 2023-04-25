import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyManagementRoutingModule } from './agency-management-routing.module';
import { AgencyManagementListComponent } from './agency-management-list/agency-management-list.component';
import { CardModule } from 'primeng/card';
import { IndicatorModule } from 'src/app/shared/indicator/indicator.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputOptModule } from 'src/app/shared/input-opt/input-opt.module';
import { TreeTableModule } from 'primeng/treetable';
import { AgencyManagementCreateComponent } from './agency-management-create/agency-management-create.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { AgencyManagementUpdateComponent } from './agency-management-update/agency-management-update.component';
import { AgencyManagementDetailComponent } from './agency-management-detail/agency-management-detail.component';
import { UploadFileModule } from 'src/app/shared/upload-file/upload-file.module';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    AgencyManagementListComponent,
    AgencyManagementCreateComponent,
    AgencyManagementUpdateComponent,
    AgencyManagementDetailComponent,
  ],
  imports: [
    CommonModule,
    CardModule,
    AgencyManagementRoutingModule,
    IndicatorModule,
    ReactiveFormsModule,
    InputTextModule,
    ContextMenuModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    TooltipModule,
    CheckboxModule,
    InputTextareaModule,
    InputOptModule,
    TreeTableModule,
    RadioButtonModule,
    TreeSelectModule,
    UploadFileModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
})
export class AgencyManagementModule { }
