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
import { CashOutComponent } from "./cash-out.component";
import { CashOutRoutingModule } from "./cash-out-routing.module";

@NgModule({
  declarations: [
    CashOutComponent
    // BalanceProfileComponent
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, NgbModule, FormsModule, CashOutRoutingModule],
  exports: [

  ]
})
export class CashoutModule {}
