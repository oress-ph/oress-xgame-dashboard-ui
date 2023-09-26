import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "portfolio",
    loadChildren: () => import("../../components/apps/dashboard/portfolio/portfolio.module").then((m) => m.PortfolioModule),
  },
];
