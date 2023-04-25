import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputOtpComponent } from './input-otp.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    InputOtpComponent
  ],
  exports: [
    InputOtpComponent
  ],
    imports: [
        CommonModule,
        InputTextModule,
        ButtonModule,
        FormsModule
    ]
})
export class InputOptModule { }
