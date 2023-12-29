import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredTutorsComponent } from './registered-tutors.component';

describe('RegisteredTutorsComponent', () => {
  let component: RegisteredTutorsComponent;
  let fixture: ComponentFixture<RegisteredTutorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredTutorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredTutorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
