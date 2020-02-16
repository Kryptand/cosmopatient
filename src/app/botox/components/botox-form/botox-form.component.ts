import { Component, ViewChild } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BotoxTypePersistor } from '../../services/type-persistor.service';
import { BotoxRegionPersistor } from '../../services/region-persistor.service';
import { map, startWith } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core/lib/components/formly.field.config';
import { FormComponent } from '../../../shared/form/form.component';

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
              hooks: {
                onInit: field => {
                  console.debug(field);
                  this.botoxRegionPersistor.list().subscribe(regions => {
                    console.debug(regions);
                    // const sportControl = form.get('');
                    // field.templateOptions.options = sportControl.valueChanges.pipe(
                    //   startWith(sportControl.value),
                    //   map(sportId =>
                    //     teams.filter(team => team.sportId === sportId)
                    //   ),
                    //   tap(() => field.formControl.setValue(null))
                  });
                }
              },
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
