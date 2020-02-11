import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Treatment } from '../../models/treatment';

@Component({
  selector: 'kryptand-patient-add-edit-treatment-container',
  templateUrl: './patient-add-edit-treatment-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddEditTreatmentContainerComponent {
  @Input() treatment: Treatment;
  @Input() patientId: string;
  botoxActive: boolean = true;
  threadActive: boolean = false;
  customActive: boolean = false;
  pop: PopoverController;

  saveTreatmentEventEmitted(treatment: Treatment) {
    this.pop.dismiss(treatment).then(r => r);
  }
  constructor(private navParams: NavParams) {
    this.patientId = navParams.get('patientId');
    this.treatment = navParams.get('treatment');
    this.pop = navParams.get('popover');
  }

  segmentChanged(event: CustomEvent) {
    const {
      detail: { value }
    } = event;
    this.botoxActive = value === 'botox';
    this.threadActive = value === 'threads';
    this.customActive = value === 'custom';
  }
}
