import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityRouterActivate } from './security-router.activate';
import { SecurityComponent } from './security.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
