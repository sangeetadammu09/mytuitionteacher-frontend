import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherJobsComponent } from './teacher-jobs.component';

describe('TeacherJobsComponent', () => {
  let component: TeacherJobsComponent;
  let fixture: ComponentFixture<TeacherJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
