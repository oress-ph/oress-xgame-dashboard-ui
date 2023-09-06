import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppSettings } from 'src/app/app-settings';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  first_col_menu: MenuItem[] | undefined;
  second_col_menu: MenuItem[] | undefined;
  footer_options: MenuItem[] | undefined;

  constructor(
    public appSettings:AppSettings,
    private router: Router,
  ){

  }

  public routeClick(route: any): void {
    
    if (route == 'home')
        this.router.navigate(['/home']).then(() => {
            window.scrollTo(0, 0);
        });
    else
        this.router.navigate(route);
        // this.publicService.routeChange(route);

        // window.location.href = route;

  }
  public routerClick(route:any):void{
    window.location.href=route
  }

  ngOnInit() {
    this.first_col_menu = [
      {
          label: '<span class="text-base">Home</span>',
          escape: false,
          iconClass: 'text-base',
          command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost+'home'); }
      },
      {
          label: '<span class="text-base">About</span>',
          escape: false,
          iconClass: 'text-base'
      },
      {
        label: '<span class="text-base" >Game Catalog</span>',
        escape: false,
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost+'games'); }// as per ernest xgame.live/games : Game Catalog
      },
      {
        label: '<span class="text-base ">Web 3 Wallet</span>',
        escape: false,
        iconClass: 'text-base',
        // command: (event) => { this.routerClick(this.appSettings.UIURLDashboardlaceHost+'portfolio'); }
        command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost+'games'); }// as per ernest xgame.live/web3 : web3 wallet ,
      },
      {
        label: '<span class="text-base">Tokens</span>',
        escape: false,
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost+'tokenomics');}
      },
      {
        label: '<span class="text-base">NFT Marketplace</span>',
        escape: false,
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost+'home');  }
      }
    ];
    
    this.second_col_menu = [
      {
          label: '<span class="text-base">Community</span>',
          escape: false,
          iconClass: 'text-base'
      },
      {
          label: '<span class="text-base">Discord</span>',
          escape: false,
          iconClass: 'text-base'
      },
      {
        label: '<span class="text-base" >Blogs</span>',
        escape: false,
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost+'home'); }
      }
    ];
    
    this.footer_options = [
      {
          label: '<span class="text-base text-500" >Copyright Notice</span>',
          escape: false,
      },
      {
        label: '<span class="text-base text-500" >Privacy Policy</span>',
        escape: false,
      },
      {
        label: '<span class="text-base text-500">Terms of Use</span>',
        escape: false,
      },
      {
        label: '<span class="text-base text-500">Cookie Policy</span>',
        escape: false,
      },
      {
        label: '<span class="text-base text-500">Legal Disclaimer</span>',
        escape: false,
      },
    ];
  }
}
