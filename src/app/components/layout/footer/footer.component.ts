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
  items: MenuItem[] | undefined;
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
    
        // this.router.navigate(route);
        // this.publicService.routeChange(route);

        // window.location.href = route;

  }
  public routerClick(route:any):void{
    window.location.href=route
  }
  
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
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLDashboardlaceHost+'portfolio'); }
      },
      {
        label: '<span class="text-base font-bold">Tokens</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLHomePageHost); }
      },
      {
        label: '<span class="text-base font-bold">NFT Marketplace</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLMarketplaceHost); }
      },
      {
        label: '<span class="text-base font-bold">Dashboard</span>',
        escape: false,
        // icon: 'pi pi-refresh',
        iconClass: 'text-base',
        command: (event) => { this.routerClick(this.appSettings.UIURLDashboardlaceHost+'portfolio'); }
      },
    ];
}
}
