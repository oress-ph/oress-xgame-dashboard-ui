import { Component, Input, OnInit } from '@angular/core';
import { Menu, NavService } from '../../../../../shared/services/nav.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings } from '../../../../../app-settings';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { CookiesService } from 'src/app/shared/services/cookies.service';
import { PortfolioModel } from '../../../../../shared/model/portfolio';
import { PortfolioService } from 'src/app/shared/services/portfolio.service';
import { SweetalertService } from 'src/app/shared/services/sweetalert.service';

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
    private portfolioService: PortfolioService,
    private sweetalertService: SweetalertService,
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
  tokens = [];
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
    const new_tokens = [];
    const tokens = await this.portfolioService.setPortfolioDetails(currency, this.tokens, new_tokens);
    this.portfolioService.setTokens(tokens);
    this.selectedCurrency = currency;
    this.totalBalance = this.portfolioService.getTotalBalance();
  }

  async ngOnInit(): Promise<void> {
    (await this.polkadotService.getAstroToken()).subscribe({
      next: async (response: any) => {
        if (!response[0]){
          this.sweetalertService.fireSwal(
            response[0],
            response[1].error.name,
            'Getting tokens error'
          );
        }
        this.tokens = response[1].error_result;
        await this.handleSelectCurrency(this.selectedCurrency);
      },
      error: (error: any) => {
        throw new Error('An error has occured: ' + error);
      }
    });
  }
}
