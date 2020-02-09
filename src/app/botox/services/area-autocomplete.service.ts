import { AutoCompleteService } from 'ionic4-auto-complete/auto-complete.service';
import { Injectable } from '@angular/core';
import { BotoxRegion, BotoxRegionPersistor } from './region-persistor.service';
import { map } from 'rxjs/operators';
@Injectable()
export class AreaAutoCompleteService implements AutoCompleteService {
  constructor(private regionPersistor: BotoxRegionPersistor) {}
  getResults(keyword) {
    keyword = keyword.toLowerCase();
    return this.regionPersistor.list().pipe(
      map((results: BotoxRegion[]) => {
        console.debug(results);
        if (results) {
          return keyword
            ? results.filter(
                result =>
                  result !== undefined &&
                  result.title.toLowerCase().startsWith(keyword)
              )
            : results.filter(result => result !== undefined);
        }
        return [];
      })
    );
  }
}
