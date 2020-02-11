import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';

export abstract class AbstractPersistor<T> {
  constructor(
    protected storage: Storage,
    protected STORAGE_KEY: string,
    protected idProperty: string = 'id'
  ) {}
  save(entity: any): Observable<any> {
    if (entity) {
      if (this.idProperty === 'id') {
        entity.id = uuid.v4();
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
    return from(
      this.storage.keys().then(keys =>
        Promise.all(
          keys.map(async key => {
            const contains = key.startsWith(this.STORAGE_KEY);
            if (contains) {
              const value = await this.storage.get(key);
              if (!isNullOrUndefined(value)) {
                return value;
              }
            }
          })
        )
      )
    );
  }
}
