import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "portfolio",
    loadChildren: () => import("../../components/apps/dashboard/portfolio/portfolio.module").then((m) => m.PortfolioModule),
  },
  {
    path: "cash-in",
    loadChildren: () => import("../../components/apps/dashboard/cash-in/cash-in.module").then((m) => m.CashInModule),
  },
  {
    path: "swap",
    loadChildren: () => import("../../components/apps/dashboard/swap/swap.module").then((m) => m.SwapModule),
  },
  {
    path: "cash-out",
    loadChildren: () => import("../../components/apps/dashboard/cash-out/cash-out.module").then((m) => m.CashoutModule),
  },
  {
    path: "investments",
    loadChildren: () => import("../../components/apps/dashboard/investments/investments.module").then((m) => m.InvestmentModule),
  },
];
