import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'nullOrUndefined'
})
export class NullOrUndefinedPipe implements PipeTransform {
  transform(items: any[]): any {
    if (!items) {
      return;
    }
    return items.filter(x => !isNullOrUndefined(x));
  }
}
