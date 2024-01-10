import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminDetailsComponent } from './subadmin-details.component';

describe('SubadminDetailsComponent', () => {
  let component: SubadminDetailsComponent;
  let fixture: ComponentFixture<SubadminDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubadminDetailsComponent]
    });
    fixture = TestBed.createComponent(SubadminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
