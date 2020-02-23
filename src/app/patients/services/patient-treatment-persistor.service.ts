import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Treatment} from '../models/treatment';
import {isNullOrUndefined} from 'util';
import {PhotoPersistor} from './patient-photo-persistor.service';
import {
  AbstractPersistor,
  removeEntriesFromStorageAsync
} from '../../util/abstract-persistor';

const TREATMENT_STORAGE_KEY = '[TREATMENT]';

@Injectable()
export class TreatmentPersistor extends AbstractPersistor<Treatment> {
  constructor(
      protected storage: Storage,
      private patientPhoto: PhotoPersistor
  ) {
    super(storage, TREATMENT_STORAGE_KEY, Treatment);
  }

  removeForPatient(patientId: string) {
    return removeEntriesFromStorageAsync(
        `${TREATMENT_STORAGE_KEY}${patientId}`,
        this.storage,
        key => {
          const id = key.split(`${TREATMENT_STORAGE_KEY}${patientId}`)[1];
          this.patientPhoto.removeForTreatment(patientId, id).then(r => r);
        }
    );
  }
}
