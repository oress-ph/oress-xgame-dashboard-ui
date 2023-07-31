import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/wallet', pathMatch: 'full' },
  {
    path: 'security',
    loadChildren: () =>
      import('./modules/security/security.module').then(
        (m) => m.SecurityModule
      ),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'wallet',
    loadChildren: () =>
      import('./modules/wallet/wallet.module').then((m) => m.WalletModule),
  },
  {
    path: 'send-pay-genesis',
    loadChildren: () =>
      import('./modules/send-pay-genesis/send-pay-genesis.module').then((m) => m.SendPayGenesisModule),
  },
  {
    path: 'buy',
    loadChildren: () =>
      import('./modules/buy-module/buy-module.module').then((m) => m.BuyModuleModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
