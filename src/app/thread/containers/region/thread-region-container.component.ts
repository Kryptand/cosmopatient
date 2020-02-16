import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BotoxRegionPersistor } from '../../../botox/services/region-persistor.service';
import { ThreadRegionPersistor } from '../../services/region-persistor.service';

@Component({
  selector: 'kryptand-region',
  templateUrl: './thread-region-container.component.html',
  styleUrls: ['./thread-region-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadRegionContainerComponent{
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
      }
    }
  ];
  constructor(public threadRegionPersistor: ThreadRegionPersistor) {}
}
