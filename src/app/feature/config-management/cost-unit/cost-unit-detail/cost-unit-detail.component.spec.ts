import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostUnitDetailComponent } from './cost-unit-detail.component';

describe('CostUnitDetailComponent', () => {
  let component: CostUnitDetailComponent;
  let fixture: ComponentFixture<CostUnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostUnitDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostUnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
