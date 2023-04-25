import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import {IndicatorModule} from '../shared/indicator/indicator.module';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';



import { CardModule } from 'primeng/card';
import {OverlayPanelModule} from "primeng/overlaypanel";

import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from "primeng/calendar";
import {ToastModule} from "primeng/toast";
import {GalleriaModule} from "primeng/galleria";
import {InputSwitchModule} from "primeng/inputswitch";
import { TreeTableModule } from 'primeng/treetable';
import { RegistryComponent } from './registry/registry.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistryComponent,
    VerifyComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IndicatorModule,
    ReactiveFormsModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    GalleriaModule,
    InputSwitchModule,
    TreeTableModule,
    CardModule,
    OverlayPanelModule,
    ReactiveFormsModule,
    RadioButtonModule,
    DropdownModule,
    CalendarModule,
    IndicatorModule,
  ]
})
export class AuthModule { }
