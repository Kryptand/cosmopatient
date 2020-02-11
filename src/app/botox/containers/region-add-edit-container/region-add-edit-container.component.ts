import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { BotoxRegion } from '../../services/region-persistor.service';
import { AbstractOverlayContainer } from '../../../shared/abstract-overlay-container';

@Component({
  selector: 'kryptand-botox-region-add-edit-container',
  templateUrl: './region-add-edit-container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionAddEditContainerComponent extends AbstractOverlayContainer<
  BotoxRegion
> {
  constructor(protected navParams: NavParams) {
    super(navParams);
  }
}
