import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotoxRegionListComponent } from './containers/region-list/region-list.component';
import { BotoxPricePerAmountComponent } from './containers/price-per-amount/price-per-amount.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotoxRegionAddEditContainerComponent } from './containers/region-add-edit-container/region-add-edit-container.component';
import { BotoxRegionAddEditComponent } from './components/region-add-edit/region-add-edit.component';

import { BotoxAddEditTreatmentComponent } from './components/botox-add-edit-treatment/botox-add-edit-treatment.component';
import { BotoxAddEditTreatmentContainerComponent } from './containers/botox-add-edit-treatment-container/botox-add-edit-treatment-container.component';

import { Overlay } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BotoxPage } from './botox.page';

@NgModule({
  declarations: [
    BotoxAddEditTreatmentComponent,
    BotoxAddEditTreatmentContainerComponent,
    BotoxRegionAddEditContainerComponent,
    BotoxRegionAddEditComponent,
    BotoxRegionListComponent,
    BotoxPricePerAmountComponent,
    BotoxPage
  ],
  providers: [Overlay],
  imports: [
    IonicModule,
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [BotoxRegionAddEditComponent]
})
export class BotoxModule {}
