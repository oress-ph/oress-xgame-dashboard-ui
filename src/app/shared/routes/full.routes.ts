import { Routes } from '@angular/router';

export const full: Routes = [
  {
    path: 'wallet',
    loadChildren: () => import('./../../components/apps/wallet/wallet.module').then(m => m.WalletModule),
  },
  // {
  //   path: 'authentication',
  //   loadChildren: () => import('../../pages/authentication/authentication.module').then(m => m.AuthenticationModule),
  // },
  // {
  //   path: 'coming-soon',
  //   loadChildren: () => import('../../pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
  // },
  // {
  //   path: 'maintenance',
  //   loadChildren: () => import('../../pages/maintenance/maintenance.module').then(m => m.MaintenanceModule),
  // }
];
