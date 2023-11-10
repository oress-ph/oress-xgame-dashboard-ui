import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ChartistModule } from "ng-chartist";
import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../../../shared/shared.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { PortfolioComponent } from "./../portfolio/portfolio.component"
import { TokenProfileComponent } from "./token-profile/token-profile.component";
import { NFTComponent} from "./nft/nft.component"
import { PortfolioRoutingModule } from "./portfolio-routing-module";
import { PortfolioProfileComponent } from './portfolio-profile/portfolio-profile.component';
@NgModule({
  declarations: [
    PortfolioComponent,
    TokenProfileComponent,
    NFTComponent,
    PortfolioProfileComponent,
    // BalanceProfileComponent
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, NgbModule, FormsModule, PortfolioRoutingModule],
  exports: [

  ]
})
export class PortfolioModule {}
