import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractOverlayContainer } from '../../../shared/abstract-overlay-container';
import { NavParams } from '@ionic/angular';
import { ThreadRegion } from '../../services/region-persistor.service';

@Component({
  selector: 'app-thread-add-edit-region-container',
  templateUrl: './thread-add-edit-region-container.component.html',
  styleUrls: ['./thread-add-edit-region-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadAddEditRegionContainerComponent extends AbstractOverlayContainer<
  ThreadRegion
> {
  constructor(protected navParams: NavParams) {
    super(navParams);
  }
}
