import {Injectable} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        control.markAsTouched();
      }
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}
