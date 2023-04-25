import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticManagementRoutingModule } from './statistic-management-routing.module';
import { PaymentStatusListComponent } from './payment-status-list/payment-status-list.component';
import { IndicatorModule } from 'src/app/shared/indicator/indicator.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import {TableModule} from "primeng/table";
import { PaginatorModule } from 'primeng/paginator';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [PaymentStatusListComponent],
  imports: [
    CommonModule,
    StatisticManagementRoutingModule,
    SharedModule,
    IndicatorModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    PaginatorModule,
    CardModule,
    ButtonModule,
    CalendarModule, 
  ]
})
export class StatisticManagementModule { }
