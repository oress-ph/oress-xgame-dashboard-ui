import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";

import { AdminGuard } from './shared/guard/admin.guard';
import { WalletGuard } from './shared/guard/wallet.guard';
import { MaintenanceGuard } from './shared/guard/maintenance.guard';
import { MaintenanceComponent } from './components/apps/maintenancepage/maintenance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'portfolio',
    pathMatch: 'full'
  },
  {
    path: 'maintenance',
    component: MaintenanceComponent,
    canActivate: [MaintenanceGuard],
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AdminGuard],
    children: content
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [WalletGuard],
    children: full
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
})],
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
