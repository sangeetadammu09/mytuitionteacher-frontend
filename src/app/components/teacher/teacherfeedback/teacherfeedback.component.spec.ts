import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherfeedbackComponent } from './teacherfeedback.component';

describe('TeacherfeedbackComponent', () => {
  let component: TeacherfeedbackComponent;
  let fixture: ComponentFixture<TeacherfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherfeedbackComponent]
    });
    fixture = TestBed.createComponent(TeacherfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
