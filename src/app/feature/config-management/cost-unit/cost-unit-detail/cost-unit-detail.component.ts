import {ChangeDetectorRef,  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PlaceService } from 'src/app/core/service/place.service';

@Component({
  selector: 'agri-cost-unit-detail',
  templateUrl: './cost-unit-detail.component.html',
  styleUrls: ['./cost-unit-detail.component.scss']
})
export class CostUnitDetailComponent implements OnInit {
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
    this.formCreateCa.disable();
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
      cost: data.cost + " VNĐ",
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
      status: data.status ? "Hoạt động" : "Không hoạt động"
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


  getStatus(): void{
    this.statusL = [{name: 'Hoạt động', code: 1} , {name: 'Không hoạt động', code: 0}];
    this.cdr.detectChanges();
  }
 
}
