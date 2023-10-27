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

  selectedCurrency: string = 'USD';
  data: any;
  usdRate: number = 10;
  totalBalance: number = 0;
  portfolioModel: PortfolioModel = new PortfolioModel();

  getPortfolioDetails() {
    return this.portfolioModel;
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
