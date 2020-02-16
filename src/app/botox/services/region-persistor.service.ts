import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AbstractPersistor } from '../../util/abstract-persistor';
const BOTOX_REGION_STORAGE_KEY = '[BOTOX_REGION]';
export interface BotoxRegion {
  id: string;
  title: string;
  suggestedAmount: number;
}
@Injectable({ providedIn: 'root' })
export class BotoxRegionPersistor extends AbstractPersistor<BotoxRegion> {
  constructor(protected storage: Storage) {
    super(storage, BOTOX_REGION_STORAGE_KEY);
  }
}
