import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Patient } from '../../models/patient';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'kryptand-patient-add-edit-container',
  templateUrl: './patient-add-edit-container.component.html',
  styleUrls: ['./patient-add-edit-container.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PatientAddEditContainerComponent {
  @Input() patient:Patient;
  pop: PopoverController;
  constructor(private navParams:NavParams) {   
    this.patient = navParams.get('patient');
    this.pop = navParams.get('popover');
  }
  savePatientEventEmitted(patient:Patient){
    this.pop.dismiss(patient);
  }
}
