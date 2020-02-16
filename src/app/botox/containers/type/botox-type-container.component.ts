import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BotoxTypePersistor } from '../../services/type-persistor.service';

@Component({
  selector: 'kryptand-type-container',
  templateUrl: './botox-type-container.component.html',
  styleUrls: ['./botox-type-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxTypeContainerComponent {
  public fieldConfig = [
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
    },
    {
      key: 'id',
      type: 'input',
      templateOptions: {
        type: 'hidden'
      }
    }
  ];
  constructor(public botoxTypePersistor: BotoxTypePersistor) {}
}
