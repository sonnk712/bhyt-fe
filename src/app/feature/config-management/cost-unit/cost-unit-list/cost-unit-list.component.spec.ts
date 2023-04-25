import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostUnitListComponent } from './cost-unit-list.component';

describe('CostUnitListComponent', () => {
  let component: CostUnitListComponent;
  let fixture: ComponentFixture<CostUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
