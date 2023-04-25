import { DistrictComboboxRequest, PeriodCombobox, PeriodSearchRequest, Province, StatusSearchRequest, TypeSearchRequest, WardCombobox, WardComboboxRequest } from './../../../../core/model/place';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { Subject } from 'rxjs';
import { ProfileInformation, TypeCombobox } from 'src/app/core/model/profile';
import { PlaceService } from 'src/app/core/service/place.service';
import { ProfileService } from 'src/app/core/service/profile.service';


@Component({
  selector: 'agri-revenue-list',
  templateUrl: './revenue-list.component.html',
  styleUrls: ['./revenue-list.component.scss']
})
export class RevenueListComponent implements OnInit {

  formSearch: FormGroup;
  cols: any[] = [];
  listProfileFromServer: ProfileInformation[] = [];
  selected: ProfileInformation[] = [];
  pageIndex = 0;
  pageSize = 10;
  periods: PeriodCombobox[] = [];
  statusL: any;
  types: TypeCombobox[] = [];
  isHidden = false;
  isShowLoading = false;
  destroy = new Subject();
  totalRevenue = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private placeService: PlaceService,
    private cdr: ChangeDetectorRef,
    private profileService: ProfileService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.totalRevenue = 0; 
    this.formSearch = this.fb.group({
      textSearch: [''],
      periodList: [''],
      typeList: [''],
      statusList: [''],
    });
  }

  ngOnInit(): void { 
    
    this.getStatus();
    this.getPeriod();
    this.getType();
    this.getAllProfile();
    // this.formSearch.valueChanges.pipe(
    //   debounceTime(500),
    //   distinctUntilChanged(),
    //   takeUntil(this.destroy)
    // ).subscribe(() => this.getSearchProfile());
  }

  nodeSelect(idSelected: string): void {
    void this.router.navigate(['/statistic/agency-management/detail', idSelected]);
  }

  // reset lại form search
  resetForm(): void {
    this.formSearch.reset();
    this.getAllProfile();
    this.getStatus();
    this.getPeriod();
    this.getType();
    this.totalRevenue = 0;
  }

  getStatus() {
    this.statusL = [
      { name: 'Đã thanh toán', id: 1 },
      { name: 'Chưa thanh toán', id: 0 },
    ]
  }

  getPeriod(): void {
    this.placeService.getPeriod().subscribe(res => {
      if (res.code === 1) {
        this.periods = res.data;
        this.cdr.detectChanges()
      } else {
        this.periods = [];
      }
    }, () => { });
  }

  getType(): void {
    this.placeService.getType().subscribe(res => {
      if (res.code === 1) {
        this.types = res.data;
        this.cdr.detectChanges()
      } else {
        this.periods = [];
      }
    }, () => { });
  }

  // search data từ server vể qua formSearch
  getSearchProfileByPeriod(): void {
    this.types = []
    this.statusL = []
    this.totalRevenue = 0;
    const fSearch = this.formSearch.value;
    const request: PeriodSearchRequest = {
      textSearch: fSearch.textSearch ? fSearch.textSearch : '',
      month: fSearch.periodList ? fSearch.periodList : 0,
    };
    console.log(request)
    this.placeService.searchByPeriod(request).subscribe(res => {
      if (res.code === 1) {
        this.listProfileFromServer = res.data.profileInfo;
        this.totalRevenue = res.data.totalCost;
        this.cdr.detectChanges();
      } else {
        this.listProfileFromServer = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.listProfileFromServer = [];
      this.cdr.detectChanges();
    });
  }

  getSearchProfileByType(): void {
    this.totalRevenue = 0;
    this.periods = []
    this.statusL = []
    const fSearch = this.formSearch.value;
    const request: TypeSearchRequest = {
      textSearch: fSearch.textSearch ? fSearch.textSearch : '',
      id: fSearch.typeList ? fSearch.typeList : ''
    };
    console.log(request)
    this.placeService.searchByType(request).subscribe(res => {
      if (res.code === 1) {
        this.listProfileFromServer = res.data.profileInfo;
        this.totalRevenue = res.data.totalCost;
        this.cdr.detectChanges();
      } else {
        this.listProfileFromServer = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.listProfileFromServer = [];
      this.cdr.detectChanges();
    });
  }


  getSearchProfileByStatus(): void {
    this.totalRevenue = 0;
    this.periods = []
    this.types = []
    const fSearch = this.formSearch.value;
    const request: StatusSearchRequest = {
      textSearch: fSearch.textSearch ? fSearch.textSearch : '',
      id: fSearch.statusList ? fSearch.statusList : ''
    };
    console.log(request)
    this.placeService.searchByStatus(request).subscribe(res => {
      if (res.code === 1) {
        this.listProfileFromServer = res.data.profileInfo;
        this.totalRevenue = res.data.totalCost;
        this.cdr.detectChanges();
      } else {
        this.listProfileFromServer = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.listProfileFromServer = [];
      this.cdr.detectChanges();
    });
  }



  getAllProfile(){
    this.totalRevenue = 0;
    this.profileService.getAll().subscribe(res => {
      if (res.code === 1) {
        this.listProfileFromServer = res.data.profileInfo;
        this.totalRevenue = res.data.totalCost;
        this.cdr.detectChanges();
      } else {
        this.listProfileFromServer = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.listProfileFromServer = [];
      this.cdr.detectChanges();
    });
  }

}
