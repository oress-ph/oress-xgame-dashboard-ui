import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { SecurityComponent } from './security.component';
import { SecurityRoutingModule } from './security-routing.module';
import { SecurityRouterActivate } from './security-router.activate';
import { LayoutModule } from '../layout/layout.module';
import { LayoutComponent } from '../layout/layout.component';
import { WalletModule } from '../wallet/wallet.module';

@NgModule({
  declarations: [SecurityComponent, LoginComponent],
  imports: [CommonModule, SecurityRoutingModule, LayoutModule, WalletModule],
  providers: [SecurityRouterActivate],
  exports: [RouterModule],
})
export class SecurityModule {}
