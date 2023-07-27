import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AppSettings } from 'src/app/app-settings';

interface Country {
    name: string;
    logo: string;
    // You can add more properties as needed, such as 'flag' for the image URL.
}
@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {
    header_menu: MenuItem[] | undefined;
    wallet_menu: MenuItem[] | undefined;

    constructor(private messageService: MessageService,
        private appsetting: AppSettings
    ) {
    }

    selectedCountry: Country | null = null;

    countries: Country[] = [
        { name: 'Genesis Testnet', logo:'./../../../assets/img/Genesis_token.png' },
        { name: 'Genesis Mainet', logo: './../../../assets/img/Genesis_token.png'},
        { name: 'Polkadot', logo:'./../../../assets/img/polkadot/polkadot_icon.png' },
    ];

    selected_wallet: any = '';

    routeClick(section:any) {
        let redirectTo = '?section=' + section;
        window.location.href = this.appsetting.UIURLHomePageHost + redirectTo;
    }

    ngOnInit() {
        this.header_menu = [
            {
                label: 'HOME',
                command: (event) => { this.routeClick("home") }
            },
            {
                label: 'XGAME',
                command: (event) => { this.routeClick("xgame") }
            },
            {
                label: 'TOKENS',
                tabindex: '#3',
                command: (event) => { this.routeClick("token") }
            },
            {
                label: 'NFT',
                command: (event) => { this.routeClick("nft") }
            },
            {
                label: 'PARACHAIN',
                command: (event) => { this.routeClick("parachain") }
                // styleClass: 'mr-0'
            },
            // {
            //   label: 'Connect Wallet',
            //   styleClass: 'wallet mr-0'
            // }
        ];
        this.wallet_menu = [
            {
                label: 'Genesis Testnet',
                command: (item) => this.onWalletMenuItemClick(item.item)
            },
            {
                label: 'Genesis Mainet',
                command: (item) => this.onWalletMenuItemClick(item.item)
            },
            {
                label: 'Polkadot',
                command: (item) => this.onWalletMenuItemClick(item.item)
            },
        ];
        this.selected_wallet = this.wallet_menu[0];
    }
    onWalletMenuItemClick(selectedItem: any): void {
        // Perform actions based on the selected wallet menu item
        this.selected_wallet = selectedItem;
    }
}
