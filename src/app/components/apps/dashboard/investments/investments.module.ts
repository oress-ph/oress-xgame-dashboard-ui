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
import { InvestmentsComponent } from "./investments.component";
import { InvestmentRoutingModule } from "./investments-routing.module";

@NgModule({
  declarations: [
    InvestmentsComponent
    // BalanceProfileComponent
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, NgbModule, FormsModule, InvestmentRoutingModule],
  exports: [

  ]
})
export class InvestmentModule {}
