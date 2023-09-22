import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioComponent } from "./portfolio/portfolio.component";


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "portfolio",
        component: PortfolioComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
