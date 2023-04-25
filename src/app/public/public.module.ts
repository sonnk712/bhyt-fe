import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        ButtonModule
    ]
})
export class PublicModule { }
