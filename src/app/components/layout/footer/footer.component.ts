import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';

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


  public routerClick(route:any):void{
    console.log(route);
    window.location.href=route
  }

  ngOnInit() {
    this.first_col_menu = [
      {
          label: '<span class="text-base">About</span>',
          escape: false,
          iconClass: 'text-base',
          routerLink:this.appSettings.UIURLHomePageHost+'home'
      },
      {
        label: '<span class="text-base" >Game Catalog</span>',
        escape: false,
        iconClass: 'text-base',
        routerLink:this.appSettings.UIURLHomePageHost+'games'
      },
      {
        label: '<span class="text-base ">Web 3 Wallet</span>',
        escape: false,
        iconClass: 'text-base',
        routerLink:this.appSettings.UIURLHomePageHost+'web3'
      },
      {
        label: '<span class="text-base">Tokenomics</span>',
        escape: false,
        iconClass: 'text-base',
        routerLink:this.appSettings.UIURLHomePageHost+'tokenomics'
      },
      {
        label: '<span class="text-base">NFT Marketplace</span>',
        escape: false,
        iconClass: 'text-base',
        routerLink:this.appSettings.UIURLMarketplaceHost+'marketplace'
      }
    ];
    
    this.second_col_menu = [
      {
          label: '<span class="text-base">Community</span>',
          escape: false,
          iconClass: 'text-base',
          routerLink:''
      },
      {
          label: '<span class="text-base">Discord</span>',
          escape: false,
          iconClass: 'text-base',
          routerLink:'https://discord.com/invite/3yasNXQ7'
      },
      {
        label: '<span class="text-base" >Blogs</span>',
        escape: false,
        iconClass: 'text-base',
        routerLink:this.appSettings.UIURLHomePageHost+'/blogs'
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
