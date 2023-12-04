import { Injectable } from '@angular/core';
import { PortfolioModel } from './../model/portfolio';
import { PolkadotService } from './polkadot.service';
import { CookiesService } from './cookies.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(
    private polkadotService: PolkadotService,
    private cookiesService: CookiesService,
    private http: HttpClient,
  ) {
    this.portfolioModel.conversion_rate = 10; //
    this.getUsdRate();
   }

  astros: any = {};
  selectedCurrency: string = 'USD';
  data: any;
  usdRate: number = 10;
  totalBalance: number = 0;
  portfolioModel: PortfolioModel = new PortfolioModel();

  getPortfolioDetails() {
    return this.portfolioModel;
  }

  getAstro() {
    return this.astros;
  }

  async setPortfolioDetails(currency: any, nmsTotal: any) {
    if (nmsTotal != undefined) {
      const rate = this.data.rates[currency.name];
      this.portfolioModel.currency = currency.name
      this.portfolioModel.token_quantity = parseFloat(nmsTotal);
      this.portfolioModel.conversion_rate = this.usdRate * rate;
      const amount = parseFloat(nmsTotal) * (rate * 10);
      this.portfolioModel.amount = amount;
      return this.portfolioModel;
    }
  }

  async setAstro(currency: any, astro: any) {
    const rate = this.data.rates[currency.name];
    this.astros.currency = currency.name;
    this.astros.token_quantity = parseFloat(astro.balance);
    this.astros.conversion_rate = astro.price * rate;
    const amount = parseFloat(astro.balance) * (rate * 1);
    this.astros.amount = amount;
    this.astros.token_symbol = astro.symbol;
    return this.astros;
  }

  async getUsdRate() {
    this.http.get('https://open.er-api.com/v6/latest/USD')
    .subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}

