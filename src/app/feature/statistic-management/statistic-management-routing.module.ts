import { RevenueListModule } from './revenue-list/revenue-list.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStatusListComponent } from './payment-status-list/payment-status-list.component';
import { AuthGuard } from 'src/app/core/util/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: "payment-status",
    pathMatch: 'full'
  },
  {
    path: "payment-status",
    component: PaymentStatusListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "revenue-list",
    loadChildren: () => import('./revenue-list/revenue-list.module').then(m => m.RevenueListModule)
  },
  {
    path: 'agency-management',
    loadChildren: () => import('./agency-management/agency-management.module').then(m => m.AgencyManagementModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticManagementRoutingModule { }
