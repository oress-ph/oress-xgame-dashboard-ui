import { Component } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies.service';
@Component({
  selector: 'app-buy-coins',
  templateUrl: './buy-coins.component.html',
  styleUrls: ['./buy-coins.component.scss']
})
export class BuyCoinsComponent {
  constructor(
    private cookiesService: CookiesService,
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }
  tokenSymbol: string;
}
