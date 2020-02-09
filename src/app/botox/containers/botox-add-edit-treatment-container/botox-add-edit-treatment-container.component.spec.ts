import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoxAddEditTreatmentContainerComponent } from './botox-add-edit-treatment-container.component';

describe('BotoxAddEditTreatmentContainerComponent', () => {
  let component: BotoxAddEditTreatmentContainerComponent;
  let fixture: ComponentFixture<BotoxAddEditTreatmentContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoxAddEditTreatmentContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoxAddEditTreatmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
