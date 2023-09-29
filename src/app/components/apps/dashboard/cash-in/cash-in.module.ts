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
import { CashInRoutingModule } from "./cash-in-routing.module";
import { CashInComponent } from "./cash-in.component";
import { CashInMiddleContentComponent } from "./cash-in-middle-content/cash-in-middle-content.component";
import { BuyCoinsComponent } from './cash-in-middle-content/buy-coins/buy-coins.component'
import { CryptocurrencyPricesComponent } from "./cash-in-middle-content/cryptocurrency-prices/cryptocurrency-prices.component"
@NgModule({
  declarations: [
    CashInComponent,
    CashInMiddleContentComponent,
    BuyCoinsComponent,
    CryptocurrencyPricesComponent
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, NgbModule, FormsModule, CashInRoutingModule],
  exports: [

  ]
})
export class CashInModule {}
