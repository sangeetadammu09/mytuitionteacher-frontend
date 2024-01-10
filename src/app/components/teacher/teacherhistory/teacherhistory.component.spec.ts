import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherhistoryComponent } from './teacherhistory.component';

describe('TeacherhistoryComponent', () => {
  let component: TeacherhistoryComponent;
  let fixture: ComponentFixture<TeacherhistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherhistoryComponent]
    });
    fixture = TestBed.createComponent(TeacherhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
