import { Component } from '@angular/core';

@Component({
  selector: 'app-gnt-transaction',
  templateUrl: './gnt-transaction.component.html',
  styleUrls: ['./gnt-transaction.component.scss']
})
export class GNTTransactionComponent {

  constructor() {}

  public currencies = [
    {
      colorClass: "warning",
      icon: "beta",
      currenciesName: "5",
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
      currenciesName: "4",
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
      currenciesName: "23",
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
      currenciesName: "33",
      price: "35,098.34",
      growth: "3.56",
      arrow: "trending-up",
      totalBalance: "64,100.066",
      totalCoin: "1.78142254",
      gem: "AMYS"
    },

    
  ]
}
