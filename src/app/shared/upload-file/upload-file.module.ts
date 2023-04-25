import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUploadFileComponent } from './input-upload-file/input-upload-file.component';
import {ButtonModule} from 'primeng/button';
import { ButtonUploadFileComponent } from './button-upload-file/button-upload-file.component';
import {FileUtilService} from './service/file-util.service';
import {GalleriaModule} from "primeng/galleria";



@NgModule({
    declarations: [
        InputUploadFileComponent,
        ButtonUploadFileComponent
    ],
    exports: [
        InputUploadFileComponent,
        ButtonUploadFileComponent
    ],
  imports: [
    CommonModule,
    ButtonModule,
    GalleriaModule
  ],
  providers: [FileUtilService]
})
export class UploadFileModule { }
