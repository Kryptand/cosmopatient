import {PopoverController} from '@ionic/angular';
import {Type} from '@angular/core';

export const NO_POPOVER_CONTROLLER = 'no PopoverController provided';
export const NO_COMPONENT = 'no component provided';
export const openOverlayAndEmitResult: (popoverController: PopoverController, component: Type<any>, overlayProps?: any) => Promise<any> = async (
    popoverController: PopoverController,
    component: Type<any>,
    overlayProps?: any
) => {
  if (!popoverController) {
    throw new Error(NO_POPOVER_CONTROLLER);
  }
  if (!component) {
    throw new Error(NO_COMPONENT);
  }
  const popover = await popoverController.create({
    component: component,
    componentProps: {...overlayProps, popover: popoverController}
  });
  await popover.present();
  const result = await popover.onDidDismiss();
  return result.data;
};
