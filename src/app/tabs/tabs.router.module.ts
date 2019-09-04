import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'patients',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../patients/patients.module').then(m => m.PatientsPageModule)
          }
        ]
      },
      {
        path: 'configuration',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../configuration/configuration.module').then(m => m.ConfigurationPageModule)
          }
        ]
      },
 
    ]
  },
  { path: '',
  redirectTo: '/tabs/patients',
  pathMatch: 'full'
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
