import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostUnitUpdateComponent } from './cost-unit-update.component';

describe('CostUnitUpdateComponent', () => {
  let component: CostUnitUpdateComponent;
  let fixture: ComponentFixture<CostUnitUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostUnitUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostUnitUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
