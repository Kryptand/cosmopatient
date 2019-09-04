import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { Treatment } from "../../models/treatment";

@Component({
  selector: "kryptand-patient-add-edit-treatment",
  templateUrl: "./patient-add-edit-treatment.component.html",
  styleUrls: ["./patient-add-edit-treatment.component.css"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PatientAddEditTreatmentComponent implements OnInit {
  @Input() treatment: Treatment;
  @Output() saveTreatmentEventTriggered: EventEmitter<
    Treatment
  > = new EventEmitter();
  customDayShortNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

  treatmentForm: FormGroup = new FormGroup({
    label: new FormControl(),
    date: new FormControl()
  });
  constructor() {}
  get todaysDate() {
    return new Date();
  }
  ngOnInit() {
    if (!isNullOrUndefined(this.treatment)) {
      Object.keys(this.treatment).map(x =>
        this.treatmentForm.controls[x].patchValue(this.treatment[x])
      );
    }
  }
  save() {
    this.saveTreatmentEventTriggered.emit(this.treatmentForm.value);
  }
}
