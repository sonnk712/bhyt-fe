import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format, isValid, parse } from 'date-fns';
import { MessageService } from 'primeng/api';
import { RequestUpdateCusInfo } from 'src/app/core/model/customer';
import { Country, DistrictCombobox, DistrictComboboxRequest, ProvinceCombobox, Provine, WardCombobox, WardComboboxRequest } from 'src/app/core/model/place';
import { AccountService } from 'src/app/core/service/account.service';
import { CustomerService } from 'src/app/core/service/customer.service';
import { PlaceService } from 'src/app/core/service/place.service';
import { AuthStore } from 'src/app/core/store/auth.store';

@Component({
  selector: 'agri-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  // @ts-ignore
  date: Date;
  dateMask = 'dd/mm/yyyy';

  readonly posDate = {
    BIRTHDAY: 'BIRTHDAY',
    ISSUE_DATE: 'ISSUE_DATE'
  };


  formVerify: FormGroup;
  countries: any;
 
  cities: ProvinceCombobox[] = [];
  
  districts: DistrictCombobox[] = [];
  wards: WardCombobox[] = [];

  accountInfo: any;
  status: any;
  token: any;
  isShowLoading = false;
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private placeService: PlaceService,
    private authStore: AuthStore,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
    this.token = this.route.snapshot.paramMap.get('token');
    this.formVerify = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      issuerDate: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      issuerBy: ['', [Validators.required]],
      currentAddress: ['', [Validators.required]],
      permanentAddress: ['', [Validators.required]],
      country: [''],
      otp: [''],
      // managentAgency :[null, [Validators.required]],
      // managentAgency: [''],
    });
  }

  ngOnInit(): void {
    this.countries = [{name: "Việt Nam", code : "VN"}]
    this.getCountry();
    this.authStore.accountInfo$.subscribe(data => {
      if (data) {
        this.accountInfo = data;
        // this.setValueFormCustomer();
      }
    });
  }
 
  getCountry(): void {
    this.placeService.getCountry().subscribe(res => {
      if (res.code === 1) {
        this.countries = res.data;
        this.cdr.detectChanges();
      } else {
        this.countries = [];
      }
    }, error => {});
  }

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
  
  getDistrictFromCities(): void {
    const fSearch = this.formVerify.value;
    const request : DistrictComboboxRequest = {
      provinceCode : fSearch.provinceList.code ? fSearch.provinceList.code : '',
    }
    console.log(request)
    this.placeService.getDistrictFromCity(request).subscribe(res => {
      if (res.code === 1) {
        this.districts = res.data;
        this.cdr.detectChanges();
      } else {
        this.cities = [];
      }
    }, () => { });
  }

  getWardFromDistricts(): void {
    const fSearch = this.formVerify.value;
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

  updateInfo() {

    const dataCustomer = this.formVerify.value
    const request: RequestUpdateCusInfo = {
      token: this.token,
      submittedOtp: dataCustomer.otp,
      id: dataCustomer.id,
      identityNumber: dataCustomer.identityNumber,
      name: dataCustomer.name,
      birthday: parse(dataCustomer.birthday, 'dd/MM/yyyy', new Date()).toISOString(),
      gender: dataCustomer.gender === 'M' ? 1 : 0,
      issuerBy: dataCustomer.issuerBy,
      issuerDate: parse(dataCustomer.issuerDate, 'dd/MM/yyyy', new Date()).toISOString(),
      currentAddress: dataCustomer.currentAddress,
      permanentAddress: dataCustomer.permanentAddress,
      country: dataCustomer.country
    }

    console.log(request)
    this.customerService.verifyAccount(request).subscribe(res => {
      if(res){
        this.isShowLoading = false;   
      }
      if (res.code === 1) {
        this.messageService.add({
          severity:'success',
          summary: '',
          detail: 'Cập nhật tài khoản thành công'});
        this.accountService.getUserInfo().subscribe(resUser => {
          if (res.code === 1) {
            this.authStore.updateAccountInfo(resUser.data);
          }
        }, error => {})
        setTimeout(()=>{
          this.router.navigate(['/']);// <<<---using ()=> syntax
        }, 2000);
      }

    }, error => {
      this.isShowLoading = false;
      this.cdr.detectChanges();
    }); 

  }

  
  hasErrorInput(controlName: string, errorName: string): boolean {
    const control = this.formVerify.get(controlName);
    if (control == null) {
      return false;
    }
    return (control.dirty || control.touched) && control.hasError(errorName);
  }

  /* Funtion for date
  * */

  onInputDate(event: any, pos: string): void {
    let cursorPosition = event.path[0].selectionEnd;

    if (event.inputType === 'deleteContentBackward' && (cursorPosition === 2 || cursorPosition === 5)) {
      event.path[0].value = event.path[0].value.substring(0, cursorPosition - 1) + event.path[0].value.substring(cursorPosition);
      cursorPosition --;
    }
    if (event.inputType === 'insertText' && (event.path[0].value.length > 10)) {
      event.path[0].value = event.path[0].value.substring(0, event.path[0].value.length - 1);
    }

    this.dateMask = event.path[0].value.toString();
    this.dateMask = this.dateMask.replace(/\D/g, '');

    let mask = '';
    for (let i = 0; i < this.dateMask.length; i++) {
      mask += this.dateMask[i];
      if (i === 1 || i === 3) {
        mask += '/';
        if (cursorPosition === 2 || cursorPosition === 5) { cursorPosition++; }
      }
    }
    event.path[0].value = mask.toString();
    event.path[0].selectionStart = cursorPosition;
    event.path[0].selectionEnd = cursorPosition;
    if (mask.toString().length === 10) {
      event.path[0].value = mask.toString();
      if (mask.toString().length === 10) {
        event.path[0].value = mask.toString();
        let d = parse(mask.toString(), 'dd/MM/yyyy', new Date())
        if (isValid(d)) {
          if (pos === this.posDate.ISSUE_DATE) {
            this.formVerify.get('issuerDate')?.setValue(format(d, 'dd/MM/yyyy'));
          } else {
            this.formVerify.get('birthday')?.setValue(format(d, 'dd/MM/yyyy'));
          }
        }
      }
    }
  }
  onSelectBirthDay(evt: any) {
    const d = new Date(evt);
    this.formVerify.get('birthday')?.setValue(format(d, 'dd/MM/yyyy'));
  }

  onSelectIssueDate(evt: any) {
    const d = new Date(evt);
    this.formVerify.get('issuerDate')?.setValue(format(d, 'dd/MM/yyyy'));
  }
}
