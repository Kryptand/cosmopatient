import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Photo } from '../../models/treatment';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'kryptand-patient-image-comparison',
  templateUrl: './patient-image-comparison.component.html',
  styleUrls: ['./patient-image-comparison.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PatientImageComparisonComponent {
  @Input() images:Photo[];
  pop: PopoverController;
  constructor(private navParams:NavParams) {   
    this.images = navParams.get('images');
    this.pop = navParams.get('popover');
  }
  closeEventEmitted(){
    this.pop.dismiss();
  }

}
