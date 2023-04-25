import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigManagementRoutingModule } from './config-management-routing.module';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ConfigManagementRoutingModule
  ],
  providers: [ConfirmationService],
})
export class ConfigManagementModule { }
