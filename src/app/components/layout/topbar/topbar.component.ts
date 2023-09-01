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
import { LanguageService } from 'src/app/services/language/language.service';
import { LanguageModel } from 'src/app/models/language/language.model';
import { MessageService } from 'primeng/api';

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
        public appSettings: AppSettings,
        private cookiesService: CookiesService,
        private router: Router,
        public dialogService: DialogService,
        private ref: DynamicDialogRef,
        private polkadotService: PolkadotService,
        private languageService: LanguageService,
        private messageService: MessageService,

    ) {
    }

    header_menu: MenuItem[] | undefined;
    profile_menu: MenuItem[] | undefined;
    is_connect_wallet: boolean = false;
    wallet_info: WalletInfoModel = new WalletInfoModel();
    language_list: LanguageModel[] = [];
    selected_language: LanguageModel = new LanguageModel();

    wallet_menu: WalletModel[] = [
        { wallet_net: 'Genesis Testnet', logo: './../../../assets/img/Genesis_token.png', wallet_url: '', status: true },
        { wallet_net: 'Genesis Mainet', logo: './../../../assets/img/Genesis_token.png', wallet_url: '', status: true },
        { wallet_net: 'Genesis Devnet', logo: './../../../assets/img/Genesis_token.png', wallet_url: 'wss://humidefi-dev.zeeve.net/para', status: false },
    ]
    selected_wallet: WalletModel | null = null;

    selectedCountry: Country | null = null;


    countries: Country[] = [
        { name: 'Genesis Testnet', logo: './../../../assets/img/Genesis_token.png' },
        { name: 'Genesis Mainet', logo: './../../../assets/img/Genesis_token.png' },
        { name: 'Polkadot', logo: './../../../assets/img/polkadot/polkadot_icon.png' },
    ];



    routeClick(section: any) {
        let redirectTo = '?section=' + section;
        window.location.href = this.appSettings.UIURLHomePageHost + redirectTo;
    }
    logout() {
        console.log('test');
        const logout = this.cookiesService.deleteAllCookie();
        console.log(logout);
        if (logout) {
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

    get_language_list() {
        this.languageService.language_dropdown().subscribe(
            (response: any) => {
                let results = response;
                if (results[0] == true) {
                    this.language_list = response[1];
                    if (this.cookiesService.getCookie('language') == '') {
                        this.cookiesService.setCookieArray('language', this.language_list[0]);
                    }
                    //   this.get_language_list();
                } else {

                    this.messageService.add({
                        severity: results[1] == 401 ? 'info' : 'error',
                        summary: results[1],
                        detail: results[1] == 401 ? 'Unauthorized' : 'Server Error',
                    });
                }
            }
        )
    }

    // Language
    onChangeLanguage(event: any) {
        const language = JSON.stringify(event.value);
        this.cookiesService.setCookie('language', language);
        window.location.reload();
    }

    openNFTMarketplace() {
        window.location.href = this.appSettings.UIURLMarketplaceHost+'marketplace';    
    }
    openHomepage(direction: string) {
        window.location.href = this.appSettings.UIURLHomePageHost+direction;    
    }

    async ngOnInit(): Promise<void> {
        // this.get_language_list();  
        this.language_list = [
            {
                id: '1',
                language: 'English',
                flag_image_url: 'https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg'
            },
            {
                id: '1',
                language: 'Korean',
                flag_image_url: 'https://cdn.britannica.com/49/1949-004-8818300C/Flag-South-Korea.jpg'
            },
            {
                id: '1',
                language: 'Japanese',
                flag_image_url: 'https://cdn.britannica.com/91/1791-004-DA3579A5/Flag-Japan.jpg'
            }
        ]
        this.selected_language = this.cookiesService.getCookie('language') == '' ? this.cookiesService.setCookieArray('language', this.language_list[0]) : this.cookiesService.getCookieArray('language');

        this.is_connect_wallet = this.cookiesService.getCookie('wallet-keypair') != '';

        this.wallet_menu.forEach(wallet => {
            if (wallet.status != true) {
                this.selected_wallet = wallet;
                this.cookiesService.setCookie('wallet_url', wallet.wallet_url)
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
            {
                label: this.appSettings.translate('XGame'),
                // routerLink: '/home', 
                command: (event) => { this.openHomepage('home') },
            },
            {
                label: this.appSettings.translate('Explore'),
                // routerLink: '/home', 
                // command: (event) => { this.routeClick("xgame") },
                items:[
                    {
                        label: 'Games',  
                        // routerLink: '/games', 
                        command: (event) => { this.openHomepage('games') },
                    },
                    {
                        label: 'Tokenomics',  
                        // routerLink: '/tokenomics', 
                        command: (event) => { this.openHomepage('tokenomics') },
                    }
                ]
            },
            {
                label: this.appSettings.translate('Community'),
                // routerLink: '/home', 
                // command: (event) => { this.routeClick("xgame") },
                items:[
                    {
                        label: 'Blogs',  
                        // routerLink: '/blogs', 
                        command: (event) => { this.openHomepage('blogs') },
                    },
                ]
            },
            {
                label: this.appSettings.translate('Marketplace'),
                // routerLink: '/home', 
                command: (event) => { this.openNFTMarketplace() },
            },
            {
                label: this.appSettings.translate('NFT'),
                routerLink: '/home', 
                // command: (event) => { this.routeClick("xgame") },
            },
        ];

        var wallet_address = this.cookiesService.getCookie('wallet-keypair')
        if (wallet_address != null && wallet_address.length > 5) {
            wallet_address = wallet_address.substring(0, 5) + "..." + wallet_address.substring(wallet_address.length - 5, wallet_address.length);

        }
        this.cookiesService.getCookie('wallet-keypair') != undefined ? this.wallet_info.wallet_keypair = wallet_address : this.wallet_info.wallet_keypair = '';
        this.cookiesService.getCookie('wallet-meta-name') != undefined ? this.wallet_info.wallet_meta_name = this.cookiesService.getCookie('wallet-meta-name') : this.wallet_info.wallet_meta_name = '';
        this.cookiesService.getCookie('wallet-keypair') != undefined ? this.wallet_info.wallet_balance_nms = await this.polkadotService.getBalance() : '';

    }
    onWalletMenuItemClick(selectedItem: any): void {
        // Perform actions based on the selected wallet menu item
        this.selected_wallet = selectedItem;
    }



}
