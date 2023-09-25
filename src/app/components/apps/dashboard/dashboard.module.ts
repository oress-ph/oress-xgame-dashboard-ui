import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartistModule } from "ng-chartist";
import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { PortfolioComponent } from "./portfolio/portfolio.component"
import { DashboardLeftContentComponent } from "./portfolio/dashboard-left-content/dashboard-left-content.component";
import { DashboardMiddleContentComponent } from "./portfolio/dashboard-middle-content/dashboard-middle-content.component";
import { DashboardRightContentComponent } from "./portfolio/dashboard-right-content/dashboard-right-content.component";
import { BalanceProfileComponent } from "./portfolio/dashboard-left-content/balance-profile/balance-profile.component";
import { GNTTransactionComponent } from "./portfolio/dashboard-middle-content/gnt-transaction/gnt-transaction.component";
import { GemTransactionComponent } from "./portfolio/dashboard-right-content/gem-transaction/gem-transaction.component";
import { GemProfileComponent } from "./portfolio/dashboard-right-content/gem-profile/gem-profile.component";
import { NFTComponent } from "./portfolio/dashboard-middle-content/product/nft.component";
@NgModule({
  declarations: [
    PortfolioComponent,
    DashboardLeftContentComponent,
    DashboardMiddleContentComponent,
    DashboardRightContentComponent,
    BalanceProfileComponent,
    GNTTransactionComponent,
    GemTransactionComponent,
    GemProfileComponent,
    NFTComponent
    
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, NgbModule, FormsModule, DashboardRoutingModule],
  exports: [

  ]
})
export class DashboardModule {}
