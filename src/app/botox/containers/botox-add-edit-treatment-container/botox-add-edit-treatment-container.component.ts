import { Component, Input, OnInit } from '@angular/core';
import { Treatment } from '../../../patients/models/treatment';
import { NavParams, PopoverController } from '@ionic/angular';
import { BotoxTreatment } from '../../models/botox-treatment';

@Component({
  selector: 'kryptand-botox-add-edit-treatment-container',
  templateUrl: './botox-add-edit-treatment-container.component.html',
  styleUrls: ['./botox-add-edit-treatment-container.component.scss']
})
export class BotoxAddEditTreatmentContainerComponent {
  treatment: BotoxTreatment;
  pop: PopoverController;
  saveTreatmentEventEmitted(treatment: BotoxTreatment) {
    this.pop.dismiss(treatment).then(r => r);
  }
  constructor(private navParams: NavParams) {
    this.treatment = navParams.get('treatment');
    this.pop = navParams.get('popover');
  }
}
