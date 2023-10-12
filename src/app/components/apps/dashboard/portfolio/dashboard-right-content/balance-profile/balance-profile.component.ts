import { Component } from '@angular/core';
import { CookiesService } from '../../../../../../shared/services/cookies.service';

@Component({
  selector: 'app-balance-profile',
  templateUrl: './balance-profile.component.html',
  styleUrls: ['./balance-profile.component.scss']
})
export class BalanceProfileComponent {
  tokenSymbol: any;

  constructor(
    private cookiesService: CookiesService
  ) {
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }
}
