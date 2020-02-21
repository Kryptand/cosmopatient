import { BotoxAddEditTreatmentComponent } from './components/botox-add-edit-treatment/botox-add-edit-treatment.component';
import { IonicModule } from '@ionic/angular';
import { BotoxAddEditTreatmentContainerComponent } from './containers/botox-add-edit-treatment-container/botox-add-edit-treatment-container.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BotoxPricePerAmountComponent } from './containers/price-per-amount/price-per-amount.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotoxTypeContainerComponent } from './containers/type/botox-type-container.component';
import { SharedModule } from '../shared/shared.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Overlay } from '@angular/cdk/overlay';
import { BotoxRegionContainerComponent } from './containers/region/botox-region-container.component';
import { RouterModule } from '@angular/router';
import { FormComponentContainer } from './containers/form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BotoxFormComponent } from './components/botox-form/botox-form.component';

@NgModule({
  declarations: [
    BotoxAddEditTreatmentComponent,
    BotoxAddEditTreatmentContainerComponent,
    BotoxPricePerAmountComponent,
    BotoxTypeContainerComponent,
    BotoxRegionContainerComponent,
    BotoxFormComponent,
    FormComponentContainer
  ],
  exports: [BotoxFormComponent],
  providers: [Overlay],
  imports: [
    IonicModule,
    CommonModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'regions', component: BotoxRegionContainerComponent },
      { path: 'types', component: BotoxTypeContainerComponent },
      { path: 'form', component: FormComponentContainer }
    ])
  ]
})
export class BotoxModule {}
