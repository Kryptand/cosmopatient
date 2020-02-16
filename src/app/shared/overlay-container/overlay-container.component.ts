import {
  AfterViewInit,
  Component,
  ComponentRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { AbstractOverlayContainer } from '../abstract-overlay-container';
import { NavParams } from '@ionic/angular';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'kryptand-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss']
})
export class OverlayContainerComponent extends AbstractOverlayContainer<any>
  implements AfterViewInit {
  @ViewChild('formComponent') formComponent!: FormComponent;
  constructor(protected navParams: NavParams) {
    super(navParams);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.formComponent.formGroup.reset(), 0);
  }
}
