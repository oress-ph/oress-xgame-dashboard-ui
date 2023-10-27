import { Component, OnInit } from "@angular/core";
import * as chartData from "../../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PortfolioModel } from "src/app/shared/model/portfolio";
import { PortfolioService } from "src/app/shared/services/portfolio.service";

@Component({
  selector: "app-gem-profile",
  templateUrl: "./gem-profile.component.html",
  styleUrls: ["./gem-profile.component.scss"],
})
export class GemProfileComponent implements OnInit {
  public portfolio = chartData.portfolio;
  public show: boolean = false;
  portfolioModel: PortfolioModel = new PortfolioModel();

  constructor(
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService,
    private portfolioService: PortfolioService
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
    this.portfolioModel = this.portfolioService.getPortfolioDetails();
  }

  tokenSymbol: any = 'NMS';
  nmsPrice: number = 10;
  amount: number = 0;
  loading: boolean = true;

  toggle(){
    this.show = !this.show
  }

  async ngOnInit(): Promise<void> {
    await this.polkadotService.getChainTokens();
    this.loading = false;
  }
}
