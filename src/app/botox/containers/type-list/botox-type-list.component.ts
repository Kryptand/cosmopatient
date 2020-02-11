import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractCrudContainer } from '../../../shared/abstract-crud-container';
import { PopoverController } from '@ionic/angular';
import { BotoxRegionAddEditContainerComponent } from '../region-add-edit-container/region-add-edit-container.component';
import {
  BotoxType,
  BotoxTypePersistor
} from '../../services/type-persistor.service';

@Component({
  selector: 'kryptand-botox-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxTypeListComponent extends AbstractCrudContainer<BotoxType> {
  constructor(
    protected typePersistor: BotoxTypePersistor,
    protected popoverController: PopoverController
  ) {
    super(typePersistor);
  }
  public async openOverlay(type?: BotoxType) {
    return this.openOverlayWithProps(
      { entity: type },
      this.popoverController,
      BotoxRegionAddEditContainerComponent,
      type
    );
  }
}
