import {Injectable} from '@angular/core';
import {AbstractPersistor} from '../../util/abstract-persistor';
import {Storage} from '@ionic/storage';
import {AbstractProductType} from '../../shared/abstract-type';

const BOTOX_TYPE_STORAGE_KEY = '[BOTOX_TYPE]';

export class BotoxType extends AbstractProductType {
    id: string;
}

@Injectable({providedIn: 'root'})
export class BotoxTypePersistor extends AbstractPersistor<BotoxType> {
    constructor(protected storage: Storage) {
        super(storage, BOTOX_TYPE_STORAGE_KEY, BotoxType);
  }
}
