/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientAddEditTreatmentContainerComponent } from './patient-add-edit-treatment-container.component';

describe('PatientAddEditTreatmentContainerComponent', () => {
  let component: PatientAddEditTreatmentContainerComponent;
  let fixture: ComponentFixture<PatientAddEditTreatmentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAddEditTreatmentContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAddEditTreatmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
