import { Component, OnInit } from '@angular/core';
import { AbstractOverlayContainer } from '../abstract-overlay-container';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'kryptand-overlay-container',
  templateUrl: './overlay-container.component.html',
  styleUrls: ['./overlay-container.component.scss']
})
export class OverlayContainerComponent extends AbstractOverlayContainer<any> {
  constructor(protected navParams: NavParams) {
    super(navParams);
  }
}
