import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropBackendComponent } from './crop-backend.component';

describe('CropBackendComponent', () => {
  let component: CropBackendComponent;
  let fixture: ComponentFixture<CropBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
