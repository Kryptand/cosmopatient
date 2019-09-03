import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { Treatment } from "../../models/treatment";

@Component({
  selector: "kryptand-patient-treatment",
  templateUrl: "./patient-treatment.component.html",
  styleUrls: ["./patient-treatment.component.css"]
})
export class PatientTreatmentComponent implements OnInit {
  @Output() treatmentSelectEventTriggered: EventEmitter<
    Treatment
  > = new EventEmitter();
  @Output() editEventTriggered:EventEmitter<Treatment>=new EventEmitter();
  @Input() patientId: string;
  @Input() treatment: Treatment;
  constructor() {}
  editEvent(treatment:Treatment){
    this.editEventTriggered.next(treatment);
  }
  ngOnInit() {}
}
