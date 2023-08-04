import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent } from 'src/app/components/dashboard/wallets/wallets.component';
import { PortfolioComponent } from 'src/app/components/dashboard/portfolio/portfolio.component';
import { SendPayGenesisRouterActivate } from './send-pay-genesis-router.activate';
import { SendPayGenesisComponent } from './send-pay-genesis.component';

import { SendOrPayGenesisComponent } from 'src/app/components/dashboard/send-or-pay-genesis/send-or-pay-genesis.component';
const routes: Routes = [
  {
    path: '',
    canActivate: [SendPayGenesisRouterActivate],
    component: SendPayGenesisComponent,
    children: [
      { path: '',canActivate: [SendPayGenesisRouterActivate],  component: SendOrPayGenesisComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPayGenesisRoutingModule { }
