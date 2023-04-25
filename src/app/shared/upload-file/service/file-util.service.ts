import { Injectable } from '@angular/core';

@Injectable()
export class FileUtilService {

  checkValidFiles(files: FileList, maxFiles: number, fileExtension: string, maxSize: number): string[] {
    const errors = [];
    if (files.length > maxFiles) {
      errors.push('Vượt quá số lượng cho phép');
    } else {
      const extensions = (fileExtension.split(','))
        .map(function(x) { return x.toLocaleUpperCase().trim(); });
      for (let i = 0; i < files.length; i++) {
        const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
        const exists = extensions.indexOf('.' + ext);
        if (exists === -1) {
          errors.push('File không đúng định dạng');
        }
        const fileSizeInMB = files[i].size / (1024 * 1000);
        const sizeFile = Math.round(fileSizeInMB * 100) / 100;
        if (sizeFile > maxSize) {
          errors.push('File vượt quá dung lượng cho phép');
        }
      }
    }

    return errors;
  }
}
