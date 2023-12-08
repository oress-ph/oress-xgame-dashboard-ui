import { Component, Input, OnInit } from '@angular/core';
import { Menu, NavService } from '../../../../../shared/services/nav.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings } from '../../../../../app-settings';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { PortfolioModel } from '../../../../../shared/model/portfolio';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss']
})
export class MyPortfolioComponent implements OnInit {
  public dashboard_menuItems: Menu[];
  isLoading = false;
  tokenSymbol: any = 'NMS';
  totalUSD: string = '0.00';
  nmsBalance: any;
  portfolioModel: PortfolioModel = new PortfolioModel();

  constructor(
    private router: Router,
    private navServices: NavService,
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService,
    private portfolioService: PortfolioService
  ) {
    this.navServices.dashboard_items.subscribe(menuItems => {
      this.dashboard_menuItems = menuItems;
      this.router.events.subscribe((event) => {
      });
    });
    // this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }

  selectedCurrency: string = 'USD';
  totalBalance: number = 0;
  nmsTotal: any;
  astro: any;
  data: any;
  currency = [
    {
      id: '1',
      name: 'USD',
      flag_icon: 'https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg'
    },
    {
      id: '2',
      name: 'KRW',
      flag_icon: 'https://cdn.britannica.com/49/1949-004-8818300C/Flag-South-Korea.jpg'
    },
    {
      id: '3',
      name: 'JPY',
      flag_icon: 'https://cdn.britannica.com/91/1791-004-DA3579A5/Flag-Japan.jpg'
    },
    {
      id: '4',
      name: 'CNY',
      flag_icon: 'https://cdn.britannica.com/90/7490-004-BAD4AA72/Flag-China.jpg'
    }
  ];

  async handleSelectCurrency(currency: any) {
    this.portfolioModel = await this.portfolioService.setPortfolioDetails(currency, this.nmsTotal); //
    await this.portfolioService.setAstro(currency, this.astro); //
    this.totalBalance = this.portfolioService.getTotalBalance();
  }

  async ngOnInit(): Promise<void> {
    this.nmsTotal = await this.polkadotService.getBalance();
    const result = await this.nftService.getAstroToken();
    if (!result[0]) {
      this.astro = {
        balance: "0.0000",
        price: "1",
        symbol: "ASTRO",
      };
    } else {
      this.astro = result[1]
    }
    const defaultCurrency = { name: 'USD' };
    await this.handleSelectCurrency(defaultCurrency)
    this.polkadotService.getCurrentBalance().subscribe(data => {
      this.nmsTotal = data;
      this.handleSelectCurrency(defaultCurrency)
    });
  }
}
