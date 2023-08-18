import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, NavigationEnd } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  wallet_name : any = '';
  dashboard_menu: MenuItem[] | undefined;

  constructor(
    private router: Router,
    public appSettings:AppSettings
    ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu();
      }
    });
  }
  updateActiveMenu() {
    const currentUrl = this.router.url;
    if(this.dashboard_menu){
      this.dashboard_menu.forEach((menuItem) => {
        menuItem.styleClass = currentUrl === menuItem.routerLink ? 'active' : '';
      });
    }
  }
  
  ngOnInit(): void {
    this.wallet_name = localStorage.getItem("wallet-meta-name");

    this.dashboard_menu = [
      {
          label: this.appSettings.translate("Portfolio"),
          icon: 'pi pi-fw pi-briefcase',
          styleClass : 'active',
          routerLink: '/portfolio'
      },
      {
          label: this.appSettings.translate('Send/ Pay Genesis'),
          icon: 'pi pi-fw pi-arrow-up',
          routerLink: '/send-pay-genesis'
      },
      {
        label: this.appSettings.translate("Buy"),
        icon: 'pi pi-fw pi-credit-card',
        routerLink: '/buy'
      }
    ];
  }
}
