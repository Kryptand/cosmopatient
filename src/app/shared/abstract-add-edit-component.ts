import { EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export abstract class AbstractEntityAddEditComponent<T> {
  @Input()
  entity: T | any = {};
  @Output() saveEntity: EventEmitter<T> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  public abstract formGroup: FormGroup;
  public save() {
    this.saveEntity.emit(this.formGroup.value);
  }
}
