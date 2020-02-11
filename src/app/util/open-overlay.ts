import { PopoverController } from '@ionic/angular';
import { Type } from '@angular/core';

export const openOverlayAndEmitResult = async function(
  overlayProps: any,
  popoverController: PopoverController,
  component: Type<any>
) {
  const popover = await popoverController.create({
    component: component,
    componentProps: { ...overlayProps, popover: this.popoverController }
  });
  await popover.present();
  const result = await popover.onDidDismiss();
  return result.data;
};
