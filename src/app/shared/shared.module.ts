import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListWithFabComponent } from './list-with-fab/list-with-fab.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ListWithFabComponent],
  exports: [ListWithFabComponent],
  imports: [CommonModule, IonicModule]
})
export class SharedModule {}
