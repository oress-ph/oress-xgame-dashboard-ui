import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRouterActivate } from './dashboard-router.activate';
import { DashboardComponent } from './dashboard.component';
import { WalletsComponent } from 'src/app/components/dashboard/wallets/wallets.component';
import { PortfolioComponent } from 'src/app/components/dashboard/portfolio/portfolio.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DashboardRouterActivate],
    component: DashboardComponent,
    children: [
      { path: 'portfolio',canActivate: [DashboardRouterActivate],  component: PortfolioComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
