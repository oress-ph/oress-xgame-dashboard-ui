import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityRouterActivate } from './security-router.activate';
import { SecurityComponent } from './security.component';
import { LoginComponent } from 'src/app/components/security/login/login.component';
import { SecurityRouterActivate } from './security-router.activate';
import { RegisterComponent } from 'src/app/components/security/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login',canActivate: [SecurityRouterActivate],  component: LoginComponent },
      { path: 'register',canActivate: [SecurityRouterActivate], component: RegisterComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
