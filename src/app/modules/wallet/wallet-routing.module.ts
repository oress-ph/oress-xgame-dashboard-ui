import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WalletRouterActivate } from './wallet-router.activate';
import { WalletsComponent } from 'src/app/components/dashboard/wallets/wallets.component';
import { WalletComponent } from './wallet.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [WalletRouterActivate],
    component: WalletComponent,
    children: [
      { path: '',canActivate: [WalletRouterActivate],  component: WalletsComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletRoutingModule { }
