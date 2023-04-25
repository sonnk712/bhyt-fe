import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';

const routes: Routes = [
  
  {
    path: '',
    component: FeatureComponent,
    children: [
      {
        path: 'statistic',
        loadChildren: () => import('./statistic-management/statistic-management.module').then(m => m.StatisticManagementModule)
      },
      {
        path: 'config',
        loadChildren: () => import('./config-management/config-management.module').then(m => m.ConfigManagementModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
