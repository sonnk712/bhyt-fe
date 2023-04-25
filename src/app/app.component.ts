import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'agri-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
  /** ChangeDetectionStrategy: Sử dụng chiến lược 'CheckOnce', nghĩa là tính năng phát hiện thay đổi tự động bị vô hiệu hóa
   OnPush: kích hoạt chiến lược 'CheckAlways' 'mặc định'(Cập nhật ứng dụng mô hình (nhà phát triển);Trạng thái phản hồi của mô hình trong khung nhìn (Angular).)
   */
})
export class AppComponent implements OnInit {
  constructor(private config: PrimeNGConfig) {
  }

  ngOnInit() {
    this.config.setTranslation({
      dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
      dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
      monthNames: [ 'Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12' ],
      monthNamesShort: [ 'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6','Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ],
      today: 'Hôm nay',
      clear: 'Xóa',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Wk'
    });
  }
}
