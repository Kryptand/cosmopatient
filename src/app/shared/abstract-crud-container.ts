import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AbstractPersistor } from '../util/abstract-persistor';
import { openOverlayAndEmitResult } from '../util/open-overlay';
import { PopoverController } from '@ionic/angular';
import { Type } from '@angular/core';
export abstract class AbstractCrudContainer<T> {
  refresh$ = new BehaviorSubject(undefined);
  public entities$ = this.refresh$.pipe(switchMap(() => this.persistor.list()));
  constructor(private persistor: AbstractPersistor<T>) {}

  delete(key: string): void {
    this.persistor.remove(key).subscribe(_ => this.refreshList());
  }
  create(entity: T): void {
    this.persistor.save(entity).subscribe(_ => this.refreshList());
  }
  async openOverlayWithProps(
    overlayProps: any,
    popoverController: PopoverController,
    component: Type<any>,
    currentValue?: any
  ): Promise<void> {
    const formResult = await openOverlayAndEmitResult(
      overlayProps,
      popoverController,
      component
    );
    return this.handleOverlayResult(formResult, currentValue);
  }

  handleOverlayResult(currentValue: any, originalValue?: any): void {
    if (
      originalValue &&
      currentValue &&
      JSON.stringify(originalValue) !== JSON.stringify(currentValue)
    ) {
      this.update(currentValue);
      return;
    }
    this.create(currentValue);
  }
  update(entity: T): void {
    this.persistor.update(entity).subscribe(_ => this.refreshList());
  }
  private refreshList(): void {
    this.refresh$.next(undefined);
  }
}
