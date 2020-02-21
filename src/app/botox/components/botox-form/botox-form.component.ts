import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {
  BotoxType,
  BotoxTypePersistor
} from '../../services/type-persistor.service';
import {BotoxRegionPersistor} from '../../services/region-persistor.service';
import {map} from 'rxjs/operators';
import {FormArray} from '@angular/forms';
import {FormComponent} from '../../../shared/form/form.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'kryptand-botox-form',
  templateUrl: './botox-form.component.html',
  styleUrls: ['./botox-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('form') formComponent: FormComponent;
  botoxSubscription: Subscription;

  selectedBotoxType: BotoxType;
  formSubscription: Subscription;
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
      },
      className: 'hidden'
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

  constructor(
      private botoxTypePersistor: BotoxTypePersistor,
      private botoxRegionPersistor: BotoxRegionPersistor
  ) {
  }

  save($event: any) {
  }

  ngAfterViewInit(): void {
    let previousValue = {};
    this.formSubscription = this.formComponent.formGroup.valueChanges.subscribe(
        v => {
          if (v.botoxType) {
            this.botoxTypePersistor
                .getSingle(v.botoxType)
                .subscribe(type => (this.selectedBotoxType = type));
          }
          if (
              !v.detail ||
              JSON.stringify(v.detail) === JSON.stringify(previousValue)
          ) {
            return;
          }
          previousValue = v.detail;
          const detailArr = this.formComponent.formGroup.controls
              .detail as FormArray;
          let botoxAmount = 0;
          v.detail.forEach((detailEntry, idx, arr) => {
            if (detailEntry.amount) {
              botoxAmount += parseFloat(detailEntry.amount);
            }
            const region = detailArr.at(idx).get('region');
            const amount = detailArr.at(idx).get('amount');

            if ((amount.value && !region.value) || amount.dirty) {
              return;
            }
            this.botoxSubscription = this.botoxRegionPersistor
                .list()
                .subscribe(regions => {
                  const foundRegion = regions.find(
                      listedRegion => listedRegion.title === region.value
                  );
                  if (foundRegion) {
                    amount.patchValue(foundRegion.suggestedAmount);
                  }
                });
          });
          const price = this.formComponent.formGroup.get('price');
          if (this.selectedBotoxType) {
            const total = botoxAmount * this.selectedBotoxType.pricePerUnit;
            price.patchValue(total);
          }
        }
    );
  }

  ngOnDestroy(): void {
    this.botoxSubscription.unsubscribe();
    this.formSubscription.unsubscribe();
  }
}
