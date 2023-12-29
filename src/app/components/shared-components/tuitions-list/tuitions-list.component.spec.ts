import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionsListComponent } from './tuitions-list.component';

describe('TuitionsListComponent', () => {
  let component: TuitionsListComponent;
  let fixture: ComponentFixture<TuitionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuitionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuitionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
