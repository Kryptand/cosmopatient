import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PatientAddEditTreatmentContainerComponent } from '../patient-add-edit-treatment-container/patient-add-edit-treatment-container.component';
import { Treatment } from '../../models/treatment';
import { TreatmentPersistor } from '../../services/patient-treatment-persistor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kryptand-patient-image-gallery',
  templateUrl: './patient-image-gallery.component.html',
  styleUrls: ['./patient-image-gallery.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientImageGalleryComponent implements OnInit {
  patientId: string;
  pop: PopoverController;

  private refresh$ = new BehaviorSubject(undefined);
  public treatments$: Observable<Treatment[]>;
  constructor(
    private treatmentPersistor: TreatmentPersistor,
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    this.route.params.subscribe(params => {
      this.patientId = params['id'];
      this.refresh$.next(undefined);
    });
  }
  ngOnInit() {
    if (!this.patientId) {
      return;
    }
    const treatments$ = this.refresh$.pipe(
      switchMap(() => this.treatmentPersistor.list(this.patientId))
    );
    treatments$.subscribe(values => {
      this.treatments$ = of(values.filter((value: any) => value));
      this.cd.markForCheck();
    });
  }
  delete(treatment: Treatment) {
    this.treatmentPersistor
      .remove(this.patientId, treatment.id)
      .subscribe(_ => this.refresh$.next(undefined));
  }
  edit(treatment: Treatment) {
    this.openOverlay(treatment);
  }
  create() {
    this.openOverlay();
  }
  async openOverlay(treatment?: Treatment) {
    const popover = await this.popoverController.create({
      component: PatientAddEditTreatmentContainerComponent,
      componentProps: {
        patientId: this.patientId,
        treatment: treatment,
        popover: this.popoverController
      }
    });
    await popover.present();
    const result = await popover.onDidDismiss();
    const toSave = result.data as Treatment;
    return treatment
      ? this.treatmentPersistor
          .save(this.patientId, toSave)
          .subscribe(_ => this.refresh$.next(undefined))
      : this.treatmentPersistor
          .update(this.patientId, toSave)
          .subscribe(_ => this.refresh$.next(undefined));
  }
}
