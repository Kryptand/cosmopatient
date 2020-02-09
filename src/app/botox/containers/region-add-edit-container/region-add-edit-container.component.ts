import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Patient } from '../../../patients/models/patient';
import { NavParams, PopoverController } from '@ionic/angular';
import { BotoxRegion } from '../../services/region-persistor.service';

@Component({
  selector: 'kryptand-botox-region-add-edit-container',
  templateUrl: './region-add-edit-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionAddEditContainerComponent {
  pop: PopoverController;
  region: BotoxRegion;
  constructor(private navParams: NavParams) {
    this.pop = navParams.get('popover');
    this.region = navParams.get('region');
  }
  saveRegionEventEmitted(region: BotoxRegion) {
    this.pop.dismiss(region);
  }
}
