import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCompaniesComponent } from './total-companies.component';

describe('TotalCompaniesComponent', () => {
  let component: TotalCompaniesComponent;
  let fixture: ComponentFixture<TotalCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
