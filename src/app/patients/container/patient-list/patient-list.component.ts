import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PatientPersistor } from '../../services/patient-persistor.service';
import { Patient } from '../../models/patient';
import { PopoverController } from '@ionic/angular';
import { PatientAddEditContainerComponent } from '../patient-add-edit-container/patient-add-edit-container.component';
import { isNullOrUndefined } from 'util';
import { FormControl } from '@angular/forms';
import { openOverlayAndEmitResult } from '../../../util/open-overlay';

@Component({
  selector: 'kryptand-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientListComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  constructor(
    private patientPersistor: PatientPersistor,
    private popoverController: PopoverController
  ) {}
  refresh$ = new BehaviorSubject(undefined);
  patients$ = this.refresh$.pipe(switchMap(() => this.patientPersistor.list()));
  filteredPatients$: Observable<Patient[]>;
  filter$: Observable<string>;

  refreshPatients() {
    this.refresh$.next(undefined);
  }

  ngOnInit() {
    this.filter$ = this.searchControl.valueChanges.pipe(startWith(''));
    this.filteredPatients$ = combineLatest(this.patients$, this.filter$).pipe(
      map(([states, filterString]) => {
        Object.keys(states).forEach(key => {
          if (states[key] === undefined) {
            delete states[key];
          }
        });
        if (!isNullOrUndefined(states)) {
          return states.filter(
            (state => state.firstName.indexOf(filterString) !== -1) ||
              (state => state.lastName.indexOf(filterString) !== -1)
          );
        }
      })
    );
  }
  async openOverlay(patient?: Patient) {
    return await this.openOverlayAndEmitResult(
      patient,
      patient => {
        this.patientPersistor
          .save(patient)
          .subscribe(_ => this.refreshPatients());
      },
      patient => {
        this.patientPersistor
          .update(patient)
          .subscribe(_ => this.refreshPatients());
      }
    );
  }

  private async openOverlayAndEmitResult(
    patient: Patient,
    saveMethod: Function,
    updateMethod: Function
  ) {
    const formResult = await openOverlayAndEmitResult(
      { patient },
      this.popoverController,
      PatientAddEditContainerComponent
    );
    return isNullOrUndefined(patient)
      ? saveMethod(formResult)
      : updateMethod(formResult);
  }

  delete(id: string) {
    this.patientPersistor.remove(id).subscribe(_ => this.refreshPatients());
  }
}
