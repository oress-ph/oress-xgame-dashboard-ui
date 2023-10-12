import { Component, OnInit } from '@angular/core';
import { Menu, NavService } from './../../../../../../shared/services/nav.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings } from './../../../../../../app-settings';
import { PolkadotService } from 'src/app/shared/services/polkadot.service';
import { NftService } from 'src/app/shared/services/nft.service';
import { CookiesService } from 'src/app/shared/services/cookies.service';

@Component({
  selector: 'app-balance-profile',
  templateUrl: './balance-profile.component.html',
  styleUrls: ['./balance-profile.component.scss']
})
export class BalanceProfileComponent implements OnInit {
  public dashboard_menuItems: Menu[];
  isLoading = false;
  tokenSymbol: any;

  constructor(
    private router: Router,
    private navServices: NavService,
    public appSettings: AppSettings,
    private polkadotService: PolkadotService,
    private nftService: NftService,
    private cookiesService: CookiesService
  ){
    this.navServices.dashboard_items.subscribe(menuItems => {
      this.dashboard_menuItems = menuItems;
      this.router.events.subscribe((event) => {
      });
    });
    this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }

  async ngOnInit(): Promise<void> {
    let data = await this.polkadotService.checkBalance();
    let chain = await this.polkadotService.getChainType();
    if(data && chain === 'Local') {
      this.isLoading = true;
      (await this.nftService.giveUserBalance()).subscribe({
        next: async (response) => {
          if (response[0]){
            let newBalance = await this.polkadotService.getBalance()
            this.appSettings.wallet_info.wallet_balance_nms = newBalance;
          } else {
            //
          }
          this.isLoading = false;
        },
        error: (error) => {
          throw new Error('An error has occured: ' + error);
        }
      });
    } else {
      this.isLoading = false;
    }
  }
}
