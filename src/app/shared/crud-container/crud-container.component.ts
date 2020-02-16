import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import { AbstractCrudContainer } from '../abstract-crud-container';
import { PopoverController } from '@ionic/angular';
import { OverlayContainerComponent } from '../overlay-container/overlay-container.component';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'kryptand-crud-container',
  templateUrl: './crud-container.component.html',
  styleUrls: ['./crud-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudContainerComponent extends AbstractCrudContainer<any> {
  @Input() backRef: string;
  @Input() title: string;
  @Input() templateRef: TemplateRef<any>;
  @Input() fieldConfig: FormlyFieldConfig[];

  constructor(protected popoverController: PopoverController) {
    super();
  }

  public async openOverlay(type?: any): Promise<any> {
    const clonedType = { ...type };
    return this.openOverlayWithProps(
      { entity: type, fields: this.fieldConfig },
      this.popoverController,
      OverlayContainerComponent,
      clonedType
    );
  }
}
