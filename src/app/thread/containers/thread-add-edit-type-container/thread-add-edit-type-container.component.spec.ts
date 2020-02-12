import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadAddEditTypeContainerComponent } from './thread-add-edit-type-container.component';

describe('ThreadAddEditTypeContainerComponent', () => {
  let component: ThreadAddEditTypeContainerComponent;
  let fixture: ComponentFixture<ThreadAddEditTypeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadAddEditTypeContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadAddEditTypeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
