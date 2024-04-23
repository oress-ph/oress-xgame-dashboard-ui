import { Component, OnInit } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  public today: number = Date.now();
  public menuItems: Menu[];
  public community_menuItems: Menu[];
  public footer_menuItems: Menu[];
  public legal_menuItems: Menu[];
  public social_media_menuItems: Menu[];
  public other_menuItems: Menu[];

  constructor(
    private router: Router, 
    public navServices: NavService, 
    public appSettings: AppSettings,
    public layout: LayoutService
  ) {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url) {
              this.setNavActive(items);
            }
            if (!items.children) { return false; }
            items.children.filter(subItems => {
              if (subItems.path === event.url) {
                this.setNavActive(subItems);
              }
              if (!subItems.children) { return false; }
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url) {
                  this.setNavActive(subSubItems);
                }
              });
            });
          });
        }
      });
    });
    this.navServices.community_items.subscribe(community_menuItems => {
      this.community_menuItems = community_menuItems;
    });
    this.navServices.footer_items.subscribe(footer_menuItems => {
      this.footer_menuItems = footer_menuItems;
    });
    this.navServices.legal_items.subscribe(legal_menuItems => {
      this.legal_menuItems = legal_menuItems;
    });
    this.navServices.social_media_items.subscribe(social_media_menuItems => {
      this.social_media_menuItems = social_media_menuItems;
    });
    this.navServices.other_items.subscribe(other_menuItems => {
      this.other_menuItems = other_menuItems;
    });
  }
  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter(menuItem => {
      if (menuItem !== item) {
        menuItem.active = false;
      }
      if (menuItem.children && menuItem.children.includes(item)) {
        menuItem.active = true;
      }
      if (menuItem.children) {
        menuItem.children.filter(submenuItems => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }
  redirectTo(path: string) {
    // Use window.location.href to redirect the user to the specified path
    window.location.href = path;
  }

  ngOnInit(): void {
  }

}
