import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: "period",
    pathMatch: 'full'
  },
  {
    path: "period",
    loadChildren: () => import('./period/period.module').then(m => m.PeriodModule)
  },
  {
    path: "cost-unit",
    loadChildren: () => import('./cost-unit/cost-unit.module').then(m => m.CostUnitModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigManagementRoutingModule { }
