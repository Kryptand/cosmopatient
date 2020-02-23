import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Patient } from '../models/patient';
import { from, Observable } from 'rxjs';
import * as uuid from 'uuid';
import { isNullOrUndefined } from 'util';
import { TreatmentPersistor } from './patient-treatment-persistor.service';
import { AbstractPersistor } from '../../util/abstract-persistor';

const PATIENTS_STORAGE_KEY = '[PATIENTS]';

@Injectable()
export class PatientPersistor extends AbstractPersistor<Patient> {
  constructor(
    protected storage: Storage,
    protected treatmentPersistor: TreatmentPersistor
  ) {
    super(storage, PATIENTS_STORAGE_KEY, Patient);
  }
  remove(id: string): Observable<any> {
    this.treatmentPersistor.removeForPatient(id).then(r => r);
    return from(this.storage.remove(`${PATIENTS_STORAGE_KEY}${id}`));
  }
}
