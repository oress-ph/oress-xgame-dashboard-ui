import { Component } from '@angular/core';
import { CookiesService } from 'src/app/shared/services/cookies.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  constructor(
    private cookiesService: CookiesService
  ){
    let wallet = this.cookiesService.getCookie("wallet-keypair");
    console.log(wallet);
  }
}
