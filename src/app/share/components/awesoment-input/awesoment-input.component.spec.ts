import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomentInputComponent } from './awesoment-input.component';

describe('AwesomentInputComponent', () => {
  let component: AwesomentInputComponent;
  let fixture: ComponentFixture<AwesomentInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AwesomentInputComponent]
    });
    fixture = TestBed.createComponent(AwesomentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
