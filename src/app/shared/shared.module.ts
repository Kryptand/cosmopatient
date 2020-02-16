import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListWithFabComponent } from './list-with-fab/list-with-fab.component';
import { IonicModule } from '@ionic/angular';
import { FormComponent } from './form/form.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudContainerComponent } from './crud-container/crud-container.component';
import { OverlayContainerComponent } from './overlay-container/overlay-container.component';
import { RepeatComponent } from './repeat/repeat.component';
import { AutoCompleteComponent } from 'ionic4-auto-complete';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ListWithFabComponent,
    FormComponent,
    CrudContainerComponent,
    OverlayContainerComponent
  ],
  exports: [
    ListWithFabComponent,
    FormComponent,
    CrudContainerComponent,
    OverlayContainerComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    IonicModule,
    FormlyModule.forChild({
      types: [
        { name: 'repeat', component: RepeatComponent },
        { name: 'autocomplete', component: AutocompleteComponent }
      ]
    }),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
