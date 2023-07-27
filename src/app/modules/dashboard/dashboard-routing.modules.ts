import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRouterActivate } from './dashboard-router.activate';
import { DashboardComponent } from './dashboard.component';
import { WalletsComponent } from 'src/app/components/dashboard/wallets/wallets.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardRouterActivate],
    component: DashboardComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
