import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodListComponent } from './period-list/period-list.component';
import { AuthGuard } from 'src/app/core/util/auth.guard';
import { PeriodCreateComponent } from './period-create/period-create.component';
import { PeriodUpdateComponent } from './period-update/period-update.component';
import { PeriodDetailComponent } from './period-detail/period-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PeriodListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: PeriodCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: PeriodUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:id',
    component: PeriodDetailComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodRoutingModule { }
