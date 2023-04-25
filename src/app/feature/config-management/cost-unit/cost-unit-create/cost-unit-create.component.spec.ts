import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostUnitCreateComponent } from './cost-unit-create.component';

describe('CostUnitCreateComponent', () => {
  let component: CostUnitCreateComponent;
  let fixture: ComponentFixture<CostUnitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostUnitCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostUnitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
