import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotoxRegionListComponent } from './containers/region-list/region-list.component';
import { BotoxPricePerAmountComponent } from './containers/price-per-amount/price-per-amount.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotoxRegionAddEditContainerComponent } from './containers/region-add-edit-container/region-add-edit-container.component';

import { BotoxAddEditTreatmentComponent } from './components/botox-add-edit-treatment/botox-add-edit-treatment.component';
import { BotoxAddEditTreatmentContainerComponent } from './containers/botox-add-edit-treatment-container/botox-add-edit-treatment-container.component';

import { Overlay } from '@angular/cdk/overlay';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { BotoxRegionContainer } from './containers/botox-region-container/botox-region-container.component';
import { SharedModule } from '../shared/shared.module';
import { BotoxTypeListComponent } from './containers/type-list/botox-type-list.component';
@NgModule({
  declarations: [
    BotoxAddEditTreatmentComponent,
    BotoxAddEditTreatmentContainerComponent,
    BotoxRegionAddEditContainerComponent,
    BotoxRegionListComponent,
    BotoxPricePerAmountComponent,
    BotoxTypeListComponent,
    BotoxRegionContainer
  ],
  providers: [Overlay],
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BotoxModule {}
