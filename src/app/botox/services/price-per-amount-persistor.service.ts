import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';

const BOTOX_PRICE_PER_AMOUNT_PERSISTOR = '[BOTOX_PRICE_PER_AMOUNT]';

@Injectable({providedIn:'root'})
export class PricePerAmountPersistor {
  constructor(private storage: Storage) {}
  save(price: number): Observable<any> {
    return from(this.storage.set(`${BOTOX_PRICE_PER_AMOUNT_PERSISTOR}`, price));
  }
  currentPrice(): Observable<number> {
    return from(this.storage.get(`${BOTOX_PRICE_PER_AMOUNT_PERSISTOR}`));
  }
}
