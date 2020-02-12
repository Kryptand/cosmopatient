import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AbstractEntityAddEditComponent} from '../../../shared/abstract-add-edit-component';
import {FormControl, FormGroup} from '@angular/forms';
import {BotoxType} from '../../services/type-persistor.service';

@Component({
  selector: 'kryptand-botox-add-edit-type',
  templateUrl: './botox-add-edit-type.component.html',
  styleUrls: ['./botox-add-edit-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxAddEditTypeComponent extends AbstractEntityAddEditComponent<
  BotoxType
> {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    pricePerUnit: new FormControl()
  });
}
