import { Component, OnInit, AfterContentInit } from "@angular/core";
import * as chartData from "../../../../../shared/data/dashboard/crypto";
import { AppSettings } from "src/app/app-settings";
import { PolkadotService } from "src/app/shared/services/polkadot.service";
import { NftService } from "src/app/shared/services/nft.service";
import { CookiesService } from "src/app/shared/services/cookies.service";
import { PortfolioModel } from "src/app/shared/model/portfolio";
import { PortfolioService } from "src/app/shared/services/portfolio.service";

@Component({
  selector: "app-token-profile",
  templateUrl: "./token-profile.component.html",
  styleUrls: ["./token-profile.component.scss"],
})
export class TokenProfileComponent implements OnInit, AfterContentInit {
  public portfolio = chartData.portfolio;
  public show: boolean = false;

  constructor(
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService,
    private portfolioService: PortfolioService
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }
  ngAfterContentInit(): void {
  }

  astroProperties: any;
  tokenSymbol: any = 'NMS';
  nmsPrice: number = 10;
  amount: number = 0;
  loading: boolean = true;
  tokens = [];

  toggle(){
    this.show = !this.show
  }

  async ngOnInit(): Promise<void> {
    this.portfolioService.tokens$.subscribe(tokens => {
      this.tokens = tokens;
      if (tokens.length > 0) {
        this.loading = false;
      }
    });
    await this.polkadotService.getChainTokens();
  }
}
