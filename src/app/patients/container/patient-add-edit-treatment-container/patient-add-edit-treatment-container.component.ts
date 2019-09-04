import { Component, Input, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { Treatment } from "../../models/treatment";

@Component({
  selector: "kryptand-patient-add-edit-treatment-container",
  templateUrl: "./patient-add-edit-treatment-container.component.html",
  styleUrls: ["./patient-add-edit-treatment-container.component.css"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PatientAddEditTreatmentContainerComponent implements OnInit {
  @Input() treatment: Treatment;
  @Input() patientId: string;

  pop: PopoverController;

  saveTreatmentEventEmitted(treatment: Treatment) {
    this.pop.dismiss(treatment);
  }
  constructor(private navParams: NavParams) {
    this.patientId = navParams.get("patientId");
    this.treatment = navParams.get("treatment");
    this.pop = navParams.get("popover");
  }
  ngOnInit() {}
}
