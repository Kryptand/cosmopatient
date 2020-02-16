import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import { CosmoShellComponent } from './cosmosurge-shell.component';
import { CosmoRoutingModule } from './cosmo-routing.module';

@NgModule({
  declarations: [CosmoShellComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    CosmoRoutingModule,
    IonicStorageModule.forRoot(),
    AutofocusFixModule.forRoot(),
    FormlyModule.forRoot(),
    FormlyIonicModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [CosmoShellComponent]
})
export class CosmoRootModule {}
