import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/util/auth.guard';
import { AgencyManagementCreateComponent } from './agency-management-create/agency-management-create.component';
import { AgencyManagementDetailComponent } from './agency-management-detail/agency-management-detail.component';
import { AgencyManagementListComponent } from './agency-management-list/agency-management-list.component';
import { AgencyManagementUpdateComponent } from './agency-management-update/agency-management-update.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyManagementListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create/:id',
    component: AgencyManagementCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: AgencyManagementCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: AgencyManagementUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: AgencyManagementDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyManagementRoutingModule { }
