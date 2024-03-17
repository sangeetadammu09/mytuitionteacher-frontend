import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionListComponent } from './tuition-list.component';

describe('TuitionListComponent', () => {
  let component: TuitionListComponent;
  let fixture: ComponentFixture<TuitionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuitionListComponent]
    });
    fixture = TestBed.createComponent(TuitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
