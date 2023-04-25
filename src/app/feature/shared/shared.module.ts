import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RaStatusDisplayComponent} from "./ra-status-display/ra-status-display.component";

@NgModule({
  declarations: [RaStatusDisplayComponent],
  imports: [
    CommonModule
  ],
  exports: [RaStatusDisplayComponent]
})
export class SharedModule { }
