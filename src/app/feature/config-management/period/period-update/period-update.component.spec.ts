import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodUpdateComponent } from './period-update.component';

describe('PeriodUpdateComponent', () => {
  let component: PeriodUpdateComponent;
  let fixture: ComponentFixture<PeriodUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
