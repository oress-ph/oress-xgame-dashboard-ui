import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "portfolio",
    loadChildren: () => import("../../components/apps/dashboard/portfolio/portfolio.module").then((m) => m.PortfolioModule),
  },
  {
    path: "buy",
    loadChildren: () => import("../../components/apps/dashboard/cash-in/cash-in.module").then((m) => m.CashInModule),
  },
];
