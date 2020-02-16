import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListWithFabComponent } from './list-with-fab/list-with-fab.component';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from './form/form.component';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListWithFabComponent, FormComponent],
  exports: [ListWithFabComponent, FormComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormlyModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
