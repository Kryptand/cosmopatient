import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BotoxRegion } from '../../services/region-persistor.service';
import {AbstractEntityAddEditComponent} from '../../../shared/abstract-add-edit-component';

@Component({
  selector: 'kryptand-botox-region-add-edit',
  templateUrl: './region-add-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionAddEditComponent extends AbstractEntityAddEditComponent<
  BotoxRegion
> {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    suggestedAmount: new FormControl()
  });
}
