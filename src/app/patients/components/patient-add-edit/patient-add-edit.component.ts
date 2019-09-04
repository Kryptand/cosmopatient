import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Patient } from "../../models/patient";
import { isNullOrUndefined } from "util";

@Component({
  selector: "kryptand-patient-add-edit",
  templateUrl: "./patient-add-edit.component.html",
  styleUrls: ["./patient-add-edit.component.css"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PatientAddEditComponent implements OnInit {
  @Input() patient: Patient;
  @Output() savePatientEventTriggered: EventEmitter<
    Patient
  > = new EventEmitter();
  patientForm: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl()
  });
  constructor() {}

  ngOnInit() {
    if (!isNullOrUndefined(this.patient)) {
      Object.keys(this.patient).map(x =>
        this.patientForm.controls[x].patchValue(this.patient[x])
      );
    }
  }
  save() {
    this.savePatientEventTriggered.emit(this.patientForm.value);
  }
}
