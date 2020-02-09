import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
const BOTOX_REGION_STORAGE_KEY = '[BOTOX_REGION]';
export interface BotoxRegion {
  title: string;
  suggestedAmount: number;
}
@Injectable({ providedIn: 'root' })
export class BotoxRegionPersistor {
  constructor(private storage: Storage) {}
  save(region: BotoxRegion): Observable<any> {
    if (region) {
      return from(
        this.storage.set(`${BOTOX_REGION_STORAGE_KEY}${region.title}`, region)
      );
    }
  }
  remove(region: string): Observable<any> {
    return from(
      this.storage.remove(`${BOTOX_REGION_STORAGE_KEY}${region}`)
    );
  }
  getSingle(region: BotoxRegion): Observable<string> {
    return from(this.storage.get(`${BOTOX_REGION_STORAGE_KEY}${region.title}`));
  }
  list(): Observable<BotoxRegion[]> {
    return from(
      this.storage.keys().then(keys =>
        Promise.all(
          keys.map(async key => {
            const contains = key.startsWith(BOTOX_REGION_STORAGE_KEY);
            if (contains) {
              const value = await this.storage.get(key);
              if (!isNullOrUndefined(value)) {
                console.debug(value);
                return value;
              }
            }
          })
        )
      )
    );
  }
}
