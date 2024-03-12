import { Injectable } from '@angular/core';
import { PortfolioModel } from './../model/portfolio';
import { PolkadotService } from './polkadot.service';
import { CookiesService } from './cookies.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private tokensSubject = new BehaviorSubject<any[]>([]);
  tokens$ = this.tokensSubject.asObservable();

  constructor(
    private polkadotService: PolkadotService,
    private cookiesService: CookiesService,
    private http: HttpClient,
  ) {
    this.getUsdRate();
   }

  selectedCurrency: string = 'USD';
  data: any;
  portfolioModel: PortfolioModel = new PortfolioModel();
  tokens = [];
  totalBalance: number = 0;

  getTokens() {
    return this.tokensSubject.value;
  }

  setTokens(tokens: any) {
    this.tokensSubject.next(tokens);
  }

  getTotalBalance() {
    return this.totalBalance;
  }

  async setPortfolioDetails(currency: any, token: any, new_: any) {
    this.totalBalance = 0;
    this.tokens = new_;
    if (token != undefined) {
      for (let i = 0; i < token.length; i++) {
        let new_token = new PortfolioModel();
        const rate = this.data.rates[currency];
        new_token.currency = currency;
        new_token.token_quantity = parseFloat(token[i].balance);
        new_token.conversion_rate = token[i].price * rate;
        new_token.token_symbol = token[i].symbol;
        const amount = parseFloat(token[i].balance) * (rate * parseInt(token[i].price));
        new_token.amount = amount;
        this.totalBalance += amount;
        this.tokens.push(new_token);
      }
    }
    return this.tokens;
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

