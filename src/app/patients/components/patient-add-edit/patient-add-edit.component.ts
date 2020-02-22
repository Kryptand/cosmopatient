import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Patient} from '../../models/patient';
import {patchFormValue} from '../../../util/patch-form';
import {AbstractEntityAddEditComponent} from '../../../shared/abstract-add-edit-component';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {map} from 'rxjs/operators';

@Component({
  selector: 'kryptand-patient-add-edit',
  templateUrl: './patient-add-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientAddEditComponent extends AbstractEntityAddEditComponent<Patient> {
  formGroup: FormGroup;
  fieldConfig: FormlyFieldConfig[] = [
    {
      key: 'gender',
      type: 'select',
      templateOptions: {
        label: 'Geschlecht',
        options: [
          {title: 'Männlich', value: 0},
          {title: 'Weiblich', value: 1},
          {title: 'Divers', value: 2}
        ],
        valueProp: 'title',
        labelProp: 'value'
      }
    },
    {
      key: 'firstName',
      type: 'input',
      templateOptions: {
        label: 'Vorname',
        placeholder: 'Vorname',
        required: true
      }
    },

    {
      key: 'lastName',
      type: 'input',
      templateOptions: {
        label: 'Nachname',
        placeholder: 'Nachname',
        required: true
      }
    },
    {
      key: 'birthday',
      type: 'datetime',
      templateOptions: {
        type: 'date',
        label: 'Geburtsdatum',
        placeholder: 'Geburtsdatum'
      },
      defaultValue: new Date().toISOString()
    },
    {
      key: 'street',
      type: 'input',
      templateOptions: {
        label: 'Straße',
        placeholder: 'Straße',
        required: true
      }
    },
    {
      key: 'streetNo',
      type: 'input',
      templateOptions: {
        label: 'Hausnummer',
        placeholder: 'Hausnummer',
        required: true
      }
    },
    {
      key: 'zipCode',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Postleitzahl',
        placeholder: 'Postleitzahl',
        required: true
      }
    },
    {
      key: 'city',
      type: 'input',
      templateOptions: {
        label: 'Stadt',
        placeholder: 'Stadt',
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

  // @ts-ignore
  save(formvalue: any) {
    this.saveEntity.emit(formvalue);
  }
}
