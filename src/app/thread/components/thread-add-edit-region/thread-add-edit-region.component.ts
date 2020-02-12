import { Component, OnInit } from '@angular/core';
import { AbstractEntityAddEditComponent } from '../../../shared/abstract-add-edit-component';
import { ThreadType } from '../../services/type-persistor.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ThreadRegion } from '../../services/region-persistor.service';

@Component({
  selector: 'app-thread-add-edit-region',
  templateUrl: './thread-add-edit-region.component.html',
  styleUrls: ['./thread-add-edit-region.component.scss']
})
export class ThreadAddEditRegionComponent extends AbstractEntityAddEditComponent<
  ThreadRegion
> {
  public formGroup: FormGroup = new FormGroup({
    title: new FormControl(),
    suggestThreadTypeId: new FormControl()
  });
}
