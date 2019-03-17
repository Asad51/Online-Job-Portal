import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalJobsComponent } from './total-jobs.component';

describe('TotalJobsComponent', () => {
  let component: TotalJobsComponent;
  let fixture: ComponentFixture<TotalJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
