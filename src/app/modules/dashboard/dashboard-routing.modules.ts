import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRouterActivate } from './dashboard-router.activate';
import { DashboardComponent } from './dashboard.component';
import { WalletComponent } from 'src/app/components/dashboard/wallet/wallet.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardRouterActivate],
    component: DashboardComponent,
    children: [
      { path: 'wallet',canActivate: [DashboardRouterActivate],  component: WalletComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
