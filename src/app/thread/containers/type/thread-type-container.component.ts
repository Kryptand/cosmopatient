import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThreadRegionPersistor } from '../../services/region-persistor.service';

@Component({
  selector: 'kryptand-type',
  templateUrl: './thread-type-container.component.html',
  styleUrls: ['./thread-type-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadTypeContainerComponent {
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
      },
      className: 'hidden'
    }
  ];
  constructor(public threadTypePersistor: ThreadRegionPersistor) {}
}
