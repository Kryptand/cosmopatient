import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import * as uuid from 'uuid';
export abstract class AbstractPersistor<T> {
  constructor(
    protected storage: Storage,
    protected STORAGE_KEY: string,
    protected idProperty: string = 'id'
  ) {}
  save(entity: any): Observable<any> {
    console.debug(entity);
    if (entity) {
      if (this.idProperty === 'id') {
        if (!entity.id) {
          entity.id = uuid.v4();
        }
        return from(
          this.storage.set(`${this.STORAGE_KEY}${entity.id}`, entity)
        );
      }
      return from(
        this.storage.set(
          `${this.STORAGE_KEY}${entity[this.idProperty]}`,
          entity
        )
      );
    }
  }

  remove(id: string): Observable<any> {
    return from(this.storage.remove(`${this.STORAGE_KEY}${id}`));
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

  private async getEntries(): Promise<T[]> {
    const keys = await this.storage.keys();
    let values: T[] = [];
    for (const key of keys) {
      const contains = key.startsWith(this.STORAGE_KEY);
      console.debug(this.STORAGE_KEY);
      if (contains) {
        const value = await this.storage.get(key);
        if (!isNullOrUndefined(value)) {
          values = [...values, value];
        }
      }
    }
    return values;
  }
}
