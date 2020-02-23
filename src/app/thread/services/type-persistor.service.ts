import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AbstractPersistor} from '../../util/abstract-persistor';

const THREAD_TYPE_STORAGE_KEY = '[THREAD_TYPE]';

export class ThreadType {
  id: string;
  title: string;
  price: number;
}

@Injectable({providedIn: 'root'})
export class ThreadTypePersistor extends AbstractPersistor<ThreadType> {
  constructor(protected storage: Storage) {
    super(storage, THREAD_TYPE_STORAGE_KEY, ThreadType);
  }
}
