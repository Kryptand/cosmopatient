import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  BotoxRegion,
  BotoxRegionPersistor
} from '../../services/region-persistor.service';
import { PopoverController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { BotoxRegionAddEditContainerComponent } from '../region-add-edit-container/region-add-edit-container.component';

@Component({
  selector: 'kryptand-botox-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BotoxRegionListComponent {
  refresh$ = new BehaviorSubject(undefined);
  public regions$ = this.refresh$.pipe(
    switchMap(() => this.regionPersistor.list())
  );
  constructor(
    private regionPersistor: BotoxRegionPersistor,
    private popoverController: PopoverController
  ) {}

  delete(region: string) {
    this.regionPersistor.remove(region).subscribe(_ => this.refreshRegions());
  }

  async openOverlay(region?: BotoxRegion) {
    const popover = await this.popoverController.create({
      component: BotoxRegionAddEditContainerComponent,
      componentProps: { region, popover: this.popoverController }
    });
    await popover.present();
    const result = await popover.onDidDismiss();
    const toSave = result.data;
    if (toSave) {
      region &&
        region.title !== toSave.title &&
        this.regionPersistor.remove(region.title);
      this.regionPersistor.save(toSave).subscribe(_ => this.refreshRegions());
    }
  }

  private refreshRegions() {
    this.refresh$.next(undefined);
  }
}
