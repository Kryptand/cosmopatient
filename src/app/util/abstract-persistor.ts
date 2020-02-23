import {Storage} from '@ionic/storage';
import {from, Observable} from 'rxjs';
import {isNullOrUndefined} from 'util';
import * as uuid from 'uuid';
import {getKeyNamesFromModel} from '../shared/key-decorator';

export const getEntriesFromStorageByKeyAsync = async (
    storageKey: string,
    storageInstance: Storage
) => {
  const keys = await storageInstance.keys();
  let values = [];
  for (const key of keys) {
    const contains = key.startsWith(storageKey);
    if (contains) {
      const value = await storageInstance.get(storageKey);
      if (!isNullOrUndefined(value)) {
        values = [...values, value];
      }
    }
  }
  return values;
};
export const removeEntriesFromStorageAsync = async (
    keyPattern: string,
    storageInstance: Storage,
    removeHook?: Function
) => {
  return storageInstance.keys().then(keys =>
      Promise.all(
          keys.map(k => {
            const contains = k.startsWith(keyPattern);
            if (contains) {
              removeHook(k);
              return storageInstance.remove(k);
            }
          })
      )
  );
};

export abstract class AbstractPersistor<T> {
  constructor(
      protected storage: Storage,
      protected STORAGE_KEY: string,
      protected type: new () => T
  ) {
  }

  getKeys(object: T | any) {
    const keyNames = getKeyNamesFromModel(this.type);
    if (keyNames) {
      return keyNames.map(key => object[key]);
    }
    return [object.id];
  }

  save(entity: any): Observable<any> {
    if (!entity.id) {
      entity.id = uuid.v4();
    }
    const keys = this.getKeys(entity).join();
    return from(this.storage.set(`${this.STORAGE_KEY}${keys}`, entity));
  }

  removeByKey(id: string): Observable<any> {
    return from(this.storage.remove(`${this.STORAGE_KEY}${id}`));
  }

  remove(entity: any): Observable<any> {
    const keys = this.getKeys(entity).join();
    return from(this.storage.remove(`${this.STORAGE_KEY}${keys}`));
  }

  update(type: any): Observable<any> {
    return this.save(type);
  }

  getSingle(id: string): Observable<T> {
    return from(this.storage.get(`${this.STORAGE_KEY}${id}`));
  }

  list(): Observable<T[]> {
    return from(this.getEntries());
  }

  private getEntries = async (): Promise<T[]> =>
      getEntriesFromStorageByKeyAsync(this.STORAGE_KEY, this.storage);
}
