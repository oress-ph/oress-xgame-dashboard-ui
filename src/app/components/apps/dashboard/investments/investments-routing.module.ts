import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {InvestmentsComponent } from "./investments.component"

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: InvestmentsComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentRoutingModule {}
