import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurationPage } from './configuration.page';
import { ImportExportService } from '../patients/services/export-import.service';
import { BotoxModule } from '../botox/botox.module';
import { BotoxRegionListComponent } from '../botox/containers/region-list/region-list.component';
import { BotoxPage } from '../botox/botox.page';

@NgModule({
  imports: [
    IonicModule,
    BotoxModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ConfigurationPage },
      { path: 'botox', component: BotoxPage }
    ])
  ],
  declarations: [ConfigurationPage],
  providers: [ImportExportService]
})
export class ConfigurationPageModule {}
