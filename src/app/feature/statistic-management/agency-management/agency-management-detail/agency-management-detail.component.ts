import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';
import { Field } from 'src/app/core/model/agency';
import { FileInfo } from 'src/app/core/model/media';
import { Country, DistrictCombobox, DistrictComboboxRequest, ProvinceCombobox, Provine, WardCombobox, WardComboboxRequest } from 'src/app/core/model/place';
import { AgencyService } from 'src/app/core/service/agency.service';
import { PlaceService } from 'src/app/core/service/place.service';
import { FileItem } from 'src/app/shared/model/file-item';

@Component({
  selector: 'agri-agency-management-detail',
  templateUrl: './agency-management-detail.component.html',
  styleUrls: ['./agency-management-detail.component.scss']
})
export class AgencyManagementDetailComponent implements OnInit {
  formCreateAgency!: FormGroup;
  isShowLoading = false;
  cities: ProvinceCombobox[] = [];
  districts: DistrictCombobox[] = [];
  wards : WardCombobox[] = [];

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
      this.getDetail(params.params.id);
    });
    this.formCreateAgency.disable();
  }

  initFormCreateAgency(): void {
    this.formCreateAgency = this.fb.group({
      code: [''],
      name: [''],
      receivingPlace: [''],
      person: [''],
      phoneNumber: [''],
      address: [''],
      province: [''],
      district: [''],
      ward: [''],
      status: [''],
      updatedDate: [''],
      createdDate: ['']
    });
  }

  getDetail(id: string): any {
    this.agencyService.detailAgency(id).subscribe((res: any) => {
      if (res && res.code === 1) {
        console.log(res.data)
        this.getValueForm(res.data);
      }
    });

  }
  
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
  
  // gán dữ liệu detail vào form
  getValueForm(data: any): any {
    this.formCreateAgency.patchValue({
      code: data.code,
      name: data.name,
      receivingPlace: data.receivingPlace,
      person: data.person,
      phoneNumber: data.phoneNumber,
      address: data.address,
      district: data.district.fullName,
      ward: data.ward.fullName,
      province: data.province.fullName,
      status: data.status ? "Hoạt động" : "Không hoạt động",
      createdDate: data.createdDate,
      updatedDate: data.updatedDate,
    })
    this.cdr.detectChanges();
  }

}
