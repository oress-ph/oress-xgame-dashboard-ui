import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppSettings } from 'src/app/app-settings';
import { WalletModel } from 'src/app/models/wallet/wallet.model';
import { CookiesService } from 'src/app/services/cookies/cookies.service';
import { Router } from '@angular/router';
import { WalletInfoModel } from 'src/app/models/wallet/wallet-info.model';
import { WalletsComponent } from '../../dashboard/wallets/wallets.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PolkadotService } from 'src/app/services/polkadot/polkadot.service';
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
    constructor(
        private appsetting: AppSettings,
        private cookiesService: CookiesService,
        private router: Router,
        public dialogService: DialogService,
        private ref: DynamicDialogRef,
        private polkadotService: PolkadotService
    ) {
    }

    header_menu: MenuItem[] | undefined;
    profile_menu: MenuItem[] | undefined;
    is_connect_wallet: boolean= false;
    wallet_info: WalletInfoModel = new WalletInfoModel();

    wallet_menu: WalletModel[] = [
        { wallet_net: 'Genesis Testnet', logo:'./../../../assets/img/Genesis_token.png', wallet_url: '',status:true },
        { wallet_net: 'Genesis Mainet', logo: './../../../assets/img/Genesis_token.png',wallet_url: '',status:true},
        { wallet_net: 'Genesis Devnet', logo:'./../../../assets/img/Genesis_token.png',wallet_url: 'wss://humidefi-dev.zeeve.net/para',status:false},
    ]
    selected_wallet: WalletModel | null = null;

    selectedCountry: Country | null = null;
    

    countries: Country[] = [
        { name: 'Genesis Testnet', logo:'./../../../assets/img/Genesis_token.png' },
        { name: 'Genesis Mainet', logo: './../../../assets/img/Genesis_token.png'},
        { name: 'Polkadot', logo:'./../../../assets/img/polkadot/polkadot_icon.png' },
    ];



    routeClick(section:any) {
        let redirectTo = '?section=' + section;
        window.location.href = this.appsetting.UIURLHomePageHost + redirectTo;
    }
    logout(){
        console.log('test');
        const logout = this.cookiesService.deleteAllCookie();
        console.log(logout);
        if (logout){
            this.router.navigate(["/wallet"]);
        }
    }

    connectWallet() {
        this.ref = this.dialogService.open(WalletsComponent, {
            header: '',
            width: '400px',
            contentStyle: {
              'max-height': '100%',
              overflow: 'auto',
              'border-radius': '0 0 6px 6px',
            },
            baseZIndex: 10000,
            // data: { data: module },
          });
          this.ref.onClose.subscribe(() => {
            // this.isDispalyGame = true;
          });
    }

    async ngOnInit(): Promise<void> {
        this.is_connect_wallet = this.cookiesService.getCookie('wallet-keypair')!='';

        this.wallet_menu.forEach(wallet => {
            if(wallet.status!=true){
                this.selected_wallet= wallet;
                this.cookiesService.setCookie('wallet_url',wallet.wallet_url)
                stop;
            }
        });
        this.profile_menu = [
            {
                label: 'Dashboard',
                icon: 'pi pi-microsoft',
                command: () => {
                }
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.logout();
                }
            }
        ];
        
        this.header_menu = [
            // {
            //     label: '<img src="./../../../assets/img/XGame_Logo_white.png" height="30" class="mr-2" />',
            //     escape: false,
            //     styleClass: 'logo',
            //     disabled:true
            // },
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
        this.cookiesService.getCookie('wallet-keypair')!=undefined? this.wallet_info.wallet_keypair = this.cookiesService.getCookie('wallet-keypair'):this.wallet_info.wallet_keypair= '';
        this.cookiesService.getCookie('wallet-meta-name')!=undefined? this.wallet_info.wallet_meta_name = this.cookiesService.getCookie('wallet-meta-name'):this.wallet_info.wallet_meta_name= '';
        this.cookiesService.getCookie('wallet-keypair')!=undefined? this.wallet_info.wallet_balance_nms = await this.polkadotService.getBalance() : '';
        
    }
    onWalletMenuItemClick(selectedItem: any): void {
        // Perform actions based on the selected wallet menu item
        this.selected_wallet = selectedItem;
    }



}
