import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPage } from './authentication.page';

import { AuthenticationService } from './authentication.service';
const routes: Routes = [
  {
    path: '',
    component: AuthenticationPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuthenticationPage],
  providers:[
    AuthenticationService
  ]
})
export class AuthenticationPageModule {}
