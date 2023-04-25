import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges, OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable, of, Subject, timer} from 'rxjs';
import {map, takeUntil, takeWhile, tap} from 'rxjs/operators';

export const INPUT_OTP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputOtpComponent),
  multi: true
};

@Component({
  selector: 'agri-input-otp',
  template: `
    <div class="p-inputgroup">
      <div class="input-with-countdown">
        <span *ngIf="countdownOtp$ | async as countdownOtp" class="input-with-countdown__text">{{countdownOtp}}</span>
        <input [ngModel]="value" (ngModelChange)="onModelChange($event)" id="login-otp" type="text" pInputText
               placeholder="Nhập OTP" class="p-mr-2"/>
      </div>
      <button *ngIf="isShowResendBtn; else requestTmp" (click)="doResendOtp()" type="button" class="p-button-secondary"
              pButton [disabled]="isDisableResendBtn"
              label="Gửi lại"></button>
      <ng-template #requestTmp>
        <button (click)="doRequestOtp()" type="button" class="p-button-success"
                pButton label="Yêu cầu OTP"></button>
      </ng-template>
    </div>
  `,
  styles: [`
    .input-with-countdown {
      display: flex;
      flex: 1 1 auto;
      position: relative;
      align-items: center;
    }
    .input-with-countdown__text {
      position: absolute;
      right: 1.1rem;
      color: #6c757d;
    }
  `],
  providers: [INPUT_OTP_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputOtpComponent implements ControlValueAccessor, OnChanges, OnDestroy {
  value: any;
  isDisableResendBtn = false;
  onChange: any = () => {};
  onTouched: any = () => {};
  countdownOtp$: Observable<number> = of(0);
  destroyCountdownOtp = new Subject();

  @Input() isShowResendBtn = false;
  @Input() timeoutOtp: number | null = null;
  @Output() requestOtp: EventEmitter<void> = new EventEmitter<void>();
  @Output() resendOtp: EventEmitter<void> = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    this.setValue(obj);
  }

  onModelChange(value: string) {
    this.setValue(value);
  }

  setValue(value: string): void {
    if (this.value !== value) {
      this.onChange(value);
    }
    this.value = value;
  }

  doRequestOtp() {
    this.requestOtp.emit();
  }

  doResendOtp() {
    if (!this.isDisableResendBtn) {
      this.resendOtp.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.timeoutOtp) {
      if (changes.timeoutOtp.currentValue && this.timeoutOtp) {
        this.startCountdown(this.timeoutOtp);
      } else {
        this.destroyCountdownOtp.next();
      }
    }
  }

  startCountdown(fromValue: number) {
    this.destroyCountdownOtp.next();
    this.isDisableResendBtn = true;
    this.countdownOtp$ = timer(0, 1000).pipe(
      takeWhile((value) => fromValue - value >= 0),
      takeUntil(this.destroyCountdownOtp),
      tap((value) => {
        if (fromValue - value == 0) {
          this.isDisableResendBtn = false;
          this.cdr.detectChanges();
        }
      }),
      map((value) => fromValue - value)
    );
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.destroyCountdownOtp.next();
    this.destroyCountdownOtp.complete();
  }
}
