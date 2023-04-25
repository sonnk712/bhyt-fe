import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'agri-loading-indicator',
  template: `
    <div class="indicator global-indicator" *ngIf="isLoading">
      <p-progressSpinner strokeWidth="3" [style]="{width: '70px', height: '70px'}"></p-progressSpinner>
    </div>
  `,
  styles: [`:host{top: 0;bottom: 0;left: 0;right: 0;margin: auto;position: absolute;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingIndicatorComponent implements OnChanges {
  @Input() isLoading: boolean | null = false;
  @HostBinding('class.invisible') isHidden = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isLoading) {
      this.isHidden = !this.isLoading;
    }
  }

}
