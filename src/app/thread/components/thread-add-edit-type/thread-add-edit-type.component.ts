import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractEntityAddEditComponent } from '../../../shared/abstract-add-edit-component';
import { FormControl, FormGroup } from '@angular/forms';
import { ThreadType } from '../../services/type-persistor.service';

@Component({
  selector: 'kryptand-thread-add-edit-type',
  templateUrl: './thread-add-edit-type.component.html',
  styleUrls: ['./thread-add-edit-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadAddEditTypeComponent extends AbstractEntityAddEditComponent<
  ThreadType
> {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    price: new FormControl()
  });
}
