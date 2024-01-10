import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubadminPaymentComponent } from './subadmin-payment.component';

describe('SubadminPaymentComponent', () => {
  let component: SubadminPaymentComponent;
  let fixture: ComponentFixture<SubadminPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubadminPaymentComponent]
    });
    fixture = TestBed.createComponent(SubadminPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
