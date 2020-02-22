import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientsPage } from './patients.page';
import { PatientListComponent } from './container/patient-list/patient-list.component';
import { PatientAddEditComponent } from './components/patient-add-edit/patient-add-edit.component';
import { PatientAddEditContainerComponent } from './container/patient-add-edit-container/patient-add-edit-container.component';
import { PatientImageComparisonComponent } from './components/patient-image-comparison/patient-image-comparison.component';
import { PatientImageGalleryComponent } from './container/patient-image-gallery/patient-image-gallery.component';
import { PatientImageComponent } from './components/patient-image/patient-image.component';
import { IonicModule } from '@ionic/angular';
import { PatientPersistor } from './services/patient-persistor.service';

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
import {BotoxModule} from '../botox/botox.module';
import {ThreadModule} from '../thread/thread.module';
import {SharedModule} from '../shared/shared.module';

const PATIENT_COMPONENTS = [
  PatientListComponent,
  PatientAddEditComponent,
  PatientAddEditContainerComponent,
  PatientImageComparisonComponent,
  PatientImageContainerComponent,
  PatientAddEditTreatmentComponent,
  PatientImageGalleryComponent,
  NullOrUndefinedPipe,
  PatientTreatmentComponent,
  PatientAddEditTreatmentContainerComponent,
  PatientImageComponent
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AutofocusFixModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: PatientsPage},
      {path: 'treatments/:id', component: PatientImageGalleryComponent}
    ]),
    SharedModule
  ],
  providers: [
    PatientPersistor,
    TreatmentPersistor,
    PhotoPersistor,
    Camera,
    ImportExportService,
    PhotoSelector
  ],
  declarations: [PatientsPage, ...PATIENT_COMPONENTS],
  entryComponents: [
    PatientAddEditComponent,
    PatientImageComparisonComponent,
    PatientAddEditContainerComponent,
    PatientAddEditTreatmentContainerComponent
  ]
})
export class PatientsPageModule {}
