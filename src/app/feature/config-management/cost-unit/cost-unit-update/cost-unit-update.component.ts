import {ChangeDetectorRef,  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { da } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { CaInformation } from 'src/app/core/model/certificate-authority';
import { Country } from 'src/app/core/model/place';
import { CaService } from 'src/app/core/service/ca.service';
import { PlaceService } from 'src/app/core/service/place.service';
@Component({
  selector: 'agri-cost-unit-update',
  templateUrl: './cost-unit-update.component.html',
  styleUrls: ['./cost-unit-update.component.scss']
})
export class CostUnitUpdateComponent implements OnInit {

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
    this.placeService.costUnitDetail(id).subscribe((res: any) => {
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
      cost: data.cost,
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
      cost: ['', [Validators.required, Validators.maxLength(255)]],
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
      cost: formValueCreate.cost,
      status: formValueCreate.status.code
    }
    console.log(formAg)
    this.placeService.costUnitUpdate(formAg).subscribe((res: any) => {
      if (res && res.message === 'Thành công') {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Chỉnh sửa thời hạn thành công' });
        void this.router.navigate(['/config/cost-unit/']);
      }
    })
  }

}
