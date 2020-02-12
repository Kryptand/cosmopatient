import { Component, OnInit } from '@angular/core';
import { AbstractCrudContainer } from '../../../shared/abstract-crud-container';
import {
  ThreadType,
  ThreadTypePersistor
} from '../../services/type-persistor.service';
import { PopoverController } from '@ionic/angular';
import { ThreadAddEditTypeContainerComponent } from '../thread-add-edit-type-container/thread-add-edit-type-container.component';
import {
  ThreadRegion,
  ThreadRegionPersistor
} from '../../services/region-persistor.service';
import { ThreadAddEditRegionContainerComponent } from '../thread-add-edit-region-container/thread-add-edit-region-container.component';

@Component({
  selector: 'app-thread-region-list',
  templateUrl: './thread-region-list.component.html',
  styleUrls: ['./thread-region-list.component.scss']
})
export class ThreadRegionListComponent extends AbstractCrudContainer<
  ThreadRegion
> {
  constructor(
    protected regionPersistor: ThreadRegionPersistor,
    protected popoverController: PopoverController
  ) {
    super(regionPersistor);
  }
  async openOverlay(threadRegion?: ThreadRegionPersistor) {
    return this.openOverlayWithProps(
      { entity: threadRegion },
      this.popoverController,
      ThreadAddEditRegionContainerComponent,
      threadRegion
    );
  }
}
