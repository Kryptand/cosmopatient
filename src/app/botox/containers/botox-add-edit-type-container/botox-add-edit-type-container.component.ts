import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractOverlayContainer } from '../../../shared/abstract-overlay-container';
import { NavParams } from '@ionic/angular';
import { BotoxType } from '../../services/type-persistor.service';

@Component({
  selector: 'kryptand-botox-add-edit-type-container',
  templateUrl: './botox-add-edit-type-container.component.html',
  styleUrls: ['./botox-add-edit-type-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxAddEditTypeContainerComponent extends AbstractOverlayContainer<
  BotoxType
> {
  constructor(protected navParams: NavParams) {
    super(navParams);
  }
}
