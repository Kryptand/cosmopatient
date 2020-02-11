import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfigurationPage } from './configuration.page';
import { ImportExportService } from '../patients/services/export-import.service';
import { BotoxModule } from '../botox/botox.module';
import { BotoxRegionListComponent } from '../botox/containers/region-list/region-list.component';
import { BotoxRegionContainer } from '../botox/containers/botox-region-container/botox-region-container.component';
import { BotoxTypeContainer } from '../botox/containers/botox-type-container/botox-type-container.component';

@NgModule({
  imports: [
    IonicModule,
    BotoxModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ConfigurationPage },
      { path: 'botox/regions', component: BotoxRegionContainer },
      { path: 'botox/types', component: BotoxTypeContainer }
    ])
  ],
  declarations: [ConfigurationPage],
  providers: [ImportExportService]
})
export class ConfigurationPageModule {}
