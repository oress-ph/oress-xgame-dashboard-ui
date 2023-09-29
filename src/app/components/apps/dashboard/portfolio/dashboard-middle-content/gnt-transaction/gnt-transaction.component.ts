import { Component,OnInit } from '@angular/core';
import {TokenTransactionModel} from "../../../../../../shared/model/token_transaction.model";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-gnt-transaction',
  templateUrl: './gnt-transaction.component.html',
  styleUrls: ['./gnt-transaction.component.scss']
})
export class GNTTransactionComponent implements OnInit{

  constructor(
    public appSettings: AppSettings,
    private polkadotService: PolkadotService
  ) {}

  public token_transaction: TokenTransactionModel[] = [];
  async transaction(): Promise<void> {
    await this.polkadotService.getBalance().then(data => {
      this.appSettings.wallet_info.wallet_balance_nms = data;
      // this.refreshTokenList = false;
      if (this.appSettings.wallet_info.wallet_balance_nms) {
        let value = 20 * Number(this.appSettings.wallet_info.wallet_balance_nms);
        this.token_transaction.push(
          {
            token: 'NMS',
            price: '20',
            balance: this.appSettings.wallet_info.wallet_balance_nms == undefined ? '0' : this.appSettings.wallet_info.wallet_balance_nms,
            value: value.toString(),
          }
        );
        setTimeout(() => {
          // this.refreshTokenList = true;
        }, 100);
      }
    });
  }
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
  ngOnInit(){
    this.transaction();
  }
}
