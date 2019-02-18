import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerStatsComponent } from './job-seeker-stats.component';

describe('JobSeekerStatsComponent', () => {
  let component: JobSeekerStatsComponent;
  let fixture: ComponentFixture<JobSeekerStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
