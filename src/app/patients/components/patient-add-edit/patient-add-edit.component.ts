import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Patient } from '../../models/patient';
import { patchFormValue } from '../../../util/patch-form';

@Component({
  selector: 'kryptand-patient-add-edit',
  templateUrl: './patient-add-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddEditComponent implements OnInit {
  @Input() patient: Patient;
  @Output() savePatientEventTriggered: EventEmitter<
    Patient
  > = new EventEmitter();

  public patientForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });

  public ngOnInit() {
    if (!this.patient) {
      return;
    }
    patchFormValue(this.patient, this.patientForm);
  }

  public save() {
    this.savePatientEventTriggered.emit(this.patientForm.value);
  }
}
