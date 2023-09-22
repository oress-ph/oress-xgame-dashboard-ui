import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from "./shared/components/layout/content/content.component";
import { FullComponent } from "./shared/components/layout/full/full.component";
import { full } from "./shared/routes/full.routes";
import { content } from "./shared/routes/routes";

import { AdminGuard } from './shared/guard/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/portfolio',
    pathMatch: 'full'
  },
  // {
  //   path: 'auth/login',
  //   component: LoginComponent
  // },
  {
    path: '',
    component: ContentComponent,
    canActivate: [],
    children: content
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [],
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
