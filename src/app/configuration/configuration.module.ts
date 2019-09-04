import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurationPage } from './configuration.page';
import { ImportExportService } from '../patients/services/export-import.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ConfigurationPage }])
  ],
  declarations: [ConfigurationPage],
  providers:[
    ImportExportService
  ]
})
export class ConfigurationPageModule {}
