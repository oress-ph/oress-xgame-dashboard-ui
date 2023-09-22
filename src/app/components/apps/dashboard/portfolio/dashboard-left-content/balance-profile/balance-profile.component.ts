import { Component } from '@angular/core';
import { Menu, NavService } from './../../../../../../shared/services/nav.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-balance-profile',
  templateUrl: './balance-profile.component.html',
  styleUrls: ['./balance-profile.component.scss']
})
export class BalanceProfileComponent {
  public dashboard_menuItems: Menu[];

  constructor(
    private router: Router, 
    public navServices: NavService, 
    public appSettings: AppSettings,
  ){
    this.navServices.dashboard_items.subscribe(menuItems => {
      this.dashboard_menuItems = menuItems;
      this.router.events.subscribe((event) => {
      });
    });
  }
}
