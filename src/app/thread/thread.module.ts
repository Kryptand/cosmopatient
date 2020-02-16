import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { ThreadRegionContainerComponent } from './containers/region/thread-region-container.component';
import { ThreadTypeContainerComponent } from './containers/type/thread-type-container.component';

@NgModule({
  declarations: [ThreadRegionContainerComponent, ThreadTypeContainerComponent],
  providers: [Overlay],
  imports: [
    IonicModule,
    CommonModule,

    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'regions', component: ThreadRegionContainerComponent },
      { path: 'types', component: ThreadTypeContainerComponent }
    ])
  ]
})
export class ThreadModule {}
