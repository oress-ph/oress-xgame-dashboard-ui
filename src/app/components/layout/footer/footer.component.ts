import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
          label: '<span class="text-base font-bold">About</span>',
          escape: false,
          // icon: 'pi pi-refresh',
          iconClass: 'text-base'
      },
      {
        label: '<span class="text-base font-bold">Game Catalog</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base'
      },
      {
        label: '<span class="text-base font-bold">Web 3 Wallet</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base'
      },
      {
        label: '<span class="text-base font-bold">Tokens</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base'
      },
      {
        label: '<span class="text-base font-bold">NFT Marketplace</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base'
      },
      {
        label: '<span class="text-base font-bold">Dashboard</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base'
      },
    ];
  }
}
