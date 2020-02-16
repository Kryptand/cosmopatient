import { Injectable } from '@angular/core';
import { AbstractPersistor } from '../../util/abstract-persistor';
import { Storage } from '@ionic/storage';
const BOTOX_TYPE_STORAGE_KEY = '[BOTOX_TYPE]';
export interface BotoxType {
  id: string;
  title: string;
  pricePerUnit: number;
}
@Injectable({ providedIn: 'root' })
export class BotoxTypePersistor extends AbstractPersistor<BotoxType> {
  constructor(protected storage: Storage) {
    super(storage, BOTOX_TYPE_STORAGE_KEY);
  }
}
