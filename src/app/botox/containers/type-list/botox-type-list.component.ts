import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractCrudContainer } from '../../../shared/abstract-crud-container';
import {
  BotoxType,
  BotoxTypePersistor
} from '../../services/type-persistor.service';
import { OverlayContainerComponent } from '../../../shared/overlay-container/overlay-container.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'kryptand-botox-type-list',
  templateUrl: './botox-type-list.component.html',
  styleUrls: ['./botox-type-list.component.scss'],
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
    const fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          label: 'Name/ Hersteller',
          placeholder: 'Name/ Hersteller',
          required: true
        }
      },
      {
        key: 'pricePerUnit',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Preis pro Einheit',
          placeholder: 'Preis pro Einheit',
          required: true
        }
      }
    ];
    return this.openOverlayWithProps(
      { entity: type, fields },
      this.popoverController,
      OverlayContainerComponent,
      type
    );
  }
}
