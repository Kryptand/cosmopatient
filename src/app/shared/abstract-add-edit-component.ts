import { EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { patchFormValue } from '../util/patch-form';

export abstract class AbstractEntityAddEditComponent<T> {
  @Input()
  entity: T;
  @Output() saveEntityEmitted: EventEmitter<T> = new EventEmitter();
  public abstract formGroup: FormGroup;
  public ngOnInit() {
    if (!this.entity) {
      return;
    }
    patchFormValue(this.entity, this.formGroup);
  }
  public save() {
    this.saveEntityEmitted.emit(this.formGroup.value);
  }
}
