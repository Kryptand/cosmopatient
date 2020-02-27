import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PatientListContainer} from './patient-list-container.component';

describe('PatientComponent', () => {
    let component: PatientListContainer;
    let fixture: ComponentFixture<PatientListContainer>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PatientListContainer],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientListContainer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
