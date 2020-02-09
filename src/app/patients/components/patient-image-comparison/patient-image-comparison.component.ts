import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import {Photo} from '../../models/photo';

@Component({
  selector: 'kryptand-patient-image-comparison',
  templateUrl: './patient-image-comparison.component.html',
  styleUrls: ['./patient-image-comparison.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientImageComparisonComponent {
  @Input() images: Photo[];
  pop: PopoverController;
  constructor(private navParams: NavParams) {
    this.images = navParams.get('images');
    this.pop = navParams.get('popover');
  }
}
