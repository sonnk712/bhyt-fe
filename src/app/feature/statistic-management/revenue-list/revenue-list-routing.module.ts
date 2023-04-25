import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/util/auth.guard';
import { RevenueListComponent } from './revenue-list/revenue-list.component';
import { RevenueDetailComponent } from './revenue-detail/revenue-detail.component';

const routes: Routes = [{
  path: '',
  component: RevenueListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'detail/:id',
  component: RevenueDetailComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevenueListRoutingModule { }
