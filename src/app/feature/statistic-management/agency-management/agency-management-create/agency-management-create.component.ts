import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { AgencyRequestV2, Field } from 'src/app/core/model/agency';
import { FileInfo } from 'src/app/core/model/media';
import { Country, DistrictCombobox, DistrictComboboxRequest, ProvinceCombobox, Provine, WardCombobox, WardComboboxRequest } from 'src/app/core/model/place';
import { AgencyService } from 'src/app/core/service/agency.service';
import { PlaceService } from 'src/app/core/service/place.service';
import { FileItem } from 'src/app/shared/model/file-item';


@Component({
  selector: 'agri-agency-management-create',
  templateUrl: './agency-management-create.component.html',
  styleUrls: ['./agency-management-create.component.scss']
})
export class AgencyManagementCreateComponent implements OnInit {
  formCreateAgency!: FormGroup;
  isShowLoading = false;
  cities: ProvinceCombobox[] = [];
  districts: DistrictCombobox[] = [];
  wards : WardCombobox[] = [];

  idAgencyManagement: string = '';
  
  constructor(private fb: FormBuilder,
    private placeService: PlaceService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private agencyService: AgencyService,
    private messageService: MessageService,
  ) {
    this.initFormCreateAgency();
  }

  ngOnInit(): void {
    this.getCities();
    this.route.paramMap.subscribe((params: any) => {
      this.idAgencyManagement = params.params.id;
      if (this.idAgencyManagement && this.idAgencyManagement !== '') {
        this.getDetail(this.idAgencyManagement);
      }
    });
  }

  initFormCreateAgency(): void {
    this.formCreateAgency = this.fb.group({
      code: [''],
      name: [''],
      receivingPlace: [''],
      person: [''],
      phoneNumber: [''],
      address: [''],
      provinceList: [''],
      districtList: [''],
      wardList: [''],
    });
  }

  // bắt lỗi formCreateAgency
  hasErrorInput(controlName: string, errorName: string): boolean {
    const control = this.formCreateAgency.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && control.hasError(errorName);
  }

  // lấy data tỉnh/thành phố từ server
  getCities(): void {
    this.placeService.getProvinceV2().subscribe(res => {
      if (res.code === 1) {
        this.cities = res.data;
        console.log(this.cities)
        this.cdr.detectChanges()
      } else {
        this.cities = [];
      }
    }, () => { });
  }

  getWardFromDistricts(): void {
    const fSearch = this.formCreateAgency.value;
    const request : WardComboboxRequest = {
      districtCode : fSearch.districtList.code ? fSearch.districtList.code : '',
    }
    this.placeService.getWardFromDistrict(request).subscribe(res => {
      if (res.code === 1) {
        this.wards = res.data;
        this.cdr.detectChanges();
      } else {
        this.cities = [];
      }
    }, () => { });
  }

  getDistrictFromCities(): void {
    const fSearch = this.formCreateAgency.value;
    const request : DistrictComboboxRequest = {
      provinceCode : fSearch.provinceList.code ? fSearch.provinceList.code : '',
    }
    console.log(request)

    this.placeService.getDistrictFromCity(request).subscribe(res => {
      if (res.code === 1) {
        this.districts = res.data;
        console.log(this.districts)
        this.cdr.detectChanges();
      } else {
        this.cities = [];
      }
    }, () => { });
  }

  // tạo mới agency
  createAgency(): any {
    this.formCreateAgency.markAllAsTouched();
    if (this.formCreateAgency.invalid) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'Vui lòng nhập đủ thông tin bắt buộc.' });
      return;
    }
    const formValueCreate = this.formCreateAgency.value

    const request: AgencyRequestV2 = {
      code: formValueCreate.code,
      name: formValueCreate.name,
      receivingPlace: formValueCreate.receivingPlace,
      person: formValueCreate.person,
      phoneNumber: formValueCreate.phoneNumber,
      address: formValueCreate.address,
      districtCode: formValueCreate.districtList.code,
      wardCode: formValueCreate.wardList.code,
    }

    console.log(request)
    this.agencyService.createAgencyV2(request).subscribe((res: any) => {
      if (res && res.message === 'Thành công') {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Thêm mới đại lý thành công' });
        void this.router.navigate(['/statistic/agency-management']);
      }
    })
  }

  // lấy detail đại lý về
  getDetail(id: string): any {
    this.agencyService.detailAgency(id).subscribe((res: any) => {
      if (res && res.data) {
        this.getValueForm(res.data);
      }
    });

  }

  // gán dữ liệu detail vào form
  getValueForm(data: any): any {
    this.formCreateAgency.patchValue({
      managementAgent: {
        id: data.id,
        code: data.code,
        label: data.name,
      }
    })
    this.cdr.detectChanges();
  }

}
