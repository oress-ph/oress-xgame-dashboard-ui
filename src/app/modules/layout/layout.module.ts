import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from 'src/app/components/layout/topbar/topbar.component';
import { FooterComponent } from 'src/app/components/layout/footer/footer.component';
import { LayoutComponent } from './layout.component';
import { LayoutRouterActivate } from './layout-router.activate';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [LayoutComponent, TopbarComponent, FooterComponent],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [LayoutComponent, TopbarComponent, FooterComponent],
  providers: [LayoutRouterActivate],
})
export class LayoutModule {}
