import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentHistoryComponent } from './parent-history.component';

describe('ParentHistoryComponent', () => {
  let component: ParentHistoryComponent;
  let fixture: ComponentFixture<ParentHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentHistoryComponent]
    });
    fixture = TestBed.createComponent(ParentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
