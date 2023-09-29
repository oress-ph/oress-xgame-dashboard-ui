import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutRouterActivate } from './layout-router.activate';
import { LayoutComponent } from './layout.component';
import { MarketMarketplaceListComponent } from 'src/app/components/marketplace/market-marketplace-list/market-marketplace-list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [LayoutRouterActivate],
    children: [
      { path: '', canActivate: [LayoutRouterActivate], component: MarketMarketplaceListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
