import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { from, Observable } from "rxjs";
import * as uuid from "uuid";
import { Photo } from "./../models/treatment";
const TREATMENT_STORAGE_KEY = "[PHOTO]";
@Injectable()
export class PhotoPersistor {
  constructor(private storage: Storage) {}
  save(patientId: string, treatmentId: string, photo: Photo): Observable<any> {
    const id = uuid.v4();
    photo.id = id;
    return from(
      this.storage.set(
        `${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}${photo.id}`,
        photo
      )
    );
  }
  update(
    patientId: string,
    treatmentId: string,
    update: Photo
  ): Observable<any> {
    return from(
      this.storage.set(
        `${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}${update.id}`,
        update
      )
    );
  }
  getSingle(
    patientId: string,
    treatmentId: string,
    photoId: Photo
  ): Observable<any> {
    return from(
      this.storage.get(
        `${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}${photoId}`
      )
    );
  }
  listAllForPatient(patientId: string): Observable<any> {
    return from(
      this.storage.keys().then(keys =>
        Promise.all(
          keys.map(k => {
            const contains = k.startsWith(
              `${TREATMENT_STORAGE_KEY}${patientId}`
            );
            if (contains) return this.storage.get(k);
          })
        )
      )
    );
  }
  listForPatientAndTreatment(
    patientId: string,
    treatmentId: string
  ): Observable<any> {
    return from(
      this.storage.keys().then(keys =>
        Promise.all(
          keys.map(k => {
            const contains = k.startsWith(
              `${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}`
            );
            if (contains) return this.storage.get(k);
          })
        )
      )
    );
  }
  remove(
    patientId: string,
    treatmentId: string,
    photo: Photo
  ): Observable<any> {
    return from(
      this.storage.remove(
        `${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}${photo.id}`
      )
    );
  }
  removeForTreatment(patientId: string, treatmentId: string) {
    return from(
      this.storage.keys().then(keys =>
        Promise.all(
          keys.map(k => {
            const contains = k.startsWith(
              `${TREATMENT_STORAGE_KEY}${patientId}${treatmentId}`
            );
            if (contains) return this.storage.remove(k);
          })
        )
      )
    );
  }
}
