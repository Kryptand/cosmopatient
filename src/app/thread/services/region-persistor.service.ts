import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AbstractPersistor } from '../../util/abstract-persistor';

const THREAD_REGION_STORAGE_KEY = '[THREAD_REGION]';
export interface ThreadRegion {
  title: string;
  suggestedThreadTypeId: string;
}
@Injectable({ providedIn: 'root' })
export class ThreadRegionPersistor extends AbstractPersistor<ThreadRegion> {
  constructor(protected storage: Storage) {
    super(storage, THREAD_REGION_STORAGE_KEY, 'title');
  }
}
