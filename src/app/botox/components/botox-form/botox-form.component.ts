import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewChild
} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {BotoxTypePersistor} from '../../services/type-persistor.service';
import {BotoxRegionPersistor} from '../../services/region-persistor.service';
import {map} from 'rxjs/operators';
import {BotoxTreatment} from '../../models/botox-treatment';
import {AbstractTreatmentForm} from '../../../shared/abstract-treatment';
import {FormComponent} from '../../../shared/form/form.component';

@Component({
    selector: 'kryptand-botox-form',
    templateUrl: './botox-form.component.html',
    styleUrls: ['./botox-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxFormComponent extends AbstractTreatmentForm<BotoxTreatment> {
    @ViewChild('form') formComponent: FormComponent;

    constructor(
        protected botoxTypePersistor: BotoxTypePersistor,
        protected botoxRegionPersistor: BotoxRegionPersistor,
        protected cd: ChangeDetectorRef
    ) {
    super(botoxTypePersistor, botoxRegionPersistor, cd);
  }

  fieldConfig: FormlyFieldConfig[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Titel',
        placeholder: 'Titel',
        required: true
      },
      defaultValue: 'Botoxbehandlung'
    },
    {
      key: 'date',
      type: 'datetime',
      templateOptions: {
        type: 'date',
        label: 'Datum',
        placeholder: 'Datum'
      },
      defaultValue: new Date().toISOString()
    },
    {
      key: 'type',
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
      },
      className: 'hidden'
    },
    {
      key: 'detail',
      type: 'repeat',
      templateOptions: {
        addText: 'Region hinzufügen'
      },
      className: 'botox-form__region_and_amount ',
      fieldArray: {
        fieldGroup: [
          {
            key: 'region',
            type: 'autocomplete',
            className: 'region',
            templateOptions: {
              attributes: {
                autocomplete: 'off'
              },
              label: 'Region',
              options: this.botoxRegionPersistor.list().pipe(
                  map(regions => {
                      const regionTitles = regions.map(region => region.title);
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
            className: 'amount',
            templateOptions: {
              label: 'Menge',
              placeholder: 'Menge',
              required: true
            }
          }
        ]
      }
    },
    {
      key: 'price',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Preis',
        placeholder: 'Preis',
        required: true
      }
    }
  ];
}
