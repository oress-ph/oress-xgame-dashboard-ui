import { Component } from '@angular/core';

@Component({
  selector: 'app-gem-transaction',
  templateUrl: './gem-transaction.component.html',
  styleUrls: ['./gem-transaction.component.scss']
})
export class GemTransactionComponent {

  constructor() {}

  public currencies = [
    {
      colorClass: "warning",
      icon: "beta",
      currenciesName: "EGEM",
      price: "13,098.09",
      growth: "5.90",
      arrow: "trending-up",
      totalBalance: "64,100.066",
      totalCoin: "1.09634721",
      gem: "EGEM"
    },
    {
      colorClass: "success",
      icon: "ltc",
      currenciesName: "ALXD",
      price: "11,098.04",
      growth: "2.90",
      arrow: "trending-down",
      totalBalance: "87,897.098",
      totalCoin: "1.09675432",
      gem: "ALXD"
    },
    {
      colorClass: "primary",
      icon: "eth",
      currenciesName: "AMBR",
      price: "45,198.09",
      growth: "0.12",
      arrow: "trending-up",
      totalBalance: "45,178.010",
      totalCoin: "1.41557127",
      gem: "AMBR"
    },
    {
      colorClass: "secondary",
      icon: "bin",
      currenciesName: "AMYS",
      price: "35,098.34",
      growth: "3.56",
      arrow: "trending-up",
      totalBalance: "64,100.066",
      totalCoin: "1.78142254",
      gem: "AMYS"
    },

    
  ]
}
