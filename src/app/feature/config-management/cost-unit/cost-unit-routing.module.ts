import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostUnitListComponent } from './cost-unit-list/cost-unit-list.component';
import { CostUnitCreateComponent } from './cost-unit-create/cost-unit-create.component';
import { CostUnitUpdateComponent } from './cost-unit-update/cost-unit-update.component';
import { CostUnitDetailComponent } from './cost-unit-detail/cost-unit-detail.component';
import { AuthGuard } from 'src/app/core/util/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CostUnitListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CostUnitCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: CostUnitUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: CostUnitDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CostUnitRoutingModule { }
