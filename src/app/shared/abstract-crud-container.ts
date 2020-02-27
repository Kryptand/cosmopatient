import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AbstractPersistor } from '../util/abstract-persistor';
import { openOverlayAndEmitResult } from '../util/open-overlay';
import { PopoverController } from '@ionic/angular';
import { Input, Type } from '@angular/core';

export abstract class AbstractCrudContainer<T> {
  refresh$ = new BehaviorSubject(undefined);
  @Input() persistorInstance: AbstractPersistor<T>;
  public entities$ = this.refresh$.pipe(
      switchMap(() => this.persistorInstance.list())
  );

  constructor(private persistor?: AbstractPersistor<T>) {
    if (persistor) {
      this.persistorInstance = persistor;
    }
  }

  delete(entity: any): void {
    if (entity) {
      this.persistorInstance.remove(entity).subscribe(_ => this.refreshList());
    }
  }

  create(entity: T): void {
    if (entity) {
      this.persistorInstance.save(entity).subscribe(_ => this.refreshList());
    }
  }

  async openOverlayWithProps(
      overlayProps: any,
      popoverController: PopoverController,
    component: Type<any>,
    currentValue?: any
  ): Promise<void> {
    const formResult = await openOverlayAndEmitResult(popoverController, component, overlayProps);
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
    if (entity) {
      this.persistorInstance.update(entity).subscribe(_ => this.refreshList());
    }
  }
  private refreshList(): void {
    this.refresh$.next(undefined);
  }
}
