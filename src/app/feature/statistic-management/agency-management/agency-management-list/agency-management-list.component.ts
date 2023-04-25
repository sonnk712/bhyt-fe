import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';
import { ConfirmationService, TreeNode, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AgencyInformation, AgencyInformationV2, AgencyRequest, AgencyRequestSearch, AgencyRequestSearchV2, Field } from 'src/app/core/model/agency';
import { DeleteRequest } from 'src/app/core/model/certificate-authority';
import { DistrictCombobox, DistrictComboboxRequest, ProvinceCombobox, Provine, WardCombobox, WardComboboxRequest } from 'src/app/core/model/place';
import { AgencyService } from 'src/app/core/service/agency.service';
import { PlaceService } from 'src/app/core/service/place.service';



@Component({
  selector: 'agri-agency-management-list',
  templateUrl: './agency-management-list.component.html',
  styleUrls: ['./agency-management-list.component.scss']
})
export class AgencyManagementListComponent implements OnInit {
  formSearch: FormGroup;
  cols: any[] = [];
  listAgency: AgencyInformationV2[] = [];
  listAgencyFromServer: AgencyInformationV2[] = [];
  selected: AgencyInformationV2[] = [];
  pageIndex = 0;
  pageSize = 10;
  cities: ProvinceCombobox[] = [];
  districts: DistrictCombobox[] = [];
  wards: WardCombobox[] = [];
  managentAgency: Field[] = [];
  isHidden = false;
  isShowLoading = false;
  destroy = new Subject();
  keyword = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private placeService: PlaceService,
    private cdr: ChangeDetectorRef,
    private agencyService: AgencyService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.formSearch = this.fb.group({
      textSearch: [''],
      provinceList: [''],
      districtList: [''],
      wardList: [''],
      managementList: [''],
      status: 1,
    });
  }


  ngOnInit(): void { 
    this.getCities();
    this.getAllAgency();
    this.formSearch.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy)
    ).subscribe(() => this.getSearchAgency());
  }

  

  nodeSelect(idSelected: string): void {
    void this.router.navigate(['/statistic/agency-management/detail', idSelected]);
  }

  redirectToRegistryAgency(): void {
    this.router.navigate(['/statistic/agency-management/create']);
  }
 
  redirectToUpdate(id: string): void {
    this.router.navigate(['/statistic/agency-management/update', id]);
  }

  logDeleteRow() {
    this.confirmationService.confirm({
      message: 'Vui lòng xác nhận xóa !',
      header: 'Xóa đại lý ?',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.selected.length < 0) {
          return;
        }
        let deleteList: string[] = [];
        this.selected.forEach(res => {
          deleteList.push(res.id);
          console.log(res.id)
        });

        const request: DeleteRequest = {
          listId: deleteList
        }
        if (deleteList.length === 0) {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Danh sách xóa trống' });
          return;
        }
        this.agencyService.delete(request).subscribe((res: any) => {
          if (res.code === 1) {
            this.resetForm();
            this.cdr.detectChanges();
            this.messageService.add({ severity: 'success', summary: '', detail: 'Xóa đại lý thành công' });
          }
        })
      this.selected = []
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Đã hủy !' });
      }
    });

  }

  deleteOne(id: string) {
    this.confirmationService.confirm({
      message: 'Vui lòng xác nhận xóa !',
      header: 'Xóa đại lý ?',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (id === null) {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Danh sách xóa trống' });
          return;
        }
        const request: DeleteRequest = {
          listId: [id]
        }
        this.agencyService.delete(request).subscribe((res: any) => {
          if (res.code === 1) {
            this.resetForm()
            this.cdr.detectChanges();
            this.messageService.add({ severity: 'success', summary: '', detail: 'Xóa đại lý thành công' });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Đã hủy !' });
      }
    });
  }


  // reset lại form search
  resetForm(): void {
    this.formSearch.reset();
    this.getAllAgency();
  }

  // gọi api tỉnh/thành phố từ backend
  getCities(): void {
    this.placeService.getProvinceV2().subscribe(res => {
      if (res.code === 1) {
        this.cities = res.data;
        this.cdr.detectChanges()
      } else {
        this.cities = [];
      }
    }, () => { });
  }
  

  getWardFromDistricts(): void {
    const fSearch = this.formSearch.value;
    const request : WardComboboxRequest = {
      districtCode : fSearch.districtList.code ? fSearch.districtList.code : '',
    }
    this.placeService.getWardFromDistrict(request).subscribe(res => {
      if (res.code === 1) {
        this.wards = res.data;
        this.cdr.detectChanges();
        this.getSearchAgency();
        this.cdr.detectChanges();
      } else {
        this.cities = [];
      }
    }, () => { });
  }

  getDistrictFromCities(): void {

    const fSearch = this.formSearch.value;
    const request : DistrictComboboxRequest = {
      provinceCode : fSearch.provinceList.code ? fSearch.provinceList.code : '',
    }

    this.placeService.getDistrictFromCity(request).subscribe(res => {
      if (res.code === 1) {
        this.districts = res.data;
        this.cdr.detectChanges();
      } else {
        this.cities = [];
      }
    }, () => { });
  }

  // search data từ server vể qua formSearch
  getSearchAgency(): void {
    const fSearch = this.formSearch.value;
    const request: AgencyRequestSearchV2 = {
      textSearch: fSearch.textSearch ? fSearch.textSearch : '',
      districtCode: fSearch.districtList.code ? fSearch.districtList.code : '',
      wardCode : fSearch.wardList.code ? fSearch.wardList.code : '',
    };
    console.log(request)
    this.agencyService.searchV2(request).subscribe(res => {
      if (res.code === 1) {
        this.listAgencyFromServer = res.data;
        this.cdr.detectChanges();
      } else {
        this.listAgencyFromServer = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.listAgencyFromServer = [];
      this.cdr.detectChanges();
    });
  }

  getAllAgency(){
    this.agencyService.getAll().subscribe(res => {
      if (res.code === 1) {
        this.listAgencyFromServer = res.data;
        this.cdr.detectChanges();
      } else {
        this.listAgencyFromServer = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.listAgencyFromServer = [];
      this.cdr.detectChanges();
    });
  }

  onSearch(keyword: any): void{
    this.cdr.detectChanges();
    this.getSearchAgency()
  }

}
