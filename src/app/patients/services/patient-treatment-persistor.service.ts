import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import * as uuid from 'uuid';
import { Treatment } from './../models/treatment';
import { isNullOrUndefined } from 'util';
import { PhotoPersistor } from './patient-photo-persistor.service';
const TREATMENT_STORAGE_KEY = '[TREATMENT]';
@Injectable()
export class TreatmentPersistor {
  constructor(private storage: Storage, private patientPhoto: PhotoPersistor) {}
  save(patientId: string, treatment: Treatment): Observable<any> {
    const id = uuid.v4();
    treatment.id = id;
    return from(
      this.storage.set(
        `${TREATMENT_STORAGE_KEY}${patientId}${treatment.id}`,
        treatment
      )
    );
  }
  update(patientId: string, update: Treatment): Observable<any> {
    return from(
      this.storage.set(
        `${TREATMENT_STORAGE_KEY}${patientId}${update.id}`,
        update
      )
    );
  }
  getSingle(patientId: string, treatmentId: string): Observable<any> {
    return from(
      this.storage.get(`${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}`)
    );
  }
  list(patientId: string): Promise<any> {
    return this.storage.keys().then(keys =>
      Promise.all(
        keys.map(async k => {
          const contains = k.startsWith(`${TREATMENT_STORAGE_KEY}${patientId}`);

          if (contains) {
            const value = await this.storage.get(k);
            if (!isNullOrUndefined(value)) {
              return value;
            }
          }
        })
      )
    );
  }
  remove(patientId: string, treatmentId: string): Observable<any> {
    this.patientPhoto.removeForTreatment(patientId, treatmentId);
    return from(
      this.storage.remove(`${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}`)
    );
  }
  removeForPatient(patientId: string) {
    return this.storage.keys().then(keys =>
      Promise.all(
        keys.map(async k => {
          const contains = k.startsWith(`${TREATMENT_STORAGE_KEY}${patientId}`);

          if (contains) {
            const value = await this.storage.get(k);
            if (!isNullOrUndefined(value)) {
              const id = k.split(`${TREATMENT_STORAGE_KEY}${patientId}`)[1];
              this.patientPhoto.removeForTreatment(patientId, id);
              return this.storage.remove(k);
            }
          }
        })
      )
    );
  }
}
