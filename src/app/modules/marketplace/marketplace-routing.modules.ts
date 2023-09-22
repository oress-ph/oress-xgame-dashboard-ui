import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceRouterActivate } from './marketplace-router.activate';
import { MarketplaceComponent } from './marketplace.component';
import { MarketMarketplaceListComponent } from 'src/app/components/marketplace/market-marketplace-list/market-marketplace-list.component';

const routes: Routes = [
  {
    path: '',
    // canActivate: [MarketplaceRouterActivate],
    component: MarketplaceComponent,
    children: [
      { path: '',component: MarketMarketplaceListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule { }
