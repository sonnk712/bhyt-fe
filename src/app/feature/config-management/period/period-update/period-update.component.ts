import {ChangeDetectorRef,  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PlaceService } from 'src/app/core/service/place.service';

@Component({
  selector: 'agri-period-update',
  templateUrl: './period-update.component.html',
  styleUrls: ['./period-update.component.scss']
})
export class PeriodUpdateComponent implements OnInit {

  formCreateCa!: FormGroup;
  isShowLoading = false;
  statusL: any[] = [];
  id!: Params;
  
  constructor(
    private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { 
    this.initFormCreateCa();
  }

  ngOnInit(): void {
    this.getStatus(); 
    this.route.paramMap.subscribe((params: any) => {
      this.getDetail(params.params.id);
    });
  }
  
  getDetail(id: string): any {
    this.placeService.periodDetail(id).subscribe((res: any) => {
      if (res && res.code === 1) {
        this.id = res.data.id;
        this.getValueForm(res.data);
      }
    });
  }

  getValueForm(data: any): any {
    console.log(data)
    let oj={
      code: data.code,
      name: data.name,
      month: data.month,
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      status: data.status
    }
    this.formCreateCa.patchValue(oj)
    this.cdr.detectChanges();
  }

  initFormCreateCa(): void {
    this.formCreateCa = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(255)]],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      month: ['', [Validators.required, Validators.maxLength(255)]],
      status: [''],
      createdDate: [''],
      updatedDate: [''],
    });
  }

 // bắt lỗi formCreateAgency
 hasErrorInput(controlName: string, errorName: string): boolean {
    const control = this.formCreateCa.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && control.hasError(errorName);
  }

  getStatus(): void{
    this.statusL = [{name: 'Hoạt động', code: 1} , {name: 'Không hoạt động', code: 0}];
    this.cdr.detectChanges();
  }

  createCa(): any {
    this.formCreateCa.markAllAsTouched();
    if (this.formCreateCa.invalid) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'Vui lòng nhập đủ thông tin bắt buộc.' });
      return;
    }
    const formValueCreate = this.formCreateCa.getRawValue();
    const formAg = {
      id: this.id,
      code: formValueCreate.code,
      name: formValueCreate.name,
      month: formValueCreate.country,
      status: formValueCreate.status.code
    }
    console.log(formAg)
    this.placeService.periodUpdate(formAg).subscribe((res: any) => {
      if (res && res.message === 'Thành công') {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Chỉnh sửa thời hạn thành công' });
        void this.router.navigate(['/config/period/']);
      }
    })
  }

}
