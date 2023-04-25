import {ChangeDetectorRef,  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CaInformation } from 'src/app/core/model/certificate-authority';
import { Country } from 'src/app/core/model/place';
import { CaService } from 'src/app/core/service/ca.service';
import { PlaceService } from 'src/app/core/service/place.service';


@Component({
  selector: 'agri-cost-unit-create',
  templateUrl: './cost-unit-create.component.html',
  styleUrls: ['./cost-unit-create.component.scss']
})
export class CostUnitCreateComponent implements OnInit {

  formCreateCa!: FormGroup;
  isShowLoading = false;
  status: any[] = [];
  listCa: CaInformation[] = [];
 

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
  }

  initFormCreateCa(): void {
    this.formCreateCa = this.fb.group({
      code: ['', [Validators.required, Validators.maxLength(255)]],
      name: ['', [Validators.required, Validators.maxLength(255)]],
      cost: ['', [Validators.required, Validators.maxLength(255)]],
      status: ['', [Validators.required, Validators.maxLength(255)]],
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
    this.status = [{name: 'Hoạt động', code: 1} , {name: 'Không hoạt động', code: 0}];
    this.cdr.detectChanges();
  }

// tạo mới agency
  createCa(): any {
    this.formCreateCa.markAllAsTouched();
    if (this.formCreateCa.invalid) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'Vui lòng nhập đủ thông tin bắt buộc.' });
      return;
    }
    const formValueCreate = this.formCreateCa.getRawValue();
    const formAg = {
      code: formValueCreate.code,
      name: formValueCreate.name,
      cost: formValueCreate.cost,
      status: formValueCreate.status.code
    }
    console.log(formAg)
    this.placeService.costUnitCreate(formAg).subscribe((res: any) => {
      if (res && res.message === 'Thành công') {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Thêm mới đại lý thành công' });
        void this.router.navigate(['/config/cost-unit/']);
      }
    })
  }

}
