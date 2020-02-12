import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAddEditRegionContainerComponent } from './thread-add-edit-region-container.component';

describe('ThreadAddEditRegionContainerComponent', () => {
  let component: ThreadAddEditRegionContainerComponent;
  let fixture: ComponentFixture<ThreadAddEditRegionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadAddEditRegionContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadAddEditRegionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
