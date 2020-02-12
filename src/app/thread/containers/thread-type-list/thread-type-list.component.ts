import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractCrudContainer } from '../../../shared/abstract-crud-container';
import { PopoverController } from '@ionic/angular';
import {
  ThreadType,
  ThreadTypePersistor
} from '../../services/type-persistor.service';
import { ThreadAddEditTypeContainerComponent } from '../thread-add-edit-type-container/thread-add-edit-type-container.component';

@Component({
  selector: 'app-thread-type-list',
  templateUrl: './thread-type-list.component.html',
  styleUrls: ['./thread-type-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadTypeListComponent extends AbstractCrudContainer<ThreadType> {
  constructor(
    protected regionPersistor: ThreadTypePersistor,
    protected popoverController: PopoverController
  ) {
    super(regionPersistor);
  }
  async openOverlay(threadType?: ThreadTypePersistor) {
    return this.openOverlayWithProps(
      { entity: threadType },
      this.popoverController,
      ThreadAddEditTypeContainerComponent,
      threadType
    );
  }
}
