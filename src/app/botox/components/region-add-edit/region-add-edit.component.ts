import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BotoxRegion } from '../../services/region-persistor.service';
import { patchFormValue } from '../../../util/patch-form';

@Component({
  selector: 'kryptand-botox-region-add-edit',
  templateUrl: './region-add-edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionAddEditComponent implements OnInit {
  @Input()
  region: BotoxRegion;
  @Output() saveRegionEventTriggered: EventEmitter<
    BotoxRegion
  > = new EventEmitter();
  public regionForm: FormGroup = new FormGroup({
    title: new FormControl(),
    suggestedAmount: new FormControl()
  });
  public ngOnInit() {
    if (!this.region) {
      return;
    }
    patchFormValue(this.region, this.regionForm);
  }
  public save() {
    this.saveRegionEventTriggered.emit(this.regionForm.value);
  }
}
