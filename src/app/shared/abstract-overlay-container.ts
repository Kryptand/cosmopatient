import { NavParams, PopoverController } from '@ionic/angular';

export abstract class AbstractOverlayContainer<T> {
  pop: PopoverController;
  entity: T;
  constructor(protected navParams: NavParams) {
    this.pop = navParams.get('popover');
    this.entity = navParams.get('entity');
  }
  saveEntityEmitted(entity: T) {
    this.pop.dismiss(entity);
  }
}
