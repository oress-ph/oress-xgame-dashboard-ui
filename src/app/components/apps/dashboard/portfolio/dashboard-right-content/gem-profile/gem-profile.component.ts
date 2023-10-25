import { Component, OnInit } from "@angular/core";
import * as chartData from "../../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";

@Component({
  selector: "app-gem-profile",
  templateUrl: "./gem-profile.component.html",
  styleUrls: ["./gem-profile.component.scss"],
})
export class GemProfileComponent implements OnInit {
  public portfolio = chartData.portfolio;
  public show: boolean = false;

  constructor(
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }

  tokenSymbol: any = 'NMS';
  nmsPrice: number = 10;
  amount: number = 0;
  loading: boolean = true;

  toggle(){
    this.show = !this.show
  }

  async calculateAmount() {
    let nmsTotal = await this.polkadotService.getBalance();
    const totalUSD = (parseFloat(nmsTotal) * this.nmsPrice).toString();
    this.amount = parseFloat(nmsTotal);
    this.cookiesService.setCookie('wallet-usd', totalUSD);
    this.appSettings.wallet_info.wallet_balance_usd = totalUSD;
  }

  async ngOnInit(): Promise<void> {
    await this.polkadotService.getChainTokens();
    this.calculateAmount();
    this.loading = false;
  }
}
