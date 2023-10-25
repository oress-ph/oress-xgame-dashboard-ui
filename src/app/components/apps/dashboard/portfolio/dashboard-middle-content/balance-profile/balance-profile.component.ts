import { Component, Input, OnInit } from '@angular/core';
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
  tokenSymbol: any = 'NMS';
  totalUSD: string = '0.00';

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
    // this.tokenSymbol = this.cookiesService.getCookie('tokenSymbol');
  }

  async ngOnInit(): Promise<void> {
    // await this.polkadotService.getChainTokens();
    this.totalUSD = this.appSettings.wallet_info.wallet_balance_usd;
    if (this.appSettings.wallet_info.wallet_balance_usd == '') {
      this.totalUSD = this.cookiesService.getCookie('wallet-usd');
    }
  }
}
