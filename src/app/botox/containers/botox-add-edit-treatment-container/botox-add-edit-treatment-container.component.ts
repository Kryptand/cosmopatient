import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { BotoxTreatment } from '../../models/botox-treatment';
import { AbstractOverlayContainer } from '../../../shared/abstract-overlay-container';

@Component({
  selector: 'kryptand-botox-add-edit-treatment-container',
  templateUrl: './botox-add-edit-treatment-container.component.html',
  styleUrls: ['./botox-add-edit-treatment-container.component.scss']
})
export class BotoxAddEditTreatmentContainerComponent extends AbstractOverlayContainer<
  BotoxTreatment
> {
  constructor(protected navParams: NavParams) {
    super(navParams);
  }
}
