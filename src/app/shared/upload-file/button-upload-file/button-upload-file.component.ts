import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FileItem} from '../../model/file-item';
import {FileUtilService} from '../service/file-util.service';

@Component({
  selector: 'agri-button-upload-file',
  templateUrl: './button-upload-file.component.html',
  styleUrls: ['./button-upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonUploadFileComponent {

  @ViewChild('inputFile', { static: true }) file!: ElementRef;
  @Input() disabled = false;
  @Input() maxFiles = 1;
  @Input() fileExtension = '.jpeg, .jpg, .png, .gif, .ief, .jpe, .jfif, .doc, .docx, .pdf';
  @Input() maxSize = 5; // in MB
  @Input() autoShowSelectedFiles = true;
  @Input() autoDisableAfterSelect = false;
  @Input() selectedFiles: Array<FileItem> = [];
  @Output() changeFile: EventEmitter<FileList> = new EventEmitter<any>();
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();

  errors: Array<string> = [];

  constructor(private service: FileUtilService) {
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.errors = [];
      const files: FileList = event.target.files;
      if (this.isValidFiles(files)) {
        if (this.autoShowSelectedFiles) {
          const temp: FileItem[] = [];
          for (let i = 0; i < files.length; i++) {
            temp.push({
              name: files[i].name,
              canView: false,
              canDownload: false,
              canRemove: true,
              downloadUrl: '',
              downloadTarget: '_blank'
            });
          }
          this.selectedFiles = temp;
        }
        if (this.autoDisableAfterSelect) {
          this.disabled = true;
        }
        this.changeFile.emit(files);
      } else {
        this.clearFile();
      }
    }
  }

  isValidFiles(files: FileList) {
    this.errors = this.service.checkValidFiles(files, this.maxFiles, this.fileExtension, this.maxSize);
    return this.errors.length === 0;
  }

  clearFile() {
    this.file.nativeElement.value = '';
  }

  onRemove(index: number) {
    if (this.autoShowSelectedFiles) {
      this.selectedFiles.splice(index, 1);
      if (this.selectedFiles.length === 0) {
        this.clearFile();
        if (this.autoDisableAfterSelect) {
          this.disabled = false;
        }
      }
    }
    this.remove.emit(index);
  }

}
