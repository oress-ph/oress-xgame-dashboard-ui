import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletsComponent } from 'src/app/components/dashboard/wallets/wallets.component';
import { PortfolioComponent } from 'src/app/components/dashboard/portfolio/portfolio.component';
import { BuyModuleRouterActivate } from './buy-module-router.activate';
import { BuyModuleComponent } from './buy-module.component';
import { BuyComponent } from 'src/app/components/dashboard/buy/buy.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [BuyModuleRouterActivate],
    component: BuyModuleComponent,
    children: [
      { path: '',canActivate: [BuyModuleRouterActivate],  component: BuyComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyModuleRoutingModule { }
