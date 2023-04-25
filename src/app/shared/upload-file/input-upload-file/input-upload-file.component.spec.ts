import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUploadFileComponent } from './input-upload-file.component';

describe('InputUploadFileComponent', () => {
  let component: InputUploadFileComponent;
  let fixture: ComponentFixture<InputUploadFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputUploadFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputUploadFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
