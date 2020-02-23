import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AbstractPersistor} from '../../util/abstract-persistor';
import {AbstractProductType} from '../../shared/abstract-type';

const THREAD_REGION_STORAGE_KEY = '[THREAD_REGION]';

export class ThreadRegion extends AbstractProductType {
    id: string;
}

@Injectable({providedIn: 'root'})
export class ThreadRegionPersistor extends AbstractPersistor<ThreadRegion> {
    constructor(protected storage: Storage) {
        super(storage, THREAD_REGION_STORAGE_KEY, ThreadRegion);
    }
}
