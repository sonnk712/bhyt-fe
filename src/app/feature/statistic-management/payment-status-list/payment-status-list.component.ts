import { FormBuilder } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, ViewChild  } from '@angular/core';
import { CountStatusItem, DataSearchStatisticRequest, InsuranceInfo, RaItemInfo } from 'src/app/core/model/ra-statistic';
import { MessageService } from 'primeng/api';
import { RaStatisticService } from 'src/app/core/service/ra-statistic.service';
import { addYears, endOfDay } from 'date-fns';
import * as FileSaver from 'file-saver';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'agri-payment-status-list',
  templateUrl: './payment-status-list.component.html',
  styleUrls: ['./payment-status-list.component.scss']
})
export class PaymentStatusListComponent implements OnInit{
  @ViewChild('p', {static: false}) paginator: Paginator | undefined;

  isShowLoading: boolean = false;
  pageIndex = 0;
  pageSize = 10;
  // raListSearch: RaItemInfo[] = [];  // Danh sách CTS khi tìm kiếm
  // raListExport: RaItemInfo[] = [];  // Danh sách CTS khi tìm kiếm
  insuranceListSearch: InsuranceInfo[] = [];  // Danh sách CTS khi tìm kiếm
  insuranceListExport: InsuranceInfo[] = [];  // Danh sách CTS khi tìm kiếm
  searchText: string = '';
  // @ts-ignore
  rangeDates: Date[];
  // @ts-ignore
  dataResultSearch: DataSearchStatistic;
  readonly Status = {
    NONE: 0,  // Không có hành động
    ACTIVE: 1, // Hoạt động
    EXPIRED: 2, // Hết hạn
    EVICT: 3, // Thu hồi
    PENDING: 4 // Tạm dừng
  };
  totalRaRecord: number = 0;
  countActive: number = 0;
  countExpired: number = 0;
  countEvict: number = 0;
  countPending: number = 0;
  totalRecordPage: number = 0;
  currentStatusFocus: number [] = [];
  lstStatusSelectd: number [] = [];
  errRangeDates = '';
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private raStatisticService: RaStatisticService
  ) {
  }

  ngOnInit(): void {
    this.rangeDates = [addYears(endOfDay(new Date()),-1), endOfDay(new Date())];
    this.lstStatusSelectd = [1,2,3,4];
    this.searchRaStatistic(this.lstStatusSelectd, this.pageIndex, this.pageSize);
  }

  onSearch(): void {
    if (!this.rangeDates || this.rangeDates.length === 0) {
      this.errRangeDates = 'Vui lòng chọn khoảng thời gian tìm kiếm';
    }
    if (this.errRangeDates !== '') {
      this.insuranceListSearch = [];
      this.totalRecordPage = 0;
      return;
    }
    this.currentStatusFocus = [];
    this.lstStatusSelectd = [1,2,3,4];
    this.pageIndex = 0;
    this.searchRaStatistic(this.lstStatusSelectd, this.pageIndex, this.pageSize);
  }

  searchRaStatistic(lstStatus: number [], pageIndex: number, pageSize: number): void {
    const req: DataSearchStatisticRequest = {
      searchText: this.searchText,
      status: lstStatus,
      startDate: this.getStringDateForSearch(this.rangeDates[0]),
      endDate: this.getStringDateForSearch(this.rangeDates[1])
    };
    this.isShowLoading = true;
    this.raStatisticService.getDataStatistic(req, pageIndex, pageSize).subscribe(res => {
      if (res) {
        this.isShowLoading = false;
      }
      if (res.code === 1) {
        this.dataResultSearch = res.data;
        this.insuranceListSearch = this.dataResultSearch.listData;
        this.totalRaRecord = this.dataResultSearch.total;
        this.totalRecordPage = 0;
        if (this.currentStatusFocus.length === 0) {
          this.totalRecordPage = this.dataResultSearch.total;
        } else {
          this.currentStatusFocus.forEach(el => {
            let obj = this.dataResultSearch.countStatus.find((item: CountStatusItem) => item.status === el);
            this.totalRecordPage += obj ? obj.count : 0;
          });
        }
        this.dataResultSearch.countStatus.forEach((el: CountStatusItem) => {
          switch (el.status) {
            case this.Status.ACTIVE:
              this.countActive = el.count;
              break;
            case this.Status.EXPIRED:
              this.countExpired = el.count;
              break;
            case this.Status.EVICT:
              this.countEvict = el.count;
              break;
            case this.Status.PENDING:
              this.countPending = el.count;
              break;
            default:
              break;
          }
        });
      }
      this.cdr.detectChanges();
    }, error => {
      this.isShowLoading = false;
      this.cdr.detectChanges();
    });
  }

  exportRa(): void {
    if (this.insuranceListSearch.length === 0 || this.totalRaRecord === 0) {
      return;
    }
    const req: DataSearchStatisticRequest = {
      searchText: this.searchText,
      status: this.lstStatusSelectd,
      startDate: this.getStringDateForSearch(this.rangeDates[0]),
      endDate: this.getStringDateForSearch(this.rangeDates[1])
    };
    this.isShowLoading = true;
    this.raStatisticService.getDataStatistic(req, 0, this.totalRaRecord).subscribe(res => {
      if (res) {
        this.isShowLoading = false;
      }
      if (res.code === 1) {
        this.insuranceListExport = res.data.listData;
        this.exportExcel();
      }
      this.cdr.detectChanges();
    }, error => {
      this.isShowLoading = false;
      this.cdr.detectChanges();
    });
  }

  selectChangePage(evt: any) {
    this.pageIndex = evt.page;
    this.pageSize = evt.rows;
    this.searchRaStatistic(this.lstStatusSelectd, this.pageIndex, this.pageSize);
  }

  selectedRangeDates(evt: any): void {
    if (!this.rangeDates[0] || !this.rangeDates[1]) {
      this.errRangeDates = 'Khoảng thời gian tìm kiếm không hợp lệ.'
    } else {
      this.errRangeDates = '';
    }
  }

  onClickChangeStatus(n_Status: number) {
    if (this.currentStatusFocus.includes(n_Status)) {
      this.currentStatusFocus = this.currentStatusFocus.filter(item => item !== n_Status);
    } else {
      this.currentStatusFocus.push(n_Status);
    }
    if (!this.rangeDates || this.rangeDates.length === 0) {
      this.errRangeDates = 'Vui lòng chọn khoảng thời gian tìm kiếm';
    }
    if (this.errRangeDates !== '') {
      return;
    }
    this.lstStatusSelectd = this.currentStatusFocus.length > 0 ? this.currentStatusFocus : [1,2,3,4];
    this.pageIndex = 0;
    if(this.paginator !== undefined){
      if (this.paginator.currentPage() !== 0) {
        this.paginator.changePage(0);
      } else {
        this.searchRaStatistic(this.lstStatusSelectd, this.pageIndex, this.pageSize);
      }
    }
  }

  getStringDateForSearch(date: Date): string {
    if (!date) {
      return '';
    } else {
      return date.getFullYear().toString() + '-' +
        ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1).toString()) : (date.getMonth() + 1).toString()) + '-' +
        (date.getDate() < 10 ? ('0' + date.getDate().toString()) : date.getDate().toString());
    }
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.insuranceListExport);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "bhyt");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
