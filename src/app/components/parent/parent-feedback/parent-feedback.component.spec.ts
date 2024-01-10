import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentFeedbackComponent } from './parent-feedback.component';

describe('ParentFeedbackComponent', () => {
  let component: ParentFeedbackComponent;
  let fixture: ComponentFixture<ParentFeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentFeedbackComponent]
    });
    fixture = TestBed.createComponent(ParentFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
