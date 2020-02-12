import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractOverlayContainer } from '../../../shared/abstract-overlay-container';
import { NavParams } from '@ionic/angular';
import { ThreadType } from '../../services/type-persistor.service';

@Component({
  selector: 'app-thread-add-edit-type-container',
  templateUrl: './thread-add-edit-type-container.component.html',
  styleUrls: ['./thread-add-edit-type-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadAddEditTypeContainerComponent extends AbstractOverlayContainer<
  ThreadType
> {
  constructor(protected navParams: NavParams) {
    super(navParams);
  }
}
