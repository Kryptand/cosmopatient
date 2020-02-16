import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractEntityAddEditComponent } from '../abstract-add-edit-component';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'kryptand-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent extends AbstractEntityAddEditComponent<any> {
  @Input() fields: FormlyFieldConfig[];
  @Input() formGroup: FormGroup = new FormGroup({});
  constructor() {
    super();
  }
}
