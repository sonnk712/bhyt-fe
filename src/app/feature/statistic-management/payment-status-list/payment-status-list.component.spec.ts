import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentStatusListComponent } from './payment-status-list.component';

describe('PaymentStatusListComponent', () => {
  let component: PaymentStatusListComponent;
  let fixture: ComponentFixture<PaymentStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
