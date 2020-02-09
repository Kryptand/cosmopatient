import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Treatment } from '../../models/treatment';
import { patchFormValue } from '../../../util/patch-form';

@Component({
  selector: 'kryptand-patient-add-edit-treatment',
  templateUrl: './patient-add-edit-treatment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddEditTreatmentComponent implements OnInit {
  @Input() treatment: Treatment;
  @Output() saveTreatmentEventTriggered: EventEmitter<
    Treatment
  > = new EventEmitter();

  public treatmentForm: FormGroup = new FormGroup({
    label: new FormControl(),
    date: new FormControl()
  });

  public ngOnInit() {
    if (!this.treatment) {
      return;
    }
    patchFormValue(this.treatment, this.treatmentForm);
  }
  public save() {
    this.saveTreatmentEventTriggered.emit(this.treatmentForm.value);
  }
}
