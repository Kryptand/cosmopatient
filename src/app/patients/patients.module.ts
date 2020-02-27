import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PatientImageComparisonComponent} from './components/patient-image-comparison/patient-image-comparison.component';
import {PatientImageGalleryComponent} from './container/patient-image-gallery/patient-image-gallery.component';
import {PatientImageComponent} from './components/patient-image/patient-image.component';
import {IonicModule} from '@ionic/angular';
import {PatientPersistor} from './services/patient-persistor.service';

import {TreatmentPersistor} from './services/patient-treatment-persistor.service';
import {AutofocusFixModule} from 'ngx-autofocus-fix';
import {PhotoPersistor} from './services/patient-photo-persistor.service';
import {PatientImageContainerComponent} from './container/patient-image-container/patient-image-container.component';
import {PatientAddEditTreatmentComponent} from './components/patient-add-edit-treatment/patient-add-edit-treatment.component';
import {PatientTreatmentComponent} from './components/patient-treatment/patient-treatment.component';
import {PatientAddEditTreatmentContainerComponent} from './container/patient-add-edit-treatment-container/patient-add-edit-treatment-container.component';
import {NullOrUndefinedPipe} from './pipes/null-or-undefined.pipe';
import {Camera} from '@ionic-native/camera/ngx';
import {ImportExportService} from './services/export-import.service';
import {PhotoSelector} from './services/photo-selector.service';
import {SharedModule} from '../shared/shared.module';
import {LazyCompDirective} from '../util/lazy-comp.directive';
import {PatientListContainer} from './container/patient/patient-list-container.component';

const PATIENT_COMPONENTS = [
    PatientImageComparisonComponent,
    PatientImageContainerComponent,
    PatientAddEditTreatmentComponent,
    PatientImageGalleryComponent,
    NullOrUndefinedPipe,
    PatientTreatmentComponent,
    PatientAddEditTreatmentContainerComponent,
    PatientImageComponent,
    LazyCompDirective
];

@NgModule({
  imports: [
      SharedModule,
      IonicModule,
      CommonModule,
      AutofocusFixModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild([
          {path: '', component: PatientListContainer},
          {path: 'treatments/:id', component: PatientImageGalleryComponent}
      ])
  ],
  providers: [
    PatientPersistor,
    TreatmentPersistor,
    PhotoPersistor,
    Camera,
    ImportExportService,
    PhotoSelector
  ],
    declarations: PATIENT_COMPONENTS
})
export class PatientsPageModule {}
