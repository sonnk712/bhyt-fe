import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodCreateComponent } from './period-create.component';

describe('PeriodCreateComponent', () => {
  let component: PeriodCreateComponent;
  let fixture: ComponentFixture<PeriodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
