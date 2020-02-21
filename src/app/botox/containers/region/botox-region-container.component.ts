import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BotoxRegionPersistor } from '../../services/region-persistor.service';

@Component({
  selector: 'kryptand-region',
  templateUrl: './botox-region-container.component.html',
  styleUrls: ['./botox-region-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionContainerComponent {
  public fieldConfig = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Titel',
        placeholder: 'Titel',
        required: true
      }
    },
    {
      key: 'suggestedAmount',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Empfohlene Einheiten',
        placeholder: 'Empfohlene Einheiten',
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
  constructor(public botoxRegionPersistor: BotoxRegionPersistor) {}
}
