import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BotoxRegion,
  BotoxRegionPersistor
} from '../../services/region-persistor.service';
import { PopoverController } from '@ionic/angular';
import { BotoxRegionAddEditContainerComponent } from '../region-add-edit-container/region-add-edit-container.component';
import { AbstractCrudContainer } from '../../../shared/abstract-crud-container';

@Component({
  selector: 'kryptand-botox-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionListComponent extends AbstractCrudContainer<
  BotoxRegion
> {
  constructor(
    protected regionPersistor: BotoxRegionPersistor,
    protected popoverController: PopoverController
  ) {
    super(regionPersistor);
  }
  async openOverlay(region?: BotoxRegion) {
    return this.openOverlayWithProps(
      { entity: region },
      this.popoverController,
      BotoxRegionAddEditContainerComponent,
      region
    );
  }
}
