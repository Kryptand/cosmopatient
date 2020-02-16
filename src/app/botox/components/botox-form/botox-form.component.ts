import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BotoxTypePersistor } from '../../services/type-persistor.service';
import { BotoxRegionPersistor } from '../../services/region-persistor.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'kryptand-botox-form',
  templateUrl: './botox-form.component.html',
  styleUrls: ['./botox-form.component.scss']
})
export class BotoxFormComponent {
  fieldConfig: FormlyFieldConfig[] = [
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
      key: 'botoxType',
      type: 'select',
      templateOptions: {
        label: 'Typ',
        options: this.botoxTypePersistor.list(),
        valueProp: 'id',
        labelProp: 'title'
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
    },
    {
      key: 'detail',
      type: 'repeat',
      templateOptions: {
        addText: 'Region hinzufügen'
      },
      fieldArray: {
        fieldGroup: [
          {
            key: 'region',
            type: 'autocomplete',
            templateOptions: {
              label: 'Region',
              options: this.botoxRegionPersistor.list().pipe(
                map(regions => {
                  const regionTitles = regions.map(region => region.title);
                  // eslint-disable-next-line prefer-spread
                  return [].concat.apply([], regionTitles);
                })
              ),
              placeholder: 'Region',
              required: true
            }
          },
          {
            key: 'amount',
            type: 'input',
            templateOptions: {
              label: 'Menge',
              placeholder: 'Menge',
              required: true
            }
          }
        ]
      }
    }
  ];
  constructor(
    private botoxTypePersistor: BotoxTypePersistor,
    private botoxRegionPersistor: BotoxRegionPersistor
  ) {}
}
