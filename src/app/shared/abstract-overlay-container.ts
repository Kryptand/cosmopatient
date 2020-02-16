import { NavParams, PopoverController } from '@ionic/angular';

export abstract class AbstractOverlayContainer<T> {
  pop: PopoverController;
  entity: T;
  fields;
  constructor(protected navParams: NavParams) {
    this.pop = navParams.get('popover');
    this.entity = navParams.get('entity');
    this.fields = navParams.get('fields');
  }
  saveEntityEmitted(entity: T): void {
    this.pop.dismiss(entity).then(r => r);
  }
}
