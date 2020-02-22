import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreadFormComponent} from './thread-form.component';

describe('ThreadFormComponent', () => {
  let component: ThreadFormComponent;
  let fixture: ComponentFixture<ThreadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadFormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
