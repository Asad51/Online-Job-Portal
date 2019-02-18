import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerResumeComponent } from './job-seeker-resume.component';

describe('JobSeekerResumeComponent', () => {
  let component: JobSeekerResumeComponent;
  let fixture: ComponentFixture<JobSeekerResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobSeekerResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSeekerResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
