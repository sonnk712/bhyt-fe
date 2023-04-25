import { MenuModule } from 'primeng/menu';
import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { NavModule } from '../shared/nav/nav.module';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeatureComponent } from './feature.component';


@NgModule({
  declarations: [
    FeatureComponent,
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    NavModule,
    ButtonModule,
    MenuModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeatureModule { }
