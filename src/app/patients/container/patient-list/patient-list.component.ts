import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, Observable, combineLatest } from "rxjs";
import { switchMap, map, startWith } from "rxjs/operators";
import { PatientPersistor } from "./../../services/patient-persistor.service";
import { Patient } from "../../models/patient";
import { PopoverController } from "@ionic/angular";
import { PatientAddEditContainerComponent } from "../patient-add-edit-container/patient-add-edit-container.component";
import { isNullOrUndefined } from "util";
import { FormControl } from "@angular/forms";
@Component({
  selector: "kryptand-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.css"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PatientListComponent implements OnInit {
  @Input()
  set createPatient(_:any){
    this.create();
  }
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
    this.filter$ = this.searchControl.valueChanges.pipe(startWith(""));
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
  edit(patient: Patient) {
    this.openOverlay(patient);
  }
  create() {
    this.openOverlay();
  }
  async openOverlay(patient?: Patient) {
    const popover = await this.popoverController.create({
      component: PatientAddEditContainerComponent,
      componentProps: { patient: patient, popover: this.popoverController }
    });
    await popover.present();
    const result = await popover.onDidDismiss();
    const toSave = result.data as Patient;
    return isNullOrUndefined(patient)
      ? this.patientPersistor
          .save(toSave)
          .subscribe(_ => this.refreshPatients())
      : this.patientPersistor
          .update(toSave)
          .subscribe(_ => this.refreshPatients());
  }

  delete(id: string) {
    this.patientPersistor.remove(id).subscribe(_ => this.refreshPatients());
  }
}
