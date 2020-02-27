import {NO_VALUEOBJECT_ERROR, patchFormValue} from './patch-form';
import {
  NO_COMPONENT,
  NO_POPOVER_CONTROLLER,
  openOverlayAndEmitResult
} from './open-overlay';
import {PopoverController} from '@ionic/angular';
import Mock = jest.Mock;
import {AngularDelegate} from '@ionic/angular/providers/angular-delegate';
import {ComponentFactoryResolver, Injector} from '@angular/core';
import {PopoverOptions} from '@ionic/core';

export const createSpyObj = (
    baseName,
    methodNames
): { [key: string]: Mock<any> } => {
  let obj: any = {};

  for (let i = 0; i < methodNames.length; i++) {
    obj[methodNames[i]] = jest.fn();
  }

  return obj;
};

export class PopoverMock {
  public static instance(): any {
    let instance = createSpyObj('Popover', [
      'present',
      'dismissAll',
      'setContent',
      'setSpinner'
    ]);
    return instance;
  }
}

export class PopoverControllerMock {
  private angularDelegate;
  resolver;
  injector;
  present = () => jest.fn();

  create(popOver?: PopoverMock): any {
    let instance = createSpyObj('PopoverController', ['create', 'present']);
    return this;
  }

  ctrl;
  dismiss;
  getTop;
  onDidDismiss = async (): Promise<{ data: { a: string } }> => {
    return {
      data: {
        a: 'a'
      }
    };
  };
}

class StubComponent {
}

describe('openOverlay', async () => {
  it('should throw an error if there is no popovercontroller provided', async () => {
    try {
      await openOverlayAndEmitResult(null, StubComponent);
    } catch (e) {
      expect(e.message).toMatch(NO_POPOVER_CONTROLLER);
    }
  });
  it('should throw an error if there is no component provided', async () => {
    try {
      await openOverlayAndEmitResult(
          (<any> new PopoverControllerMock()) as PopoverController,
          null
      );
    } catch (e) {
      expect(e.message).toMatch(NO_COMPONENT);
    }
  });
  it('should create an overlay instance with the values supplied', async () => {
    const data = await openOverlayAndEmitResult(
        (<any> new PopoverControllerMock()) as PopoverController,
        StubComponent
    );
    expect(data).toEqual({
      a: 'a'
    });
  });
});
