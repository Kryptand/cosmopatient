import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoxAddEditTypeContainerComponent } from './botox-add-edit-type-container.component';

describe('BotoxAddEditTypeContainerComponent', () => {
  let component: BotoxAddEditTypeContainerComponent;
  let fixture: ComponentFixture<BotoxAddEditTypeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotoxAddEditTypeContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoxAddEditTypeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
