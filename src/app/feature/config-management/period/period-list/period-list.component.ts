import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CaInformation, CaRequestSearch, DeleteRequest } from 'src/app/core/model/certificate-authority';
import { CaService } from 'src/app/core/service/ca.service';
import { Subject } from 'rxjs';
import { PeriodInformation, PeriodTextSearch } from 'src/app/core/model/place';
import { PlaceService } from 'src/app/core/service/place.service';

@Component({
  selector: 'agri-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})
export class PeriodListComponent implements OnInit {

  formSearch!: FormGroup;
  periodList: PeriodInformation[] = [];
  selectedPeriod: PeriodInformation[] = [];
  
  checkbox: String[] = [];
  pageIndex = 0;
  pageSize = 10;
  isHidden = false;
  isShowLoading = false;
  destroy = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private caservice: CaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private placeService: PlaceService
  ) { 
    this.formSearch = this.fb.group({
      textSearch: [''],
    });
  }

  ngOnInit(): void {
    this.getPeriodInformation()
    this.formSearch.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy)
    ).subscribe(() => this.getPeriodInformation());
  }


  logDeleteRow() {
    this.confirmationService.confirm({
      message: 'Vui lòng xác nhận xóa !',
      header: 'Xóa tài khoản ?',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (this.selectedPeriod.length < 0) {
          return;
        }
        let deleteList: string[] = [];
        this.selectedPeriod.forEach(res => {
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
        this.placeService.periodDelete(request).subscribe((res: any) => {
          if (res.code === 1) {
            this.getPeriodInformation();
            this.cdr.detectChanges();
            this.messageService.add({ severity: 'success', summary: '', detail: 'Xóa thời hạn thành công' });
          }
        })
      this.selectedPeriod = []
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Đã hủy !' });
      }
    });

  }

  deleteOne(id: string) {
    this.confirmationService.confirm({
      message: 'Vui lòng xác nhận xóa !',
      header: 'Xóa tài khoản ?',
      icon: 'pi pi-info-circle',
      accept: () => {
        if (id === null) {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Danh sách xóa trống' });
          return;
        }
        const request: DeleteRequest = {
          listId: [id]
        }
        this.placeService.periodDelete(request).subscribe((res: any) => {
          if (res.code === 1) {
            this.getPeriodInformation();
            this.cdr.detectChanges();
            this.messageService.add({ severity: 'success', summary: '', detail: 'Xóa tài khoản thành công' });
          }
        })
      },
      reject: () => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Đã hủy !' });
      }
    });
  }

  nodeSelect(idSelected: string): void {
    void this.router.navigate(['/config/period/detail', idSelected]);
  }
  redirectToRegistryCa(): void {
    this.router.navigate(['/config/period/create']);
  }
 
  redirectToUpdate(id: string): void {
    this.router.navigate(['/config/period/update', id]);
  }

  // reset lại form search
  resetForm(): void {
    this.formSearch.reset();
    const request: CaRequestSearch = {
      textSearch: ''
    };
    this.placeService.periodSearch(request).subscribe(res => {
      if (res.code === 1) {
        this.periodList = res.data;
        console.log(res.data)
        this.cdr.detectChanges();
      } else {
        this.periodList = [];
        this.cdr.detectChanges();
      }
    }, error => { });
  }




  getPeriodInformation(): void {
    const fSearch = this.formSearch.value;
    const request: PeriodTextSearch = {
      textSearch: fSearch.textSearch ? fSearch.textSearch : '',
    };
    this.placeService.periodSearch(request).subscribe(res => {
      if (res.code === 1) {
        console.log(res)
        this.periodList = res.data;
        this.cdr.detectChanges();
        
      } else {
        this.periodList = [];
        this.cdr.detectChanges();
      }
    }, error => {
      this.periodList = [];
      this.cdr.detectChanges();
    });
  }
}
